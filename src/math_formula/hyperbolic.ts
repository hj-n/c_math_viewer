
/**
 * Hyperbolic functions
 * sinh, cosh, tanh, acosh, asinh, atanh
 */


enum HypType {
    sinh, cosh, tanh, acosh, asinh, atanh
}

class Hyp extends Pattern {
    private type : HypType;

    constructor(first : Formula, second : Formula, type : HypType) {
        super(first, second);
        this.type = type;
    }
}