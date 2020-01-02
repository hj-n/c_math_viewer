import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Error
 * erf, erff, erfl : erf
 * erfc, erfcf, erfcl : erfc
 */

export enum ErrType {
    erf, erfc
}

export class Err extends SingleOperand {
    
    type : ErrType

    constructor(str : string, op : Formula, type : ErrType) {
        super(str, op);
        this.type = type;
    }
    
    accept(visitor: import("../formula_visitor").formula_visitor) {
        return visitor.visitErr(this);
    }

}