"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function main() {
    electron_1.app.whenReady().then(function () {
        var win = new electron_1.BrowserWindow({
            width: 800,
            height: 600
        });
        win.loadFile('app/build/index.html');
    });
}
main();
