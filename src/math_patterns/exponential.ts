/** 
 * Exponential functions
 * exp, ldexp, expml
 */

enum ExpType {
    exp, ldexp, expml
}

class Exp extends Pattern {
    type : ExpType;

    constructor(first : Pattern, second : Pattern, type : ExpType) {
        super(first, second);
        this.type = type;
    }

}


