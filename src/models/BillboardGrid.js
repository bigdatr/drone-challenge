module.exports = class BillboardGrid{
    constructor(){
        this.xmin = 0;
        this.xmax = 0;
        this.ymin = 0;
        this.ymax = 0;
    }

    increaseGrid(x, y){
        if(x < this.xmin)
            this.xmin = x;
        if(x > this.xmax)
            this.xmax = x;
        if(y < this.ymin)
            this.ymin = y;
        if(y > this.ymax)
            this.ymax = y;
    }
}