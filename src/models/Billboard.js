module.exports = class Billboard{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    print(){
        console.log(`[${this.x}, ${this.y}]`)
    }
}