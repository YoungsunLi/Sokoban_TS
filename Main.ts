class Main {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly step: number = 20;
    private x: number = 0;
    private y: number = 0;
    private vx: number = this.step;
    private vy: number = 0;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.Setup();
    }

    public Setup(): void {
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
                case  'ArrowDown':
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

    private Update(): void {
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

    private Show(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        this.ctx.fillRect(this.x, this.y, this.step, this.step);
    }

    private drawMap(): void {
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
