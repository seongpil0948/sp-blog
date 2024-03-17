import { RefObject } from "react"
import { AmbientLight, Camera, DirectionalLight, Mesh, OrthographicCamera, PerspectiveCamera, Scene, Vector2, Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import House from "./House"
import Player from "./Player"


type CameraMode = 'perspective' | 'orthographic'
interface ConstructorParam {
  canvasRef: RefObject<HTMLCanvasElement>
  cameraMode: CameraMode
}

export default class StateVillage {
  private _isPressed = false
  private _mouse = new Vector2()
  private _canvasRef: RefObject<HTMLCanvasElement>
  private _isPerspective = true
  private cameraMode: CameraMode = 'orthographic'
  public house: House
  public player: Player
  public meshes: Mesh[] = []

  public scene: Scene
  private _cameraPosition: { [k in CameraMode]: Vector3 } = {
    perspective: new Vector3(0, 0, 5),
    orthographic: new Vector3(1, 5, 5),
  }
  public gltfLoader: GLTFLoader
  public light = {
    ambient: new AmbientLight('white', 1),
    directional: getDirectionalLight()
  }
  public camera: {
    perspective: PerspectiveCamera
    orthographic: OrthographicCamera
  }



  constructor(p: ConstructorParam) {
    this._canvasRef = p.canvasRef
    this.cameraMode = p.cameraMode
    this.scene = new Scene()
    this.gltfLoader = new GLTFLoader()
    this.house = new House({
      gltfLoader: this.gltfLoader,
      scene: this.scene,
      modelSrc: '/glb/house.glb',
      x: 5,
      y: -1.3,
      z: 2,
    })
    this.player = new Player({
      scene: this.scene,
      meshes: this.meshes,
      gltfLoader: this.gltfLoader,
      // modelSrc: '/glb/ilbuni.glb',
      modelSrc: '/glb/ilbuni.glb',
    })
    this.camera = {
      perspective: getCamera.perspective(this._cameraPosition.perspective),
      orthographic: getCamera.orthographic(this._cameraPosition.orthographic),
    }
  }

  public get cameraPosition() {
    return this.cameraMode === 'perspective'
      ? this._cameraPosition.perspective
      : this._cameraPosition.orthographic
  }

  public get cameraCurrent() {
    return this.cameraMode === 'perspective'
      ? this.camera.perspective
      : this.camera.orthographic
  }

  public get isInitialized(): boolean {
    return !!this._canvasRef.current
  }

  public get isPerspective(): boolean {
    return this._isPerspective
  }
  public set isPerspective(value: boolean) {
    this._isPerspective = value
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

const getCamera = {
  perspective: (postion: Vector3) => {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(...postion.toArray())
    camera.updateProjectionMatrix()
    return camera
  },
  orthographic: (postion: Vector3) => {
    const camera = new OrthographicCamera(
      -(window.innerWidth / window.innerHeight), // left
      window.innerWidth / window.innerHeight, // right,
      1, // top
      -1, // bottom
      -1000,
      1000,
    )
    camera.position.set(...postion.toArray())
    camera.zoom = 0.2
    camera.updateProjectionMatrix()
    return camera
  },
}

function getDirectionalLight() {
  const directionalLight = new DirectionalLight('white', 0.5)
  const directionalLightOriginPosition = new Vector3(1, 1, 1)
  directionalLight.position.x = directionalLightOriginPosition.x
  directionalLight.position.y = directionalLightOriginPosition.y
  directionalLight.position.z = directionalLightOriginPosition.z
  directionalLight.castShadow = true

  // mapSize 세팅으로 그림자 퀄리티 설정
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  // 그림자 범위
  directionalLight.shadow.camera.left = -100
  directionalLight.shadow.camera.right = 100
  directionalLight.shadow.camera.top = 100
  directionalLight.shadow.camera.bottom = -100
  directionalLight.shadow.camera.near = -100
  directionalLight.shadow.camera.far = 100
  return directionalLight
}