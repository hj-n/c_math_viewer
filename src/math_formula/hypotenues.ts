import { Pattern } from "./pattern";
import { Formula } from "./formula";

/**
 * hypot, hypotf, hypotl
 */


export class Hypot extends Pattern {
    accept(visitor: import("../formula_visitor").formula_visitor) {
        throw new Error("Method not implemented.");
    }

    constructor(str : string, first : Formula, second : Formula) {
        super(str, first, second);
    }

}