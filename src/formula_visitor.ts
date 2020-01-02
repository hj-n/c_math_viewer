import { Gamma } from "./math_formula/gamma";
import { Log } from "./math_formula/logarithm";
import { Hypot } from "./math_formula/hypotenues";
import { Exp } from "./math_formula/exponential";
import { Arith } from "./math_formula/arithmetic";
import { Abs } from "./math_formula/absolute";
import { Err } from "./math_formula/error";
import { Near } from "./math_formula/nearest_integer";
import { Paren } from "./math_formula/parenthesis";
import { Pow } from "./math_formula/power";
import { Root } from "./math_formula/root";
import { Tri } from "./math_formula/trigonometric";
import { TriD } from "./math_formula/trigonometric_double";
import { Var } from "./math_formula/variable";

export abstract class formula_visitor {
    abstract visitAbs(formula : Abs) : string;
    abstract visitArith(formula : Arith) : string;
    abstract visitErr(formula : Err) : string;
    abstract visitExp(formula : Exp) : string;
    abstract visitGamma(formula : Gamma) : string;
    abstract visitHypot(formula : Hypot) : string;
    abstract visitLog(formula : Log) : string;
    abstract visitNear(formula : Near) : string;
    abstract visitParen(formula : Paren) : string;
    abstract visitPow(formula : Pow) : string;
    abstract visitRoot(formula : Root) : string;
    abstract visitTri(formula : Tri) : string;
    abstract visitTriD(formula : TriD) : string;
    abstract visitVar(formula : Var) : string;
    
}
