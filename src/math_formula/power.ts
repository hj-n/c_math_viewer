import { Pattern } from "./pattern";
import { Formula } from "./formula";

/**
 * pow, powf, powl
 */

export class Pow extends Pattern {
    accept(visitor: import("../formula_visitor").formula_visitor) {
        throw new Error("Method not implemented.");
    }

    constructor(str: string, first: Formula, second: Formula) {
        super(str, first, second);
    }
}