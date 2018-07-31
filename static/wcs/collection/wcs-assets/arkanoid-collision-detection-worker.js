/**
 * Global variables
 */
self.afterResultCmds = [];
self.collisionDetectionLoopCount = 0;

/**
 * Glue code between worker and main thread
 */
self.addEventListener('message', mainThreadMsg => {
    // execute command and send result
    const input = mainThreadMsg.data;
    if (input.func && self[input.func]) {
        const result = self[input.func](input.args);

        // return reply
        self.postMessage({
            func: input.func,
            return: result
        });

        // reset global variables
        self.afterResultCmds = [];
    } else {
        console.info('worker ignored command:', mainThreadMsg);
    }
});

/**
 * here below are utils functions for collision detection and miscelanious calculus for arkanoid
 */
accelerate = function(x, y, dx, dy, accel, dt) {
    let x2 = x + (dt * dx) + (accel * dt * dt * 0.5);
    let y2 = y + (dt * dy) + (accel * dt * dt * 0.5);
    let dx2 = dx + (accel * dt) * (dx > 0 ? 1 : -1);
    let dy2 = dy + (accel * dt) * (dy > 0 ? 1 : -1);
    return { nx: (x2 - x), ny: (y2 - y), x: x2, y: y2, dx: dx2, dy: dy2 };
}

intercept = function(x1, y1, x2, y2, x3, y3, x4, y4, d) {
    let denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
    if (denom != 0) {
        let ua = (((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3))) / denom;
        if ((ua >= 0) && (ua <= 1)) {
            let ub = (((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3))) / denom;
            if ((ub >= 0) && (ub <= 1)) {
                let x = x1 + (ua * (x2 - x1));
                let y = y1 + (ua * (y2 - y1));
                return { x: x, y: y, d: d };
            }
        }
    }
    return null;
}

ballIntercept = function(ball, rect, nx, ny) {
    const top = rect.y - ball.radius;
    const bottom = rect.y + rect.height + ball.radius;
    const left = rect.x - ball.radius;
    const right = rect.x + rect.width + ball.radius;
    let pt;
    if (nx < 0) {
        pt = intercept(ball.x, ball.y, ball.x + nx, ball.y + ny,
            right,
            top,
            right,
            bottom,
            "right");
    } else if (nx > 0) {
        pt = intercept(ball.x, ball.y, ball.x + nx, ball.y + ny,
            left,
            top,
            left,
            bottom,
            "left");
    }
    if (!pt) {
        if (ny < 0) {
            pt = intercept(ball.x, ball.y, ball.x + nx, ball.y + ny,
                left,
                bottom,
                right,
                bottom,
                "bottom");
        } else if (ny > 0) {
            pt = intercept(ball.x, ball.y, ball.x + nx, ball.y + ny,
                left,
                top,
                right,
                top,
                "top");
        }
    }
    return pt;
}

collisionHandler = function({ dt, model, config, width, height, resetCollisionCount = true }) {
    // breaking out of collision detection loop --> reset loop counter
    if (resetCollisionCount) {
        self.collisionDetectionLoopCount = 0;
    }
    let updatedModel = Object.assign({}, model);
    let ball = Object.assign({}, updatedModel.ball);
    let pos = accelerate(ball.x, ball.y, ball.dx, ball.dy, ball.accel, dt);
    let magnitude = function(x, y) {
        return Math.sqrt(x * x + y * y);
    }
    let collisionObjectsBuilder = model => {
        // get all valid bricks
        let collisionObjects = model.bricks.filter(brick => (brick.hitCount > 0));
        // add paddle
        collisionObjects.push(Object.assign({ type: 'paddle' }, model.paddle));
        // add walls
        const leftWallRect = { type: 'no-brick', x: -config.bricks.sideSpace, y: 0, width: config.bricks.sideSpace, height: height };
        const rightWallRect = { type: 'no-brick', x: width, y: 0, width: config.bricks.sideSpace, height: height };
        const topWallRect = { type: 'no-brick', x: 0, y: -config.bricks.sideSpace, width: width, height: config.bricks.sideSpace };
        collisionObjects.push(leftWallRect, rightWallRect, topWallRect);

        return collisionObjects;
    }
    const collisionObjects = collisionObjectsBuilder(updatedModel);
    let closest = { obstacle: null, point: null, distance: Infinity };
    let distance;

    // look for closest collision
    collisionObjects.forEach(obstacle => {
        let px = ballIntercept(ball, obstacle, pos.nx, pos.ny);
        if (px) {
            distance = magnitude(px.x - obstacle.x, px.y - obstacle.y);
            if (distance < closest.distance) {
                closest = { obstacle: obstacle, point: px, distance: distance };
            }
        }
    });

    // loop count check (avoid ball being stuck in an infinte loop of collision)
    self.collisionDetectionLoopCount++;
    if (self.collisionDetectionLoopCount > config.game.collisionDetectionLoopMaxCount) {
        // too much loops - force end game
        afterResultCmds.push({ func: 'pause', args: [] });
        afterResultCmds.push({ func: 'player.die', args: [] });

        // erase collision point to break free of loops
        closest.point = null;
    }

    if (closest.point) {
        // react to closest collision
        pos.x = closest.point.x;
        pos.y = closest.point.y;
        switch (closest.point.d) {
            case 'left':
            case 'right':
                pos.dx = -pos.dx;
                break;

            case 'top':
            case 'bottom':
                pos.dy = -pos.dy;
                break;
        }

        // change slightly ball spin if hitting paddle
        if (closest.obstacle.type === 'paddle' && closest.point.d === 'top') {
            const paddleHitRatio = Math.max(Math.min((closest.point.x - closest.obstacle.x) / closest.obstacle.width, 1), 0) - 0.5;

            // impact ball spin
            pos.dx += paddleHitRatio * config.paddle.spinImpact;

            afterResultCmds.push({ func: 'playSound', args: ['paddle'] });
        }

        // update hit count, color and score when hitting a brick
        if (closest.obstacle.hitCount) {
            afterResultCmds.push({ func: 'playSound', args: ['brick'] });
            closest.obstacle.hitCount--;
            afterResultCmds.push({ func: 'player.scoreUpdate', args: [] });
            closest.obstacle.color = config.bricks.brickColor[closest.obstacle.hitCount - 1];
        }

        // collision happened - how far along did we get before intercept ?
        let udt = dt * (closest.distance / magnitude(pos.nx, pos.ny)) / 1000;

        // update ball properties
        updatedModel.ball = Object.assign(updatedModel.ball, pos);
        // update bricks (remove 'no-brick' items: paddle & walls)
        updatedModel.bricks = collisionObjects.filter(obs => (!obs.type || obs.type !== 'no-brick' || obs.type !== 'paddle' || obs.type !== 'game-over'));

        // next level if no more bricks in level
        if (updatedModel.bricks.filter(obj => (obj.type === 'brick' && obj.hitCount > 0)).length === 0) {
            afterResultCmds.push({ func: 'pause', args: [] });
            afterResultCmds.push({ func: 'player.levelUp', args: [] });
            return {
                updatedModel,
                cmds: afterResultCmds
            }
        }

        // loop on collision detection
        const newArgs = {
            dt: dt - udt,
            model: model,
            config: config,
            width: width,
            height: height,
            resetCollisionCount: false
        };

        return collisionHandler(newArgs);
    } else {
        // update ball properties
        updatedModel.ball = Object.assign(updatedModel.ball, pos);

        // GAME over (when ball disappear at the bottom)
        if (updatedModel.ball.y >= height) {
            afterResultCmds.push({ func: 'pause', args: [] });
            afterResultCmds.push({ func: 'player.die', args: [] });
        }

        // no collision - ball moved normally
        return {
            updatedModel,
            cmds: afterResultCmds
        }
    }
}