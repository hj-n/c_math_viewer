
/**
 * Base type of the math formula pattern
 */

class Pattern {
    private op_first : Pattern;
    private op_second : Pattern;

    constructor(first : Pattern, second : Pattern) {
        this.op_first = first;
        this.op_second = second;
    }
}