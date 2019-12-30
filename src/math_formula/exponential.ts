import { Formula } from "./formula";
import { Pattern } from "./pattern";

/** 
 * Exponential functions
 * exp, ldexp, expml
 */

enum ExpType {
    exp, ldexp, expml
}

class Exp extends Pattern {
    type : ExpType;

    constructor(str : string, first : Formula, second : Formula, type : ExpType) {
        super(str, first, second);
        this.type = type;
    }

}


