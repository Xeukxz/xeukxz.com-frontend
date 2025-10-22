declare global {
  interface String {
    stripIndent(): string;
    offsetIndent(count: number): string;
  }
}

/**
 * @param count number of indents (2 spaces) to remove from the start of each line
 */
String.prototype.offsetIndent = function (this: string, count: number) {
  return this.split("\n").map(line => line.replace("  ".repeat(count), '')).join("\n")
}

String.prototype.stripIndent = function (this: string) {
  // match all leading spaces or tabs at the start of lines
  const indentationList = this.match(/^(  )+?(?=\w)/gm); 
  if (!indentationList) return this; // no indentation found, return the original string
  // get the minimum indentation level
  const minIndentation = indentationList.reduce((min, current) => Math.min(min, current.length / 2), Infinity);
  return this.offsetIndent(minIndentation);
}

/** cleaner way to write multiline strings without having to worry about indentation */
export const betterString = (...args: string[]) => args.join("\n");