let Billboard = require('./Billboard');

module.exports = class Drone {

    constructor(instructions, id){
        this.instructions = instructions;
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.billboards = []
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
                    this.billboards.push(new Billboard(this.x, this.y))
                    break;
                default:
                    // NOTE: this should not trigger as char validation was achieved in regex
                    console.error("An unknown character was detected in instructions...");
                    break;
            }
        }
        console.log("journey completed")
    }


}