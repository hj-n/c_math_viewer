import { Pattern } from "./pattern";
import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Hyperbolic functions
 * sinh, cosh, tanh, acosh, asinh, atanh
 */


enum HypType {
    sinh, cosh, tanh, acosh, asinh, atanh
}

class Hyp extends SingleOperand {
    private type : HypType;

    constructor(str : string, op : Formula, type : HypType) {
        super(str, op);
        this.type = type;
    }
}