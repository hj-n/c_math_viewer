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
    
    type : RootType;

    constructor(str: string, op : Formula,  type : RootType) {
        super(str, op);
        this.type = type;
    }
    
    accept(visitor: import("../formula_visitor").formula_visitor) : any  {
        return visitor.visitRoot(this);
    }
}