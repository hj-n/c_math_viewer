
enum ConstType {

}

class Const extends Formula {
    type : ConstType;

    constructor(type : ConstType) {
        super();
        this.type = type;
    }
}