"use strict";
class Main {
    constructor() {
        this.step = 20;
        this.x = 0;
        this.y = 0;
        this.vx = this.step;
        this.vy = 0;
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
                    this.vx = 0;
                    this.vy = -this.step;
                    break;
                case 'ArrowDown':
                    this.vx = 0;
                    this.vy = +this.step;
                    break;
                case 'ArrowLeft':
                    this.vx = -this.step;
                    this.vy = 0;
                    break;
                case 'ArrowRight':
                    this.vx = +this.step;
                    this.vy = 0;
                    break;
                default:
                    return;
            }
        };
    }
    Update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x === this.canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.canvas.width;
        }
        if (this.y === this.canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = this.canvas.height;
        }
    }
    Show() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        this.ctx.fillRect(this.x, this.y, this.step, this.step);
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
}
window.onload = () => {
    new Main();
};
//# sourceMappingURL=app.js.map
