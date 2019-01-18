"use strict";
class Main {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = '400px';
        this.canvas.style.height = '400px';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.Setup();
    }

    Setup() {
        setInterval(() => {
            this.Update();
            this.Show();
        }, 40);
    }

    Update() {
    }

    Show() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
window.onload = () => {
    new Main();
};
//# sourceMappingURL=app.js.map
