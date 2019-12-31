import { Pattern } from "./pattern";
import { Formula } from "./formula";


/**
 * atan2, atan2f, atan2l
 */

export class TriD extends Pattern {

    constructor(str: string, first: Formula, second : Formula) {
        super(str, first, second);
    }
}