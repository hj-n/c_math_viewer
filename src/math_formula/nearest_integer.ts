
import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Nearest Integer
 * 
 * ceil, ceilf, ceill : ceil
 * floor, floorf, floorl : floor
 * trunc, truncf, truncl : trunc
 * round, roundf, roundl 
 * lround, lroundf, lroundl 
 * llround, llroundf, llroundl : round
 */


export enum NearType {
    ceil, floor, trunc, round
}

export class Near extends SingleOperand {
    type : NearType;

    constructor(str : string, op : Formula, type : NearType) {
        super(str, op);
        this.type = type;
    }
}

