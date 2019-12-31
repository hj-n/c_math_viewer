import { stringify } from "querystring";

import {Formula} from "./math_formula/formula";
import {Var} from "./math_formula/variable";
import {Arith, ArithType} from "./math_formula/arithmetic";
import {Paren} from "./math_formula/parenthesis";
import {Abs} from "./math_formula/absolute";
import { Exp, ExpType } from "./math_formula/exponential";
import { LogType, Log } from "./math_formula/logarithm";
import { NearType, Near } from "./math_formula/nearest_integer";
import { Pow } from "./math_formula/power";
import { RootType, Root } from "./math_formula/root";
import { Hypot } from "./math_formula/hypotenues";
import { TriType, Tri } from "./math_formula/trigonometric";
import { TriD } from "./math_formula/trigonometric_double";

/* ============================================================== */
/* HELPER FUNCTIONs / INTERFACE */

/** 
 * Check whether the first left parenthesis matches with right parenthesis,
 * and right parenthesis's position is the end of the input string
 * Made to filter out non-function or non-parenthesis pattern which has 
 * left parentehsis and right parenthesis in the very first and last position:
 * for example, (a + b) + (c + d) will be filtered out.
 */
function check_parenthesis_matching(pattern : string) : boolean {
    
    let stack : number = 0;
    let i     : number = 0;

    for(; i < pattern.length; i++) {
        if(pattern.charAt(i) == "(") {
            stack++; 
            i++;
            break;
        }
    }

    for(; i < pattern.length; i++) {
        if(pattern.charAt(i) == "(") {
            stack++;
        }
        else if(pattern.charAt(i) == ")") {
            stack--;
            if(stack == 0) break;
        }
    }

    if(i == pattern.length - 1) return true;
    else return false;
}

interface Parsed_Result {
    is_success : boolean;
    args : string[];
}

function argument_parsing(str : string, arg_num : number) : Parsed_Result {
    
    let stack          : number = 0;
    let comma_num      : number = 0;
    let comma_position : number[] = [];

    let i : number = 0;
    
    for(; i < str.length; i++) {
        let cur : string = str[i];
        switch(cur) {
            case "(" : { stack++; break; }
            case ")" : { stack--; break; }
            case "," : {
                if(stack == 0) {
                    comma_num++;
                    comma_position.push(i);
                }
            }
        }
    }

    if(comma_num == arg_num - 1) {   // Can be successfully parsed!!
        let args : string[] = [];
        let start_index = 0; 
        let i : number = 0;

        for(; i < comma_num; i++) {
            args.push(str.slice(start_index, comma_position[i]).trim());
            start_index = comma_position[i] + 1;
        }
        args.push(str.slice(start_index).trim());

        return {is_success : true, args : args};
    }
    else {
        return {is_success : false, args : new Array()};
    }


}

function abs_formula(str : string, argument : string) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 1);
    if(parsed_result.is_success) {
        return new Abs(str, resolve_pattern(parsed_result.args[0]));
    }
    else return new Var(str);
}

function exp_formula(str : string, argument : string, type : ExpType) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 1);
    if(parsed_result.is_success) {
        return new Exp(str, resolve_pattern(parsed_result.args[0]), new Formula(""), type);
    }
    else return new Var(str);
}

function exp_double_formula(str : string, argument : string, type : ExpType) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 2); // double argument
    if(parsed_result.is_success) {
        let op_first : Formula = resolve_pattern(parsed_result.args[0]);
        let op_second : Formula = resolve_pattern(parsed_result.args[1]);
        return new Exp(str, op_first, op_second, type);
    }
    else return new Var(str);
}

function log_formula(str : string, argument : string, type : LogType) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 1);
    if(parsed_result.is_success) {
        return new Log(str, resolve_pattern(parsed_result.args[0]), type);
    }
    else return new Var(str);
}

function nearest_int_formula(str : string, argument : string, type : NearType) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 1);
    if(parsed_result.is_success) {
        return new Near(str, resolve_pattern(parsed_result.args[0]), type);
    }
    else return new Var(str);
}

function pow_formula(str : string, argument : string) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 2); // double argument
    if(parsed_result.is_success) {
        let op_first : Formula = resolve_pattern(parsed_result.args[0]);
        let op_second : Formula = resolve_pattern(parsed_result.args[1]);
        return new Pow(str, op_first, op_second);
    }
    else return new Var(str);
}

function root_formula(str : string, argument : string, type : RootType) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 1);
    if(parsed_result.is_success) {
        return new Root(str, resolve_pattern(parsed_result.args[0]), type);
    }
    else return new Var(str);
}

function hypot_formula(str : string, argument : string) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 2); // double argument
    if(parsed_result.is_success) {
        let op_first : Formula = resolve_pattern(parsed_result.args[0]);
        let op_second : Formula = resolve_pattern(parsed_result.args[1]);
        return new Hypot(str, op_first, op_second);
    }
    else return new Var(str);
}

function tri_formula(str : string, argument : string, type : TriType) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 1);
    if(parsed_result.is_success) {
        return new Tri(str, resolve_pattern(parsed_result.args[0]), type);
    }
    else return new Var(str);
}

function tri_double_formula(str : string, argument : string) : Formula {
    let parsed_result : Parsed_Result = argument_parsing(argument, 2); // double argument
    if(parsed_result.is_success) {
        let op_first : Formula = resolve_pattern(parsed_result.args[0]);
        let op_second : Formula = resolve_pattern(parsed_result.args[1]);
        return new TriD(str, op_first, op_second);
    }
    else return new Var(str);
}

/* END OF HELPERs */
/* ============================================================== */


function make_const_instance(str : string) : Formula {
    let result : Formula = new Var(str);
    return result;
}

function make_arithmetic_instance(str : string) : Formula {

    let stack : number = 0;
    let arith : string = "";
    let i     : number = 0;

    for(; i < str.length; i++) {
        if (str.charAt(i) == "(")      stack++;
        else if (str.charAt(i) == ")") stack--;
        else if (str.charAt(i) == "+" ||
                 str.charAt(i) == "-" ||
                 str.charAt(i) == "/" ||
                 str.charAt(i) == "*" ||
                 str.charAt(i) == "%") {
                    if(stack == 0) {
                        arith = str.charAt(i);
                        break;
                    }
                    else {
                        continue;
                    }
        }
    }

    let op_left  : Formula = resolve_pattern(str.slice(0, i).trim());
    let op_right : Formula = resolve_pattern(str.slice(i + 1).trim());

    switch(arith) {
        case "+" : { return new Arith(str, op_left, op_right, ArithType.add); }
        case "-" : { return new Arith(str, op_left, op_right, ArithType.sub); }
        case "*" : { return new Arith(str, op_left, op_right, ArithType.mul); }
        case "/" : { return new Arith(str, op_left, op_right, ArithType.div); }
        case "%" : { return new Arith(str, op_left, op_right, ArithType.mod); }
        default  : { return new Var(str); }  // actually, never happen (checked before function call)
    }
}

function make_parenthesis_matching(str : string) : Formula {
    let result : Formula = new Paren(str, resolve_pattern(str.slice(1, str.length-1).trim()));
    return result;
}

function make_function_matching(str : string) : Formula {

    // find the index to slice off the function signature
    let i : number = 0;
    for(; i < str.length; i++) {
        if(str.charAt(i) == "(") 
            break;
    }

    let signature : string = str.slice(0, i).trim();
    let argument : string = str.slice(i+1, str.length - 1).trim();

    switch(signature) {
        // Absolute
        case "abs"      : case "labs"     : case "llabs"    :
        case "fabs"     : case "fabsf"    : case "fabsl"    :
        case "cabs"     : case "cabsf"    : case "cabsl"    : return abs_formula(str, argument);
        // exponential
        case "exp"      : case "expf"     : case "expl"     : return exp_formula(str, argument, ExpType.exp);
        case "exp2"     : case "exp2f"    : case "exp2l"    : return exp_formula(str, argument, ExpType.exp2);
        case "expm1"    : case "expm1f"   : case "expm1l"   : return exp_formula(str, argument, ExpType.expm1);
        case "ldexp"    : case "ldexpf"   : case "ldexpl"   : return exp_double_formula(str, argument, ExpType.ldexp);
        // Logarithm
        case "log"      : case "logf"     : case "logl"     : return log_formula(str, argument, LogType.log);
        case "log2"     : case "log2f"    : case "log2l"    : return log_formula(str, argument, LogType.log2); 
        case "log10"    : case "log10f"   : case "log10l"   : return log_formula(str, argument, LogType.log10);
        case "log1p"    : case "log1pf"   : case "log1pl"   : return log_formula(str, argument, LogType.log1p);
        // Neareast Integer
        case "ceil"     : case "ceilf"    : case "ceill"    : return nearest_int_formula(str, argument, NearType.ceil);
        case "floor"    : case "floorf"   : case "floorl"   : return nearest_int_formula(str, argument, NearType.floor);
        case "trunc"    : case "truncf"   : case "truncl"   : return nearest_int_formula(str, argument, NearType.trunc);
        case "round"    : case "roundf"   : case "roundl"   : 
        case "lround"   : case "lroundf"  : case "lroundl"  : 
        case "llround"  : case "llroundf" : case "llroundl" : return nearest_int_formula(str, argument, NearType.round);
        // Pow
        case "pow"      : case "powf"     : case "powl"     : return pow_formula(str, argument);
        // Root
        case "sqrt"     : case "sqrtf"    : case "sqrtl"    : return root_formula(str, argument, RootType.sqrt);
        case "cbrt"     : case "cbrtf"    : case "cbrtl"    : return root_formula(str, argument, RootType.cbrt);
        // Hypotenues
        case "hypot"    : case "hypotf"   : case "hypotl"   : return hypot_formula(str, argument);
        // Trigonometric
        case "sin"      : case "sinf"     : case "sinl"     : return tri_formula(str, argument, TriType.sin);
        case "cos"      : case "cosf"     : case "cosl"     : return tri_formula(str, argument, TriType.cos);
        case "tan"      : case "tanf"     : case "tanl"     : return tri_formula(str, argument, TriType.tan);

        case "asin"     : case "asinf"    : case "asinl"    : return tri_formula(str, argument, TriType.asin);
        case "acos"     : case "acosf"    : case "acosl"    : return tri_formula(str, argument, TriType.acos);
        case "atan"     : case "atanf"    : case "atanl"    : return tri_formula(str, argument, TriType.atan);

        case "sinh"     : case "sinhf"    : case "sinhl"    : 
        case "csinh"    : case "csinhf"   : case "csinhl"   : return tri_formula(str, argument, TriType.sinh);
        case "cosh"     : case "coshf"    : case "coshl"    :
        case "ccosh"    : case "ccoshf"   : case "ccoshl"   : return tri_formula(str, argument, TriType.cosh);
        case "tanh"     : case "tanhf"    : case "tanhl"    :
        case "ctanh"    : case "ctanhf"   : case "ctanhl"   : return tri_formula(str, argument, TriType.tanh);
        
        case "asinh"    : case "asinhf"   : case "asinhl"   : 
        case "casinh"   : case "casinhf"  : case "casinhl"  : return tri_formula(str, argument, TriType.asinh);
        case "acosh"    : case "acoshf"   : case "acoshl"   :
        case "cacosh"   : case "cacoshf"  : case "cacoshl"  : return tri_formula(str, argument, TriType.acosh);
        case "atanh"    : case "atanhf"   : case "atanhl"   :
        case "catanh"   : case "catanhf"  : case "catanhl"  : return tri_formula(str, argument, TriType.atanh);
        // Trigonometric_double
        case "atan2"    : case "atan2f"   : case "atan2l"   : return tri_double_formula(str, argument);
        // default
        default         : return new Var(str);
    }
}




export function resolve_pattern (pattern : string) : Formula {

    let math_parenthesis = /^\(.*\)$/;
    let math_function = /^[A-Za-z0-9_ ]*\([A-Za-z0-9_,()\+\-\*%\/ ]*\)$/;
    let math_arithmetic_contains = /[\+\-\*%\/]/;

    if(math_parenthesis.test(pattern) && check_parenthesis_matching(pattern)) {    // parenthesis
        return make_parenthesis_matching(pattern);
    }
    else if(math_function.test(pattern) && check_parenthesis_matching(pattern)) {   // function(if in math.h) & variable (or not)
        return make_function_matching(pattern);
    }
    else if(pattern.search(math_arithmetic_contains) >= 0) {   // arithmetic
        return make_arithmetic_instance(pattern);

    }
    else {     // constant (variable)
        return make_const_instance(pattern);
    }
}