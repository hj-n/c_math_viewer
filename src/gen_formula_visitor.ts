import { formula_visitor } from "./formula_visitor";
import { Abs } from "./math_formula/absolute";
import { Arith, ArithType } from "./math_formula/arithmetic";
import { Err, ErrType } from "./math_formula/error";
import { Exp, ExpType } from "./math_formula/exponential";
import { Gamma } from "./math_formula/gamma";
import { Hypot } from "./math_formula/hypotenues";
import { Log, LogType } from "./math_formula/logarithm";
import { Near, NearType } from "./math_formula/nearest_integer";
import { Paren } from "./math_formula/parenthesis";
import { Pow } from "./math_formula/power";
import { Root, RootType } from "./math_formula/root";
import { Tri, TriType } from "./math_formula/trigonometric";
import { TriD } from "./math_formula/trigonometric_double";
import { Var, VarType } from "./math_formula/variable";

export class generate_formula_visitor extends formula_visitor {
    
    private ts : string = " ";   // thin space
    private hs : string = " ";   // hair space

    visitAbs(formula: Abs): string {
        let op_string : string = formula.op.accept(this);
        return "|" + this.hs + op_string + this.hs + "|"
    }   
    visitArith(formula: Arith): string {
        let op_first : string  = formula.op_first.accept(this);
        let op_second : string = formula.op_second.accept(this);
        switch(formula.type) {
            case ArithType.add : return op_first + " + " + op_second;
            case ArithType.sub : return op_first + " - " + op_second;
            case ArithType.mul : return op_first + " × " + op_second;
            case ArithType.div : return op_first + " / " + op_second;
            case ArithType.mod : return op_first + " 𝐦𝐨𝐝 " + op_second;
        }
    }
    visitErr(formula: Err): string {
        let op_string : string = formula.op.accept(this);
        let erf : string = "𝐞𝐫𝐟" + this.hs + "⟮" + this.hs + op_string + this.hs + "⟯";
        switch(formula.type) {
            case ErrType.erf  : return erf;
            case ErrType.erfc : return "⟮" + this.hs + "1 - " + erf + this.hs + "⟯";
        }
    }
    visitExp(formula: Exp): string {
        let op_first : string  = formula.op_first.accept(this);
        let op_second : string = formula.op_second.accept(this);
        let e : string = "𝐞" + this.ts + "^" + this.ts;
        let two : string = "2" + this.ts + "^" + this.ts;
        switch(formula.type) {
            case ExpType.exp   : return e + "[" + this.ts + op_first  + this.ts + "]";
            case ExpType.exp2  : return two + "[" + this.ts + op_first  + this.ts + "]";
            case ExpType.expm1 : return "⟮" + this.hs + e + "[" + this.ts + op_first  + this.ts + "]" + " - 1" + this.hs + "⟯";
            case ExpType.ldexp : return op_first + " × " + two + "[" + this.ts + op_second  + this.ts + "]";
        }
    }
    visitGamma(formula: Gamma): string {
        let op_string : string = formula.op.accept(this);
        return "𝚪" + this.hs+"⟮" + this.hs +  op_string + this.hs + "⟯";
    }
    visitHypot(formula: Hypot): string {
        let op_first : string  = formula.op_first.accept(this);
        let op_second : string = formula.op_second.accept(this);
        return "√" + "⟮" + this.hs + op_first + "² + " + op_second + "²" + this.hs + "⟯";
    }
    visitLog(formula: Log): string {
        let op_string : string = formula.op.accept(this);
        if((formula.op instanceof Arith || formula.op instanceof Exp || formula.op instanceof Pow) 
                && formula.type != LogType.log1p) {
            op_string = "⟮" + this.hs + op_string + this.hs + "⟯";
        }
        switch(formula.type) {
            case LogType.log   : return "𝐥𝐨𝐠ₑ" + this.hs +op_string;
            case LogType.log2  : return "𝐥𝐨𝐠₂" + this.hs + op_string;
            case LogType.log10 : return "𝐥𝐨𝐠₁₀" + this.hs +op_string;
            case LogType.log1p : return "𝐥𝐨𝐠ₑ" + this.hs + "⟮" + this.hs + "1 + " + op_string + this.hs + "⟯";
        }
    }
    visitNear(formula: Near): string {
        let op_string : string = formula.op.accept(this);
        switch(formula.type) {
            case NearType.ceil  : return "⌈" + this.ts + op_string + this.ts + "⌉";
            case NearType.floor : return "⌊" + this.ts + op_string + this.ts + "⌋" ;
            case NearType.trunc : return "⌊" + this.ts + op_string + this.ts + "⌋" ;
            case NearType.round : return "𝐫𝐨𝐮𝐧𝐝" + this.hs + "⟮" + this.ts + op_string + this.ts + "⟯" ;
        }

    }
    visitParen(formula: Paren): string {
        let op_string : string = formula.op.accept(this);
        return "⟮" + this.ts + op_string + this.ts + "⟯";
    }
    visitPow(formula: Pow): string {
        let op_first : string  = formula.op_first.accept(this);
        let op_second : string = formula.op_second.accept(this);
        if(formula.op_first instanceof Arith || 
           formula.op_first instanceof Exp   ||
           formula.op_first instanceof Pow) {
               op_first = "⟮" + this.ts + op_first  + this.ts + "⟯";
        }
        return op_first + this.ts + "^" + this.ts + "[" + this.ts + op_second + this.ts + "]";
    }
    visitRoot(formula: Root): string {
        let op_string : string = formula.op.accept(this);
        op_string = "⟮" + this.ts + op_string  + this.ts + "⟯";
        switch(formula.type) {
            case RootType.sqrt : return "√" + op_string;
            case RootType.cbrt : return "∛" + op_string;
        }
    }
    visitTri(formula: Tri): string {
        let op_string : string = formula.op.accept(this);
        op_string = "(" + this.ts + op_string  + this.ts + ")";
        switch(formula.type) {
            case TriType.sin : return "𝒔𝒊𝒏" + op_string;
            case TriType.cos : return "𝒄𝒐𝒔" + op_string;
            case TriType.tan : return "𝒕𝒂𝒏" + op_string;
            case TriType.asin : return "𝒂𝒔𝒊𝒏" + op_string;
            case TriType.acos : return "𝒂𝒄𝒐𝒔" + op_string;
            case TriType.atan : return "𝒂𝒕𝒂𝒏" + op_string;
            case TriType.sinh : return "𝒔𝒊𝒏𝒉" + op_string;
            case TriType.cosh : return "𝒄𝒐𝒔𝒉" + op_string;
            case TriType.tanh : return "𝒕𝒂𝒏𝒉" + op_string;
            case TriType.asinh : return "𝒂𝒔𝒊𝒏𝒉" + op_string;
            case TriType.acosh : return "𝒂𝒄𝒐𝒔𝒉" + op_string;
            case TriType.atanh : return "𝒂𝒕𝒂𝒏𝒉" + op_string;
        }
    }
    visitTriD(formula: TriD): string {
        let op_first : string  = formula.op_first.accept(this);
        let op_second : string = formula.op_second.accept(this);
        if(formula.op_first instanceof Arith || 
           formula.op_first instanceof Exp   ||
           formula.op_first instanceof Pow   ) {
               op_first = "⟮" + this.ts + op_first  + this.ts + "⟯";
        }
        if(formula.op_second instanceof Arith ||
           formula.op_second instanceof Exp   ||
           formula.op_second instanceof Pow   ) {
                op_second = "⟮" + this.ts + op_second  + this.ts + "⟯";
        }
        return "𝒂𝒕𝒂𝒏(" + this.ts + op_first + " / " + op_second + this.ts +")";
    }
    visitVar(formula: Var): string {
        switch(formula.type) {
            case VarType.E         : return "𝐞";
            case VarType.LOG2E     : return "𝐥𝐨𝐠₂𝐞"
            case VarType.LOG10E    : return "𝐥𝐨𝐠₁₀𝐞"
            case VarType.LN2       : return "𝐥𝐨𝐠ₑ2"
            case VarType.LN10      : return "𝐥𝐨𝐠ₑ10"
            case VarType.PI        : return "𝛑"
            case VarType.PI_2      : return "𝛑/2"
            case VarType.PI_4      : return "𝛑/4"
            case VarType._1_PI     : return "1/𝛑"
            case VarType._2_PI     : return "2/𝛑"
            case VarType._2_SQRTPI : return "2/√𝛑"
            case VarType.SQRT2     : return "√2"
            case VarType.SQRT1_2   : return "1/√2"
            case VarType.ELSE      : return this.str_to_formula_style(formula.str);
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