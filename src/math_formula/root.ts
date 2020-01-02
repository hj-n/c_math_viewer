import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Root functions
 * 
 * sqrt, sqrtf, sqrtl : sqrt
 * cbrt, cbrtf, cbrtl : cbrt
 * 
 */

export enum RootType {
    sqrt, cbrt
}

export class Root extends SingleOperand {
    accept(visitor: import("../formula_visitor").formula_visitor) {
        throw new Error("Method not implemented.");
    }
    type : RootType;

    constructor(str: string, op : Formula,  type : RootType) {
        super(str, op);
        this.type = type;
    }
}