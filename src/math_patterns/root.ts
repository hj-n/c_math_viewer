
enum RootType {
    sqrt, cbrt
}

class Root extends Pattern {
    type : RootType;

    constructor(first : Pattern, second : Pattern, type : RootType) {
        super(first, second);
        this.type = type;
    }
}