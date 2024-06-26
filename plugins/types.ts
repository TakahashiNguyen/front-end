import * as path from 'path';

declare global {
	interface Array<T> {
		random(): T;
		get(subString: string): Array<T>;
		last(): T;
	}
	interface String {
		getElement(): HTMLElement;
		getElements(): HTMLElement[];
		num(): number;
		pj(): string;
	}
	interface Number {
		f(): number; // floor()
		r(): number; // round()
		a(): number; // abs()
	}
	type Color = [number, number, number];
}

Array.prototype.get = function (subString: string) {
	return this.filter((i: string) => i.includes(subString));
};
Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.last = function () {
	return this[this.length - 1];
};
String.prototype.getElements = function () {
	return Array.from(document.querySelectorAll(`[id*=${this}]`));
};
String.prototype.getElement = function () {
	return document.getElementById(String(this))!;
};
String.prototype.num = function () {
	return Number(this);
};
String.prototype.pj = function () {
	return path.join(process.env.PWD!, String(this));
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
