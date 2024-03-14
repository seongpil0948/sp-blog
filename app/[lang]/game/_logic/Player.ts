import {
	AnimationMixer,
	type Scene,
	type Mesh,
	type AnimationAction,
	type Object3D
} from 'three';
import type { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


interface ConstructorParams {
	scene: Scene
	meshes: Object3D[]
	gltfLoader: GLTFLoader
	modelSrc: string
}

export class Player {
	moving: boolean
	modelMesh?: Object3D
	mixer?: AnimationMixer
	actions?: AnimationAction[]


	constructor(info: ConstructorParams) {
		this.moving = false;

		info.gltfLoader.load(
			info.modelSrc,
			glb => {
				glb.scene.traverse(child => {
					const c = child as Mesh;
					if (c.isMesh) {
						c.castShadow = true;
					}
				});

				this.modelMesh = glb.scene.children[0];
				this.modelMesh.position.y = 0.3;
				this.modelMesh.name = 'ilbuni';
				info.scene.add(this.modelMesh);
				info.meshes.push(this.modelMesh);

				this.actions = [];

				this.mixer = new AnimationMixer(this.modelMesh);
				this.actions[0] = this.mixer.clipAction(glb.animations[0]);
				this.actions[1] = this.mixer.clipAction(glb.animations[1]);
				this.actions[0].play();
			}
		);
	}
}
