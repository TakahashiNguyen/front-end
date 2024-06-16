interface Array<T> {
	random(ifContain?: string): Array<T>;
}
interface String {
	getElement(): GeneralHTML;
	getElements(): GeneralHTML[];
	num(): number;
}
interface Number {
	f(): number; // floor()
	r(): number; // round()
	a(): number; // abs()
}

type GeneralHTML = HTMLElement & HTMLCanvasElement & HTMLImageElement;

Array.prototype.random = function (ifContain?: string) {
	if (ifContain) this.filter((i: string) => i.toLowerCase().includes(ifContain.toLowerCase()));
	return this[Math.floor(Math.random() * this.length)];
};
String.prototype.getElements = function () {
	return Array.from(document.querySelectorAll(`[id*=${this}]`));
};
String.prototype.num = function () {
	return Number(this);
};
Number.prototype.f = function () {
	return Math.floor(Number(this));
};
Number.prototype.r = function () {
	return Math.round(Number(this));
};
Number.prototype.a = function () {
	return Math.abs(Number(this));
};

type Color = [number, number, number];
