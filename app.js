"use strict";
class Main {
    constructor() {
        this.step = 20;
        this.xDir = 0;
        this.yDir = 0;
        this.xStart = 0;
        this.yStart = 0;
        this.xEnd = 0;
        this.yEnd = 0;
        this.xBox = 0;
        this.yBox = 0;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.Setup();
    }
    Setup() {
        setInterval(() => {
            this.Update();
            this.Show();
        }, 125);
        onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.xDir = 0;
                    this.yDir = -this.step;
                    break;
                case 'ArrowDown':
                    this.xDir = 0;
                    this.yDir = +this.step;
                    break;
                case 'ArrowLeft':
                    this.xDir = -this.step;
                    this.yDir = 0;
                    break;
                case 'ArrowRight':
                    this.xDir = +this.step;
                    this.yDir = 0;
                    break;
                default:
                    return;
            }
        };
    }
    Update() {
        this.InitPoint();
    }
    Show() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        this.ctx.fillRect(this.xStart, this.yStart, this.step, this.step);
        this.ctx.fillRect(this.xEnd, this.yEnd, this.step, this.step);
        this.ctx.fillRect(this.xBox, this.yBox, this.step, this.step);
    }
    drawMap() {
        for (let i = 0; i <= this.canvas.width; i += this.step) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
        }
    }
    InitPoint() {
        let start;
        let end;
        let box;
        do {
            start = this.GetRandomPoint();
            end = this.GetRandomPoint();
            box = this.GetRandomPoint();
        } while (start === end || start === box || end === box);
        this.xStart = start[0];
        this.yStart = start[1];
        this.xEnd = end[0];
        this.yEnd = end[1];
        this.xBox = box[0];
        this.yBox = box[1];
    }
    GetRandomPoint() {
        const x = Math.floor((Math.random() * this.canvas.width) / this.step) * this.step;
        const y = Math.floor((Math.random() * this.canvas.height) / this.step) * this.step;
        return [x, y];
    }
}
window.onload = () => {
    new Main();
};
//# sourceMappingURL=app.js.map