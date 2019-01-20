class Main {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly step: number = 20; // 一个格子(一步)的大小(单位: px)

    // 向量
    private xDir: number = 0;
    private yDir: number = 0;

    // 起点
    private xStart: number = 0;
    private yStart: number = 0;

    // 终点
    private xEnd: number = 0;
    private yEnd: number = 0;

    // 箱子
    private xBox: number = 0;
    private yBox: number = 0;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
        this.Setup();
    }

    // Setup
    public Setup(): void {
        this.InitPoint();

        // 主循环
        setInterval(() => {
            this.Update();
            this.Show();
        }, 40);// 帧率25

        // 处理方向键
        onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.xDir = 0;
                    this.yDir = -this.step;
                    this.yStart -= this.step;
                    break;
                case  'ArrowDown':
                    this.xDir = 0;
                    this.yDir = +this.step;
                    this.yStart += this.step;
                    break;
                case 'ArrowLeft':
                    this.xDir = -this.step;
                    this.yDir = 0;
                    this.xStart -= this.step;
                    break;
                case 'ArrowRight':
                    this.xDir = +this.step;
                    this.yDir = 0;
                    this.xStart += this.step;
                    break;
                default:
                    console.log(e.key);
                    return;
            }
        };
    }

    // 更新数据
    private Update(): void {
        if (this.xStart === this.canvas.width) {
            this.xStart = 0;
        } else if (this.xStart < 0) {
            this.xStart = this.canvas.width - this.step;
        }

        if (this.yStart === this.canvas.height) {
            this.yStart = 0;
        } else if (this.yStart < 0) {
            this.yStart = this.canvas.height - this.step;
        }

        // 碰到箱子
        if (this.xStart === this.xBox && this.yStart === this.yBox) {
            this.xBox += this.xDir;
            this.yBox += this.yDir;

            if (this.xBox === this.canvas.width) {
                this.xBox = 0;
            } else if (this.xBox < 0) {
                this.xBox = this.canvas.width - this.step;
            }

            if (this.yBox === this.canvas.height) {
                this.yBox = 0;
            } else if (this.yBox < 0) {
                this.yBox = this.canvas.height - this.step;
            }
        }

        // 箱子碰到终点
        if (this.xEnd === this.xBox && this.yEnd === this.yBox) {
            console.log('GAME OVER ~');
            this.InitPoint();
        }
    }

    // 显示数据
    private Show(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap();
        this.ctx.fillStyle = 'rgba(50, 177, 108, 1.0)';
        this.ctx.fillRect(this.xStart, this.yStart, this.step, this.step);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
        this.ctx.fillRect(this.xEnd, this.yEnd, this.step, this.step);
        this.ctx.fillStyle = 'rgba(89, 61, 61, 1.0)';
        this.ctx.fillRect(this.xBox, this.yBox, this.step, this.step);
    }

    // 绘制网格地图
    private drawMap(): void {
        for (let i = 0; i <= this.canvas.width; i += this.step) {
            // 绘制竖线
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();

            // 绘制横线
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
        }
    }

    // 初始化三个点
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

    // 取得地图上的一个随机点
    private GetRandomPoint(): [number, number] {
        const x = Math.floor((Math.random() * this.canvas.width) / this.step) * this.step;
        const y = Math.floor((Math.random() * this.canvas.height) / this.step) * this.step;
        return [x, y];
    }
}

window.onload = () => {
    new Main();
};
