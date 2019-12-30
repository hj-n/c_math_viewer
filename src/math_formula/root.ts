import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

enum RootType {
    sqrt, cbrt
}

class Root extends SingleOperand {
    type : RootType;

    constructor(str: string, op : Formula,  type : RootType) {
        super(str, op);
        this.type = type;
    }
}