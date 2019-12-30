import { Pattern } from "./pattern";

import { Formula } from "./formula";

enum NearType {
    ceil, floor, trunc, round
}

class Near extends Pattern {
    type : NearType;

    constructor(first : Formula, second : Formula, type : NearType) {
        super(first, second);
        this.type = type;
    }
}

