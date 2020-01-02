import { Pattern } from "./pattern";
import { Formula } from "./formula";

/**
 * pow, powf, powl
 * cpow, cpowf, cpowl
 */

export class Pow extends Pattern {
    

    constructor(str: string, first: Formula, second: Formula) {
        super(str, first, second);
    }

    accept(visitor: import("../formula_visitor").formula_visitor) : any {
        return visitor.visitPow(this);
    }
}