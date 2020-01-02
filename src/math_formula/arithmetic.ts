import { Pattern } from "./pattern";
import { Formula } from "./formula";

export enum ArithType {
    add, sub, mul, div, mod
}

export class Arith extends Pattern {
    
    type : ArithType;

    constructor(str : string, first : Formula, second : Formula, type : ArithType) {
        super(str, first, second);
        this.type = type;
    }
    accept(visitor: import("../formula_visitor").formula_visitor) {
        return visitor.visitArith(this);
    }
}