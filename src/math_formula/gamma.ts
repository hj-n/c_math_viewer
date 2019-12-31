import { Formula } from "./formula";
import { SingleOperand } from "./single_operand";

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

}