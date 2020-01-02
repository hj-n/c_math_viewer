import { formula_visitor } from "./formula_visitor";
import { Abs } from "./math_formula/absolute";
import { Arith } from "./math_formula/arithmetic";
import { Err } from "./math_formula/error";
import { Exp } from "./math_formula/exponential";
import { Gamma } from "./math_formula/gamma";
import { Hypot } from "./math_formula/hypotenues";
import { Log } from "./math_formula/logarithm";
import { Near } from "./math_formula/nearest_integer";
import { Paren } from "./math_formula/parenthesis";
import { Pow } from "./math_formula/power";
import { Root } from "./math_formula/root";
import { Tri } from "./math_formula/trigonometric";
import { TriD } from "./math_formula/trigonometric_double";
import { Var, VarType } from "./math_formula/variable";
import { stringify } from "querystring";

export class generate_formula_visitor extends formula_visitor {
    visitAbs(formula: Abs): string {
        throw new Error("Method not implemented.");
    }   
    visitArith(formula: Arith): string {
        throw new Error("Method not implemented.");
    }
    visitErr(formula: Err): string {
        throw new Error("Method not implemented.");
    }
    visitExp(formula: Exp): string {
        throw new Error("Method not implemented.");
    }
    visitGamma(formula: Gamma): string {
        let op_string : string = formula.op.accept(this);
        return "𝚪⟮" + op_string + "⟯";
    }
    visitHypot(formula: Hypot): string {
        throw new Error("Method not implemented.");
    }
    visitLog(formula: Log): string {
        throw new Error("Method not implemented.");
    }
    visitNear(formula: Near): string {
        throw new Error("Method not implemented.");
    }
    visitParen(formula: Paren): string {
        throw new Error("Method not implemented.");
    }
    visitPow(formula: Pow): string {
        throw new Error("Method not implemented.");
    }
    visitRoot(formula: Root): string {
        throw new Error("Method not implemented.");
    }
    visitTri(formula: Tri): string {
        throw new Error("Method not implemented.");
    }
    visitTriD(formula: TriD): string {
        throw new Error("Method not implemented.");
    }
    visitVar(formula: Var): string {
        switch(formula.type) {
            case VarType.E : return "𝐞";
            case VarType.LOG2E : return "𝐥𝐨𝐠₂𝐞"
            case VarType.LOG10E : return "𝐥𝐨𝐠₁₀𝐞"
            case VarType.LN2 : return "𝐥𝐧2"
            case VarType.LN10 : return "𝐥𝐧10"
            case VarType.PI : return "𝛑"
            case VarType.PI_2 : return "𝛑/2"
            case VarType.PI_4 : return "𝛑/4"
            case VarType._1_PI : return "1/𝛑"
            case VarType._2_PI : return "2/𝛑"
            case VarType._2_SQRTPI : return "2/√𝛑"
            case VarType.SQRT2 : return "√2"
            case VarType.SQRT1_2 : return "1/√2"
            case VarType.ELSE : return this.str_to_formula_style(formula.str);
        }
    }

    private str_to_formula_style(str : string) : string {
        let result : string = "";
        let i : number = 0;
        for( ; i < str.length; i++) {
            let char : string = str.charAt(i);
            switch(char) {
                case "a" : result += "𝑎"; break; case "b" : result += "𝑏"; break; case "c" : result += "𝑐"; break;
                case "d" : result += "𝑑"; break; case "e" : result += "𝑒"; break; case "f" : result += "𝑓"; break;
                case "g" : result += "𝑔"; break; case "h" : result += "ℎ"; break; case "i" : result += "𝑖"; break;
                case "j" : result += "𝑗"; break; case "k" : result += "𝑘"; break; case "l" : result += "𝑙"; break;
                case "m" : result += "𝑚"; break; case "n" : result += "𝑛"; break; case "o" : result += "𝑜"; break;
                case "p" : result += "𝑝"; break; case "q" : result += "𝑞"; break; case "r" : result += "𝑟"; break;
                case "s" : result += "𝑠"; break; case "t" : result += "𝑡"; break; case "u" : result += "𝑢"; break;
                case "v" : result += "𝑣"; break; case "w" : result += "𝑤"; break; case "x" : result += "𝑥"; break;
                case "y" : result += "𝑦"; break; case "z" : result += "𝑧"; break;

                case "A" : result += "𝐴"; break; case "B" : result += "𝐵"; break; case "C" : result += "𝐶"; break;
                case "D" : result += "𝐷"; break; case "E" : result += "𝐸"; break; case "F" : result += "𝐹"; break;
                case "G" : result += "𝐺"; break; case "H" : result += "𝐻"; break; case "I" : result += "𝐼"; break;
                case "J" : result += "𝐽"; break; case "K" : result += "𝐾"; break; case "L" : result += "𝐿"; break;
                case "M" : result += "𝑀"; break; case "N" : result += "𝑁"; break; case "O" : result += "𝑂"; break;
                case "P" : result += "𝑃"; break; case "Q" : result += "𝑄"; break; case "R" : result += "𝑅"; break;
                case "S" : result += "𝑆"; break; case "T" : result += "𝑇"; break; case "U" : result += "𝑈"; break;
                case "V" : result += "𝑉"; break; case "W" : result += "𝑊"; break; case "X" : result += "𝑋"; break;
                case "Y" : result += "𝑌"; break; case "Z" : result += "𝑍"; break;

                case "(" : result += "⟮"; break; case ")" : result += "⟯"; break; 
                default  : result += char; break;
            }
        }
        return result;
    }


}