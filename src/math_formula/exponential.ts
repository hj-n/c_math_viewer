import { Formula } from "./formula";
import { Pattern } from "./pattern";

/** 
 * Exponential functions
 * exp, expf, expl (single argument)
 * exp2, exp2f, exp2l (single argument)
 * expm1, expm1f, expm1l (single argument)
 * ldexp, ldexpf, ldexpl (double argument)
 */

export enum ExpType {
    exp, exp2, expm1, ldexp
}

export class Exp extends Pattern {
    accept(visitor: import("../formula_visitor").formula_visitor) {
        throw new Error("Method not implemented.");
    }
    type : ExpType;

    constructor(str : string, first : Formula, second : Formula, type : ExpType) {
        super(str, first, second);
        this.type = type;
    }

}


