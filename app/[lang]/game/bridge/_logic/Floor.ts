import { cm1, geo, mat } from './common';
import {  BoxGeometry, Material, Mesh } from 'three';
import { Stuff, StuffChildParams } from './Stuff';

interface FloorParams extends StuffChildParams {}

export class Floor extends Stuff {
	geometry: BoxGeometry; // Add type annotation for geometry property
	material: Material; // Add type annotation for material property
	mesh: Mesh; // Declare mesh property

	constructor(info: FloorParams) { // Add type annotation for info parameter
		super({...geo.floor.parameters});

		this.geometry = geo.floor;
		this.material = mat.floor;
		this.mesh = new Mesh(this.geometry, this.material);
		this.mesh.position.set(this.x, this.y, this.z);
		// this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		cm1.scene.add(this.mesh);

		this.setCannonBody();
	}
}