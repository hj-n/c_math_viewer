import { Pattern } from "./pattern";
import { Formula } from "./formula";

/**
 * hypot, hypotf, hypotl
 */


export class Hypot extends Pattern {

    constructor(str : string, first : Formula, second : Formula) {
        super(str, first, second);
    }

}