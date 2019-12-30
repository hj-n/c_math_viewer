/**
 * Logarithm 
 * log, log2, log10, log1p
 */

enum LogType {
    log, log2, log10, log1p
}

class Log extends Pattern {
    type : LogType

    constructor(first : Pattern, second : Pattern, type : LogType) {
        super(first, second);
        this.type = type;
    }

}