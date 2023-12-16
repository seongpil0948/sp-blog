export class BaseClass {
  parentElement: HTMLElement
  stageWidth: number
  stageHeight: number
  centerX: number
  centerY: number


  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement
    this.stageWidth = parentElement.clientWidth
    this.stageHeight = parentElement.clientHeight
    this.centerX = this.stageWidth / 2
    this.centerY = this.stageHeight / 2
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight
    this.centerX = this.stageWidth / 2
    this.centerY = this.stageHeight / 2
  }

}