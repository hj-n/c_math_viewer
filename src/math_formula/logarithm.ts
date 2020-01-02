import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Logarithm 
 * log, logf, logl : log
 * log2, log2f, log2l : log2
 * log10, log10f, log10l : log10
 * log1p, log1pf, log1pl : log1p
 */

export enum LogType {
    log, log2, log10, log1p
}

export class Log extends SingleOperand {
    accept(visitor: import("../formula_visitor").formula_visitor) {
        throw new Error("Method not implemented.");
    }
    type : LogType

    constructor(str : string, op : Formula, type : LogType) {
        super(str, op);
        this.type = type;
    }

}