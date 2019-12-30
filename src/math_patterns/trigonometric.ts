/**
 * Trigonometric functions 
 * sin, cos, tan, asin, acos, atan2
 *  
 */ 


enum TriType {
    sin, cos, tan, asin, acos, atan2
}

class Tri extends Pattern {
    private type : TriType;
    
    constructor(first : Pattern, second : Pattern, type : TriType) {
        super(first, second);
        this.type = type;
    }
}