import { SingleOperand } from "./single_operand";
import { Formula } from "./formula";

/**
 * abs, labs, llabs
 * fabs, fabsf, fabsl
 * cabsf, cabs, cabsl
 * All of these can be represented as | x |
 */

export class Abs extends SingleOperand {
    accept(visitor: import("../formula_visitor").formula_visitor) {
        throw new Error("Method not implemented.");
    }

    constructor(str: string, op : Formula) {
        super(str, op);
    }
}