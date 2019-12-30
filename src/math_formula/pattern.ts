
/**
 * Base type of the math formula pattern
 */

class Pattern extends Formula{
    private op_first : Formula;
    private op_second : Formula;

    constructor(first : Formula, second : Formula) {
        super();
        this.op_first = first;
        this.op_second = second;
    }
}