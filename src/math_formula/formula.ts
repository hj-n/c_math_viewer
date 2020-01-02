import { formula_visitor } from "../formula_visitor";


export class Formula {

    str : string;
    
    
    constructor(str : string) {
        this.str = str;
    }

    accept(visitor : formula_visitor) : any {};
    
}