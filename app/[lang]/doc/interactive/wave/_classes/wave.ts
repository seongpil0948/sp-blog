import { BaseClass } from "./common"
import Point from "./point"

export default class Wave extends BaseClass {
  points: Point[]
  index: number
  totalPoints: number
  color: string
  pointGap: number
  gapAlpha: number = 1.4

  constructor(index: number, totalPoints: number, color: string, gapAlpha: number = 1.4) {
    super(document.querySelector('#wave-page') ?? document.body)
    this.gapAlpha = gapAlpha
    this.index = index
    this.totalPoints = totalPoints
    this.color = color
    this.pointGap = this.stageWidth / (this.totalPoints - 1)
    this.points = []
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight
    this.centerX = this.stageWidth / 2
    this.centerY = this.stageHeight / 2
    this.pointGap = this.stageWidth / (this.totalPoints - 1) * this.gapAlpha
    this.init()
  }

  init() {
    for (let i = 0; i < this.totalPoints; i++) {
      this.points[i] = new Point(
        this.index + i,
        this.pointGap * i,
        this.centerY,
      )
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = this.color

    let prevX = this.points[0].x
    let prevY = this.points[0].y

    ctx.moveTo(prevX, prevY)
    for (let i = 0; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update()
      }

      const cx = (prevX + this.points[i].x) / 2
      const cy = (prevY + this.points[i].y) / 2
      ctx.quadraticCurveTo(prevX, prevY, cx, cy)
      // ctx.lineTo(cx, cy)

      prevX = this.points[i].x
      prevY = this.points[i].y
    }

    ctx.lineTo(prevX, prevY)
    ctx.lineTo(this.stageWidth, this.stageHeight)
    ctx.lineTo(this.points[0].x, this.stageHeight)
    ctx.closePath()
    // ctx.arc(this.point!.x, this.point!.y, 30, 0, 2 * Math.PI)
    ctx.fill()
  }

}