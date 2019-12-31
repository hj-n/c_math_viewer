import { stringify } from "querystring";

import {Formula} from "./math_formula/formula";
import {Var} from "./math_formula/variable";
import {Arith, ArithType} from "./math_formula/arithmetic";
import {Paren} from "./math_formula/parenthesis";
import {Abs} from "./math_formula/absolute";

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


    // signature 가지고 비교할 차례다!!
    switch(signature) {
        // Absolute
        case "abs" :
        case "labs" :
        case "llabs" :
        case "fabs" : 
        case "fabsf" :
        case "fabsl" :
        case "cabs" :
        case "cabsf" :
        case "cabsl" : {
            let parsed_result : Parsed_Result = argument_parsing(argument, 1);
            if(parsed_result.is_success) {
                return new Abs(str, resolve_pattern(parsed_result.args[0]));
            }
            else {
                return new Var(str);
            }
        }
        // exponential
        
    }


    return new Var("");
}




export function resolve_pattern (pattern : string) : Formula {


    let math_parenthesis = /^\(.*\)$/;
    let math_function = /^[A-Za-z0-9_ ]*\([A-Za-z0-9_,()\+\-\*%\/ ]*\)$/;
    let math_arithmetic_contains = /[\+\-\*%\/]/;


    if(math_parenthesis.test(pattern) && check_parenthesis_matching(pattern)) {    // parenthesis
        console.log("parenthesis");
        return make_parenthesis_matching(pattern);
    }
    else if(math_function.test(pattern) && check_parenthesis_matching(pattern)) {   // function(if in math.h) & variable (or not)
        console.log("function");
        return make_function_matching(pattern);
    }
    else if(pattern.search(math_arithmetic_contains) >= 0) {   // arithmetic
        console.log("Arithmetic");
        return make_arithmetic_instance(pattern);

    }
    else {     // constant (variable)
        console.log("constant");
        return make_const_instance(pattern);
    }

    let temp : Formula = new Formula("ss");
    return temp;
}



