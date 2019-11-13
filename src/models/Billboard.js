module.exports = class Billboard{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.visits = 1;
    }

    visit(){
        this.visits++;
    }

    match(x, y){
        return this.x === x && this.y === y;
    }

    print(){
        console.log(`[${this.x}, ${this.y}][${this.visits}]`)
    }
}