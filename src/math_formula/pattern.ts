import { Formula } from "./formula";

/**
 * Base type of the math formula pattern
 */

export class Pattern extends Formula{
    private op_first : Formula;
    private op_second : Formula;

    constructor(str : string, first : Formula, second : Formula) {
        super(str);
        this.op_first = first;
        this.op_second = second;
    }
}