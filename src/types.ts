interface Array<T> {
	random(ifContain?: string): Array<T>;
}
interface String {
	getElement(): GeneralHTML;
	getElements(): GeneralHTML[];
	num(): number;
}
interface Number {
	floor(): number;
	round(): number;
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
Number.prototype.floor = function () {
	return Math.floor(Number(this));
};
Number.prototype.round = function () {
	return Math.round(Number(this));
};

type Color = [number, number, number];
