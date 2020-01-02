import { SingleOperand } from "./single_operand";
import { Formula } from "./formula";

/**
 * abs, labs, llabs
 * fabs, fabsf, fabsl
 * cabsf, cabs, cabsl
 * All of these can be represented as | x |
 */

export class Abs extends SingleOperand {
    
    constructor(str: string, op : Formula) {
        super(str, op);
    }
    accept(visitor: import("../formula_visitor").formula_visitor) : any {
        return visitor.visitAbs(this);
    }

}