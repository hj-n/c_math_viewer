import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

/**
 * Trigonometric functions 
 * sin, cos, tan, asin, acos, atan2
 * sinh, cosh, tanh, acosh, asinh, atanh
 * 
 * sin, sinf, sinl  : sin
 * cos, cosf, cosl  : cos
 * tan, tanf, tanl  : tan
 * asin, asinf, asinl : asin
 * acos, acosf, acosl : acos
 * atan, atanf, atanl : atan
 * sinh, sinhf, sinhl, csinh, csinhf, csinhl : sinh
 * cosh, coshf, coshl, ccosh, ccoshf, ccoshl : cosh
 * tanh, tanhf, tanhl, ctanh, ctanhf, ctanhl : tanh
 * asinh, asinhf, asinhl, casinh, casinhf, casinhl : asinh
 * acosh, acoshf, acoshl, cacosh, cacoshf, cacoshl : acosh
 * atanh, atanhf, atanhl, catanh, catanhf, catanhl : atanh
 *  
 */ 


export enum TriType {
    sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh
}

export class Tri extends SingleOperand {
    type : TriType;
    
    constructor(str : string, op : Formula, type : TriType) {
        super(str, op);
        this.type = type;
    }
    accept(visitor: import("../formula_visitor").formula_visitor) {
        return visitor.visitTri(this);
    }
}