declare global {
  interface String {
    removeWhiteSpace(): string;
    sanitize(): string;
    rev(): string;
    comp(): string;
    addSpace(grp: number): string;
    countBase(): number;
    getGCRatio(): number;
    getNBase(): number;
    getInvalidBase(): number;
  }
}

String.prototype.removeWhiteSpace = function () {
  return this.replace(/\s/g, "");
};

String.prototype.sanitize = function () {
  return this.removeWhiteSpace()
    .toUpperCase()
    .replace(/[^A|C|T|G|N]/g, "N");
};

String.prototype.countBase = function () {
  return this.removeWhiteSpace().length;
};

String.prototype.getGCRatio = function () {
  let gc = (this.match(/G|C|g|c/g) || []).length;
  let at = (this.match(/A|T|a|t/g) || []).length;
  let gcRatio = Math.round((100 * gc) / (at + gc)) / 100;
  return gcRatio;
};

String.prototype.getNBase = function () {
  return this.match(/N|n/g) ? this.match(/N|n/g).length : 0;
};

String.prototype.getInvalidBase = function () {
  return this.replace(/A|C|T|G|N|a|c|t|g|n|\s|\n/g, "").length;
};

String.prototype.rev = function () {
  return this.split("").reverse().join("");
};

String.prototype.comp = function () {
  const lookup: { [key: string]: string } = {
    A: "T",
    T: "A",
    C: "G",
    G: "C",
    N: "N",
  };
  return this.split("")
    .map((el) => lookup[el])
    .join("");
};

String.prototype.addSpace = function (grp: number) {
  if (grp === 0) {
    return this.toString();
  }
  const re = new RegExp(`.{0,` + grp + `}`, "g");
  return this.match(re).join(" ");
};

export {};
