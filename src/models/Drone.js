'use strict';

module.exports = class Drone{
    constructor(path){
        this.path = path;
        this.billboards = [];
        this.posX = 0;
        this.posY = 0;
    }
}
