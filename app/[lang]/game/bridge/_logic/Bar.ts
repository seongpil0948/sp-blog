import { cm1, geo, mat } from './common';
import { Mesh, BoxGeometry, Material } from 'three';
import { Stuff } from './Stuff';

export class Bar extends Stuff {
	geometry: BoxGeometry;
	material: Material;
	width: number;
	height: number;
	depth: number;
	mesh: Mesh;

	constructor(info: any) {
		super(info);

		this.geometry = geo.bar;
		this.material = mat.bar;

		this.width = this.geometry.parameters.width as number;
		this.height = this.geometry.parameters.height as number;
		this.depth = this.geometry.parameters.depth as number;

		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.position.set(this.x, this.y, this.z);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		cm1.scene.add(this.mesh);

		this.setCannonBody();
	}
}