var vuid = function () { return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (e) { return (e ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e / 4).toString(16); }); };
export { vuid as a };
