import { Formula } from "./formula";


export class SingleOperand extends Formula {
    op : Formula;

    constructor(str : string, op : Formula) {
        super(str);
        this.op = op;
    }
}