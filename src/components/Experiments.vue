<template>
    <div class="page-view page-experiments">
        <h1><i class="material-icons">all_inclusive</i>Web experiments</h1>
        <p>Web stuff... playing around a bit!</p>
        <ul class="mdl-card-holder">
            <li>
                <card class="home-card__project">
                    <span slot="header">
                        Arkanoid
                    </span>
                    <span slot="description">
                        <waf-tabs>
                            <waf-tab selected tab-header="&lt;i class=&quot;material-icons&quot;&gt;visibility&lt;/i&gt;demo">
                                <p>Play arkanoid with your head!<br>Move your head from left to right facing your webcam to make the paddle move.</p>
                                <ol>
                                    <li>allow your device to use the webcam</li>
                                    <li>click the <i>start game</i> button</li>
                                    <li>play the game with your head movements</li>
                                </ol>
                                <div class="arkanoid-wrapper">
                                    <waf-face-detect></waf-face-detect>
                                    <waf-arkanoid width="640" height="480" activate-face-controls></waf-arkanoid>
                                </div>
                            </waf-tab>
                            <waf-tab tab-header="&lt;i class=&quot;material-icons&quot;&gt;build&lt;/i&gt;explain the tech">
                                <p>This little demo is the combination of multiple web technologies</p>
                                <p><b>Web Components</b><br>2 custom elements are defined and used here. The first is the arkanoid game itself, it accepts several controller input types (mouse, keyboard, face recognition). The second is the face recognition behavior that output the position to the first one that will move the game paddle accordingly. Those Web Components are built with the <a class="moodys-link" href="https://stenciljs.com/" target="_blank" title="StencilJS documentation">StencilJS</a> compiler</p>
                                <p><b>Web Assembly</b><br>Face recognition works by applying a neural network trained to recognize faces in a image. By itself this calculations are CPU intensive and because we work with video it needs good performances. Therefore performing all those calculations in the browser's JS thread is sure to cause a low frame rate. To avoid this, Web Assembly is used. This binary format allows to have fast efficient code execution without blocking the main JS thread. All I had to do was to get the C++ sources for the neural network and compile it to a wasm file with emscripten ... couple of headaches later ... tada a super efficient face recognition script that works in all major browsers without killing the browser. <br>Note: I found and used a pre trained neural network for face recognition. Building and training a neural network from scratch is another adventure.</p>
                                <p><b>Web Workers</b><br>I had to do a lot of calculations in JS too for the arkanoid game collision detection. First I wanted to code that in C++ or Rust to take advantage of Web Assembly performance. The performance boost expected do not out-weight the added complexity and time necessary to do that, so I pivoted to Web Workers. Web workers allows to create a new JS thread in the browser, the performance boost is weak but that way I can ensure to avoid blocking the main thread because of those JS calculations.</p>
                            </waf-tab>
                        </waf-tabs>
                    </span>
                </card>
            </li>
        </ul>
    </div>
</template>

<script>
    import HomeCard from '@/components/nano/home-card';

    export default {
        components: {
            'card': HomeCard
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/_variables.scss';
    @import '../styles/_utils.scss';
    @import '../styles/_include-media.scss';

    .mdl-card-holder { list-style:none; padding-left:0; margin:-$gutter-base;
        > li { padding:$gutter-base; box-sizing:border-box; }
    }
    .mdl-card-holder {
        @include media(">desktop") { display:flex; flex-wrap:wrap;
            > li { flex-grow:0; flex-basis:50%; }
        }
    }
    .mdl-card__actions > span { margin-top:-$gutter-base; }
    .mdl-button { margin-top:$gutter-base; }
</style>
<style lang="scss">
    @import '../styles/_variables.scss';

    /* styling custom elements (works best outside of scope) */
    waf-tabs {
        .waf-tabs__nav { margin-bottom:16px; }
        .waf-tabs__nav li { color:rgba(255,255,255,.54); 
            &:hover, &:focus, &[aria-selected=true] { color:rgba(255,255,255, 1) }
            &[aria-selected=true]:after { background-color:$primary; }
            .material-icons { margin-right:8px; position:relative; top:7px; }
        }
    }

    .arkanoid-wrapper { position:relative; margin:16px auto 0; width:640px; height:480px;
        waf-arkanoid {
            position: relative;
            z-index: 2;
            color:#333;
        }
        waf-face-detect {
            position: absolute;
            top: -16px;
            left: 0;
        }
        .button-stylish {
            border: none;
            background: none;
            background-color: $primary;
            color: #fff;
            text-transform: uppercase;
            padding: 5px 15px;
            border-radius: 3px;
            cursor: pointer;
        }
    }
</style>
