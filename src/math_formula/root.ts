
enum RootType {
    sqrt, cbrt
}

class Root extends Pattern {
    type : RootType;

    constructor(first : Formula, second : Formula, type : RootType) {
        super(first, second);
        this.type = type;
    }
}