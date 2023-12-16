import { BaseClass } from "./common"
import { WaveGroup } from "./wave-group"

export class App extends BaseClass {
  canvasRef: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  group: WaveGroup

  constructor(canvasRef: HTMLCanvasElement) {
    super(document.querySelector('#wave-page') ?? document.body)
    this.canvasRef = canvasRef
    this.ctx = this.canvasRef.getContext('2d')
    this.group = new WaveGroup()
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()
  }

  resize() {
    if (!this.ctx) return
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    this.canvasRef.width = this.stageWidth * 2
    this.canvasRef.height = this.stageHeight * 2
    this.ctx.scale(2, 2)

    this.group.resize(this.stageWidth, this.stageHeight)
  }

  animate() {
    if (!this.ctx) return
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    this.group.draw(this.ctx)
    requestAnimationFrame(this.animate.bind(this))
  }
}
