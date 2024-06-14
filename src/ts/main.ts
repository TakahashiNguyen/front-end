// Custom function for types
interface Array<T> {
	random(): Array<T>;
}
interface String {
	getElement(): HTMLElement;
}

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};
String.prototype.getElement = function () {
	return document.getElementById(String(this))!;
};
