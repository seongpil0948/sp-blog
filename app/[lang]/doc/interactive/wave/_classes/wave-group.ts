import Wave from "./wave";

export class WaveGroup {
  totalWaves: number;
  totalPoints: number;
  color: string[];
  waves: Wave[];

  constructor() {
    this.totalWaves = 3;
    this.totalPoints = 12;
    this.color = ["rgba(255, 0, 0, 0.4)", "rgba(255, 255, 0, 0.4)", "rgba(0, 255, 255, 0.4)", "rgba(0, 199, 235, 0.4)"];
    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth: number, stageHeight: number) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }

}