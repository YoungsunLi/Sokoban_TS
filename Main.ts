class Main {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly step: number = 20;
    private xDir: number = 0;
    private yDir: number = 0;
    private xStart: number = 0;
    private yStart: number = 0;
    private xEnd: number = 0;
    private yEnd: number = 0;
    private xBox: number = 0;
    private yBox: number = 0;

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
                    this.xDir = 0;
                    this.yDir = -this.step;
                    break;
                case  'ArrowDown':
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

    private Update(): void {
        //this.x += this.xDir;
        //this.y += this.yDir;

        // if (this.xStart === this.canvas.width)
        // {
        //     this.xStart = 0;
        // } else if (this.xStart < 0)
        // {
        //     this.xStart = this.canvas.width;
        // }
        //
        // if (this.yStart === this.canvas.height)
        // {
        //     this.yStart = 0;
        // } else if (this.yStart < 0)
        // {
        //     this.yStart = this.canvas.height;
        // }

        this.InitPoint();
    }

    private Show(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        this.ctx.fillRect(this.xStart, this.yStart, this.step, this.step);
        this.ctx.fillRect(this.xEnd, this.yEnd, this.step, this.step);
        this.ctx.fillRect(this.xBox, this.yBox, this.step, this.step);
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

    private InitPoint(): void {
        let start: [number, number];
        let end: [number, number];
        let box: [number, number];

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

    private GetRandomPoint(): [number, number] {
        const x = Math.floor((Math.random() * this.canvas.width) / this.step) * this.step;
        const y = Math.floor((Math.random() * this.canvas.height) / this.step) * this.step;
        return [x, y];
    }
}

window.onload = () => {
    new Main();
};
