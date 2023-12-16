// Define the Ball class
export class Ball {
  constructor(
    private x: number,
    public y: number,
    private radius: number,
    private color: string
  ) { }

  // Add a draw method to the Ball class
  draw(context: CanvasRenderingContext2D) {
    const numSegments = 100; // Increase this for a more accurate circle
    const angleStep = Math.PI * 2 / numSegments;

    context.beginPath();
    context.moveTo(this.x + this.radius, this.y); // Start at the rightmost point of the circle

    for (let i = 1; i <= numSegments; i++) {
      const angle = angleStep * i;
      const nextX = this.x + Math.cos(angle) * this.radius;
      const nextY = this.y + Math.sin(angle) * this.radius;
      context.lineTo(nextX, nextY);
    }

    context.fillStyle = this.color;
    context.closePath();
    context.fill();
  }
}

// // Use the Ball class to draw a ball on a canvas
// const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
// const context = canvas.getContext('2d') as CanvasRenderingContext2D;

// const ball = new Ball(50, 50, 20, 'red');
// ball.draw(context);