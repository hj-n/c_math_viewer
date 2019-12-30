enum NearType {
    ceil, floor, trunc, round
}

class Near extends Pattern {
    type : NearType;

    constructor(first : Pattern, second : Pattern, type : NearType) {
        super(first, second);
        this.type = type;
    }
}

