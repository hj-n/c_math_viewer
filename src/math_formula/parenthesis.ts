import { SingleOperand } from "./single_operand";

export class Paren extends SingleOperand {
   
    accept(visitor: import("../formula_visitor").formula_visitor) : any{
        return visitor.visitParen(this);
    }
    
}