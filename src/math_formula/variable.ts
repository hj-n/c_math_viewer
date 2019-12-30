import { Formula } from "./formula";

enum VarType {
    E, LOG2E, LOG10E, LN2, LN10, PI, PI_2, PI_4, _1_PI, _2_PI, _2_SQRTPI, SQRT2, SQRT1_2, ELSE
}

export class Var extends Formula {
    type : VarType;

    constructor(str : string) {
        super(str);
        switch(str) {
            case "M_E"        : { this.type = VarType.E;         break; }
            case "M_LOG2E"    : { this.type = VarType.LOG2E;     break; }
            case "M_LOG10E"   : { this.type = VarType.LOG10E;    break; }
            case "M_LN2"      : { this.type = VarType.LN2;       break; }
            case "M_LN10"     : { this.type = VarType.LN10;      break; }
            case "M_PI"       : { this.type = VarType.PI;        break; }
            case "M_PI_2"     : { this.type = VarType.PI_2;      break; }
            case "M_PI_4"     : { this.type = VarType.PI_4;      break; }
            case "M_1_PI"     : { this.type = VarType._1_PI;     break; }
            case "M_2_PI"     : { this.type = VarType._2_PI;     break; }
            case "M_2_SQRTPI" : { this.type = VarType._2_SQRTPI; break; }
            case "M_SQRT2"    : { this.type = VarType.SQRT2;     break; }
            case "M_SQRT1_2"  : { this.type = VarType.SQRT1_2;   break; }
            default           : { this.type = VarType.ELSE;      break; }  // not pre-defined math.h constants
        }        
        

        this.type = VarType.E;
    }
}