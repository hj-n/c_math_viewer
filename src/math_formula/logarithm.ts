import { Pattern } from "./pattern";

import { Formula } from "./formula";

/**
 * Logarithm 
 * log, log2, log10, log1p
 */

enum LogType {
    log, log2, log10, log1p
}

class Log extends Pattern {
    type : LogType

    constructor(first : Formula, second : Formula, type : LogType) {
        super(first, second);
        this.type = type;
    }

}