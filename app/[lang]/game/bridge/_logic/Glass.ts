import { cm1, geo, mat, getSounds } from './common';
import { BoxGeometry, Material, Mesh } from 'three';
import { Stuff, StuffChildParams } from './Stuff';

type GlassType = 'normal' | 'strong'; 
export class Glass extends Stuff {
	type: string; // Declare the 'type' property
	step: number; // Declare the 'step' property
	geometry: BoxGeometry; // Declare the 'geometry' property
	material: Material; // Declare the 'material' property
	width: number; // Declare the 'width' property
	height: number; // Declare the 'height' property
	depth: number; // Declare the 'depth' property
	mesh: Mesh & {
		step: number;
		type: GlassType;
	}; // Declare the 'mesh' property

	constructor(info: { type: GlassType, step: number } & StuffChildParams) { // Add type annotation to the constructor parameter
		super({
			...geo.glass.parameters,
			...info
		});

		this.type = info.type;
		this.step = info.step;

		this.geometry = geo.glass;
		switch (this.type) {
			case 'normal':
				this.material = mat.glass1;
				this.mass = 1;
				break;
			case 'strong':
				this.material = mat.glass2;
				this.mass = 0;
				break;
			default:
				throw new Error('Invalid glass type');
		}

		this.width = this.geometry.parameters.width;
		this.height = this.geometry.parameters.height;
		this.depth = this.geometry.parameters.depth;

		const mesh = new Mesh(this.geometry, this.material);
		mesh.position.set(this.x, this.y, this.z);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.name = this.name;
		this.mesh = Object.assign(mesh, { step: this.step, type: this.type });
		cm1.scene.add(this.mesh);

		this.setCannonBody();

		this.cannonBody?.addEventListener('collide', playSound); // Add optional chaining to handle possible undefined value
		const sounds = getSounds();
		const sound = sounds[this.type as keyof typeof sounds]; // Add type assertion to access the correct property
		function playSound(e: any) { // Add type annotation to the 'e' parameter
			const strength = e.contact.getImpactVelocityAlongNormal();
			if (strength > 5) {
				sound.currentTime = 0;
				sound.play();
				console.log(strength)
			}
		}
	}
}