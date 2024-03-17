import { RefObject } from "react"
import { Scene, Vector2 } from "three"

interface ConstructorParam {
  canvasRef: RefObject<HTMLCanvasElement>
}

export default class StateVillage {
  private _isPressed = false
  private _mouse = new Vector2()
  private _canvasRef: RefObject<HTMLCanvasElement>

  public scene = new Scene()


  constructor(p: ConstructorParam) {
    this._canvasRef = p.canvasRef
  }

  public get isInitialized(): boolean {
    return !!this._canvasRef.current
  }

  public get canvas(): HTMLCanvasElement {
    if (!this._canvasRef.current) {
      throw new Error('canvas is not initialized')
    }
    return this._canvasRef.current
  }

  public get isPressed(): boolean {
    return this._isPressed
  }
  public set isPressed(value: boolean) {
    this._isPressed = value
  }
  public get mouse(): Vector2 {
    return this._mouse
  }
  public set mouse(value: Vector2) {
    this._mouse = value
  }

}