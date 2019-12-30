
import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

enum NearType {
    ceil, floor, trunc, round
}

class Near extends SingleOperand {
    type : NearType;

    constructor(str : string, op : Formula, type : NearType) {
        super(str, op);
        this.type = type;
    }
}

