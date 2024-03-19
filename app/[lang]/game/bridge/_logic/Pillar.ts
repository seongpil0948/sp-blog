import { cm1, geo, mat } from './common';
import { Mesh, BoxGeometry, Material } from 'three';
import { Stuff, StuffChildParams } from './Stuff';

export class Pillar extends Stuff {
	geometry: BoxGeometry;
	material: Material;
	mesh: Mesh;

	constructor(info: StuffChildParams) {
		super({
			...geo.pillar.parameters,
			...info
		});

		this.geometry = geo.pillar;
		this.material = mat.pillar;
		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.position.set(this.x, this.y, this.z);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		cm1.scene.add(this.mesh);

		this.setCannonBody();
	}
}