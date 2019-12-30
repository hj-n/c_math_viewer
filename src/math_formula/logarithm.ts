import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Logarithm 
 * log, log2, log10, log1p
 */

enum LogType {
    log, log2, log10, log1p
}

class Log extends SingleOperand {
    type : LogType

    constructor(str : string, op : Formula, type : LogType) {
        super(str, op);
        this.type = type;
    }

}