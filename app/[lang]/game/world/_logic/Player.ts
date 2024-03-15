import {
	AnimationMixer,
	type Scene,
	type Mesh,
	type AnimationAction,
	type Object3D,
	type Camera,
	Vector3
} from 'three';
import type { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import CONFIG from '../config';


interface ConstructorParams {
	scene: Scene
	meshes: Object3D[]
	gltfLoader: GLTFLoader
	modelSrc: string
}

export default class Player {
	private _moving: boolean
	private _modelMesh?: Object3D
	private _mixer?: AnimationMixer
	private _actions?: AnimationAction[]


	constructor(info: ConstructorParams) {
		this._moving = false;

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					const c = child as Mesh;
					if (c.isMesh) {
						c.castShadow = true;
					}
				});

				this._modelMesh = glb.scene.children[0];
				this._modelMesh.position.y = 0.3;
				this._modelMesh.name = 'ilbuni';
				info.scene.add(this._modelMesh);
				info.meshes.push(this._modelMesh);

				this._actions = [];

				this._mixer = new AnimationMixer(this._modelMesh);
				this.actions[0] = this._mixer.clipAction(glb.animations[0]);
				this.actions[1] = this._mixer.clipAction(glb.animations[1]);
				this.actions[0].play();
			}
		);
	}


	public get isInitialized(): boolean {
		return !!this._modelMesh
	}


	public get modelMesh(): Object3D {
		if (!this._modelMesh) throw new Error('modelMesh is not initialized yet.');
		return this._modelMesh
	}

	public get actions(): AnimationAction[] {
		if (!this._actions) throw new Error('actions is not initialized yet.');
		return this._actions
	}
	public get mixer() {
		return this._mixer
	}
	public get moving() {
		return this._moving
	}

	public set moving(value: boolean) {
		this._moving = value
	}

	public get actDefault() {
		return this.actions[0]
	}

	public get actWork() {
		return this.actions[1]
	}

	isCloseTo(dest: { x: number, z: number }) {
		// FIXME: 이거 왜 0.03이지?
		return Math.abs(dest.x - this.modelMesh.position.x) < 0.03 &&
			Math.abs(dest.z - this.modelMesh.position.z) < 0.03
	}
	isOnTheSpot(dest: Vector3) {
		return Math.abs(dest.x - this.modelMesh.position.x) < 1.5 &&
			Math.abs(dest.z - this.modelMesh.position.z) < 1.5
	}

	getAngle(dest: { x: number, z: number }) {
		return Math.atan2(dest.z - this.modelMesh.position.z, dest.x - this.modelMesh.position.x);
	}

	moveTo(angle: number, cameraPosition: Vector3, camera: Camera) {
		this.modelMesh.position.x += Math.cos(angle) * CONFIG.player.speed
		this.modelMesh.position.z += Math.sin(angle) * CONFIG.player.speed
		camera.position.x = cameraPosition.x + this.modelMesh.position.x
		camera.position.z = cameraPosition.z + this.modelMesh.position.z
		this.actDefault.stop()
		this.actWork.play()
	}

}
