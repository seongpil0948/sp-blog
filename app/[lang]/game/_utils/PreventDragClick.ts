export class PreventDragClick {
	mouseMoved: boolean; // Declare the 'mouseMoved' property with type boolean

	constructor(elem: HTMLElement) { // Add type annotation to the constructor parameter
		this.mouseMoved = false; // Initialize 'mouseMoved' property

		let clickStartX: number; // Add type annotation to the variables
		let clickStartY: number;
		let clickStartTime: number;

		elem.addEventListener('mousedown', (e: MouseEvent) => { // Add type annotation to the event parameter
			clickStartX = e.clientX;
			clickStartY = e.clientY;
			clickStartTime = Date.now();
		});

		elem.addEventListener('mouseup', (e: MouseEvent) => { // Add type annotation to the event parameter
			const xGap = Math.abs(e.clientX - clickStartX);
			const yGap = Math.abs(e.clientY - clickStartY);
			const timeGap = Date.now() - clickStartTime;

			if (
				xGap > 5 ||
				yGap > 5 ||
				timeGap > 500
			) {
				this.mouseMoved = true;
			} else {
				this.mouseMoved = false;
			}
		});
	}
}