module.exports = class Billboard{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.visits = 1;
    }

    visit(){
        this.visits++;
    }

    matchPosition(x, y){
        return this.x == x && this.y == y;
    }
    
    // For matching another billboard
    matchBillboard(billboard){
        return this.x === billboard.x && this.y === billboard.y;
    }

    increment(x){
        this.visits += x;
    }

    print(){
        console.log(`[${this.x}, ${this.y}][${this.visits}]`)
    }
}