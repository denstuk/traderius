import { app, BrowserWindow } from "electron"

function main() {
    app.whenReady().then(() => {
        const win = new BrowserWindow({
            width: 800,
            height: 600
        })

        win.loadFile('../app/build/index.html')
    })
}
main()
