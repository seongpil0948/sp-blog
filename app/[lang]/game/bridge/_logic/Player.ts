import { cm1 } from './common';
import {
	Mesh,
	AnimationMixer,
	Object3D,
	AnimationAction,
} from 'three';
import { Stuff, StuffChildParams } from './Stuff';
import CONFIG_GAME from "../../_utils/config"

const SUFFIX= "-player"
export class Player extends Stuff {
	modelMesh: Object3D | undefined;
	actions: AnimationAction[] = [];

	constructor(info: StuffChildParams) {
		super({
			width: 0.5,
			height: 0.5,
			depth: 0.5,
			...info,
			name: `${info.name}${SUFFIX}`
		});

		cm1.gltfLoader.load(
			// CONFIG_GAME.playerSrc,
			"/glb/ilbuni-bridge.glb",
			glb => {
				// shadow
				glb.scene.traverse(child => {
					if (child instanceof Mesh) {
						child.castShadow = true;
					}
				});

				this.modelMesh = glb.scene.children[0] as Object3D;
				this.modelMesh.position.set(this.x, this.y, this.z);
				this.modelMesh.rotation.set(
					this.rotationX,
					this.rotationY,
					this.rotationZ
				);
				this.modelMesh.castShadow = true;
				cm1.scene.add(this.modelMesh);

				this.modelMesh.animations = glb.animations;
				cm1.mixer = new AnimationMixer(this.modelMesh!);
				console.log("modelMesh", this.modelMesh)
				this.actions[0] = cm1.mixer.clipAction(this.modelMesh!.animations[0]); // default
				this.actions[1] = cm1.mixer.clipAction(this.modelMesh!.animations[1]); // fall
				this.actions[2] = cm1.mixer.clipAction(this.modelMesh!.animations[2]); // jump
				this.actions[2].repetitions = 1;
				this.actions[0].play();

				this.setCannonBody();
			}
		);

		// this.mesh = new Mesh(this.geometry, this.material);
		// this.mesh.position.set(this.x, this.y, this.z);
		// this.mesh.castShadow = true;
		// this.mesh.receiveShadow = true;
		// cm1.scene.add(this.mesh);
	}

	static isPlayer(obj: any): obj is Player {
		return obj instanceof Player && (obj.name as string).endsWith(SUFFIX);
	}
}