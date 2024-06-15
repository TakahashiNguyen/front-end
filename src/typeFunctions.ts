interface Array<T> {
	random(ifContain?: string): Array<T>;
}
interface String {
	getElement(): HTMLElement & HTMLCanvasElement;
}

Array.prototype.random = function (ifContain?: string) {
	if (ifContain) this.filter((i: string) => i.toLowerCase().includes(ifContain.toLowerCase()));
	return this[Math.floor(Math.random() * this.length)];
};
String.prototype.getElement = function () {
	return document.getElementById(String(this))! as HTMLElement & HTMLCanvasElement;
};
