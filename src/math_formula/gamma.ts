import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";
import { formula_visitor } from "../formula_visitor";

/**
 * Gamma
 * tgamma, tgammaf, tgammal : tgamma
 * lgamma, lgammaf, lgammal : lgamma
 */

export enum GammaType {
    tgamma, lgamma
}

export class Gamma extends SingleOperand {
    type : GammaType

    constructor(str : string, op : Formula, type : GammaType) {
        super(str, op);
        this.type = type;
    }

    accept(visitor : formula_visitor) : any {
        return visitor.visitGamma(this);
    }

}