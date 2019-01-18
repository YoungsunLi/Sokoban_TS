class Main {
    private readonly canvas!: HTMLCanvasElement;
    private readonly ctx!: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.style.width = '400px';
        this.canvas.style.height = '400px';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d")!;
        this.Setup();
    }

    public Setup(): void {
        setInterval(() => {
            this.Update();
            this.Show();
        }, 40);

    }

    private Update(): void {
    }

    private Show(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

window.onload = () => {
    new Main();
};
