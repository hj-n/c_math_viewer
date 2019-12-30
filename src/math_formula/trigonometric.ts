import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Trigonometric functions 
 * sin, cos, tan, asin, acos, atan2
 *  
 */ 


enum TriType {
    sin, cos, tan, asin, acos, atan2
}

class Tri extends SingleOperand {
    private type : TriType;
    
    constructor(str : string, op : Formula, type : TriType) {
        super(str, op);
        this.type = type;
    }
}