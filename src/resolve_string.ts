import { stringify } from "querystring";

import {Formula} from "./math_formula/formula";


/** 
 * 
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



export function resolve_pattern (pattern : string) : Formula {


    let math_parenthesis = /^\(.*\)$/;
    let math_function = /^[A-Za-z0-9_ ]*\([A-Za-z0-9_,()\+\-\*%\/ ]*\)$/;
    let math_arithmetic_contains = /[\+\-\*%\/]/;


    if(math_parenthesis.test(pattern) && check_parenthesis_matching(pattern)) {
        console.log("parenthesis");
    }
    else if(math_function.test(pattern) && check_parenthesis_matching(pattern)) {
        console.log("function");
    }
    else if(pattern.search(math_arithmetic_contains) >= 0) {
        console.log("Arithmetic");
    }
    else {
        console.log("constant");
    }

    let temp : Formula = new Formula();
    return temp;
}



