import { Mesh, Object3D } from 'three';
import { cm1 } from './common';
import {
	Box,
	Vec3,
	Body,
	Material
} from 'cannon-es';

export type StuffParams = {
	name?: string;
	x?: number;
	y?: number;
	z?: number;
	rotationX?: number;
	rotationY?: number;
	rotationZ?: number;
	mass?: number;
	cannonMaterial?: Material; 
	width: number;
	height: number;
	depth: number;
}
export type StuffChildParams = Omit<StuffParams, 'width' | 'height' | 'depth'>;
export type StuffWIthMesh = Stuff & { mesh: Mesh };
export type StuffWithCannonBody = Stuff & { cannonBody: Body };
export type StuffWithModelMesh = Stuff & { modelMesh: Object3D };
export class Stuff {
	name: string;
	x: number;
	y: number;
	z: number;
	rotationX: number;
	rotationY: number;
	rotationZ: number;
	mass: number;
	cannonMaterial: Material; // Replace 'any' with the appropriate type
	cannonBody?: Body;
	width: number;
	height: number;
	depth: number;



	constructor(info: StuffParams) {
		this.name = info.name || '';
		this.x = info.x || 0;
		this.y = info.y || 0;
		this.z = info.z || 0;
		this.rotationX = info.rotationX || 0;
		this.rotationY = info.rotationY || 0;
		this.rotationZ = info.rotationZ || 0;
		this.mass = info.mass || 0;
		this.cannonMaterial = info.cannonMaterial || cm1.defaultMaterial;
		this.width = info.width;
		this.height = info.height;
		this.depth = info.depth;
	}

	setCannonBody() {
		const material = this.cannonMaterial;

		const shape = new Box(new Vec3(this.width/2, this.height/2, this.depth/2)); 
		this.cannonBody = new Body({
			mass: this.mass,
			position: new Vec3(this.x, this.y, this.z),
			shape,
			material
		});
		this.cannonBody.quaternion.setFromAxisAngle(
			new Vec3(0, 1, 0),
			this.rotationY
		);
		cm1.world.addBody(this.cannonBody);
	}

	static hasCannonBody(obj: any): obj is StuffWithCannonBody {
		return obj.cannonBody instanceof Body;
	}
	static hasMesh(obj: any): obj is StuffWIthMesh {
		return obj.mesh instanceof Mesh;
	}
	static hasModelMesh(obj: any): obj is StuffWithModelMesh {
		return obj.modelMesh instanceof Object3D;
	}
}