let Billboard = require('./Billboard');
let billboardGrid = require('./BillboardGrid');

module.exports = class Drone {

    constructor(instructions, id){
        this.instructions = instructions;
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.billboards = []
        this.billboardGrid = new billboardGrid();
    }

    completeJourney (){
        console.log(`starting journey for Drone[${this.id}]`)
        for(let i = 0; i < this.instructions.length; i++){
            switch(this.instructions[i]){
                case '^':
                    this.y++;
                    break;
                case 'v':
                    this.y--;
                    break;
                case '<':
                    this.x--;
                    break;
                case '>':
                    this.x++;
                    break;
                case 'x':
                    // NOTE: This is fine for small journeys, but can get expensive later on 
                    const existingBillboard = this.billboards.find(b => b.matchPosition(this.x, this.y))
                    if(existingBillboard)
                        existingBillboard.visit()
                    else {
                        this.billboards.push(new Billboard(this.x, this.y))
                        this.billboardGrid.increaseGrid(this.x, this.y)
                    }
                    break;
                default:
                    // NOTE: this should not trigger as char validation was achieved in regex
                    console.error("An unknown character was detected in instructions...");
                    break;
            }
        }
        console.log("journey completed")
    }

    getJourney(){
        return this
    }

    // Used for sorting the billboards
    sort(){
        this.billboards.sort((a, b) => {
            let sort  = a.x - b.x;
            if(sort == 0)
                return sort = a.y - b.y;
            return sort;
        })
    }
}