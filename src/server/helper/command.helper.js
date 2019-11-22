class CommandHelper {


    getBillboardsStats(rawData) {

        const billboards = [];
        const drones = rawData.map(data => {
            data.status.photos.forEach(photo => {
                if (!billboards.some(item => {
                    return (item.x === photo.x && item.y === photo.y);
                })) {
                    billboards.push(photo);
                }
            });

            return {
                index: data.index,
                totalBillboard: data.status.photos.length,
                position: data.status.position
            }
        });
        return {
            uniqueBillboard: billboards.length,
            droneStatus: drones
        };
    }

    /**
     * Get raw data of drone status
     * @param quantity
     * @param command
     * @returns {[]}
     */
    getBillboardPhotos(quantity, command) {
        const droneStatus = [];
        const commands = this.getCommands(quantity, command);
        Object.keys(commands).forEach(key => {
            droneStatus.push(
                {
                    index: Number(key) + 1,
                    status: this.processCommand(commands[key])
                }
            );
        });
        return droneStatus;
    }

    /**
     * Get command for each drone
     * @param quantity
     * @param command
     */
    getCommands(quantity, command) {
        const commandChars = command.split('');
        let commandArray = {};
        for (let i = 0; i < commandChars.length; i += quantity) {
            for (let j = 0; j < quantity; j++) {
                commandArray[j] = commandArray[j] ? commandArray[j] : '';
                commandArray[j] += (commandChars[i + j] ? commandChars[i + j] : '');
            }
        }
        return commandArray;
    }

    /**
     * Process command and get photos takes by drone
     * @param command
     * @returns {{position: *, photos: *}}
     */
    processCommand(command) {
        let position = {
            x: 0,
            y: 0
        };

        const photos = [];
        command.split('').forEach(char => {
            switch (char) {
                case 'x':
                    photos.push(this.takePhoto(position));
                    break;
                case '<':
                    this.moveWest(position);
                    break;
                case '>':
                    this.moveEast(position);
                    break;
                case '^':
                    this.moveNorth(position);
                    break;
                case 'v':
                    this.moveSouth(position);
                    break;
                default:
                    break
            }

        });

        return {
            position: position,
            photos: photos
        };
    }

    moveWest(position) {
        position.x -= 1;
        return position;
    }

    moveSouth(position) {
        position.y -= 1;
        return position;
    }

    moveEast(position) {
        position.x += 1;
        return position;
    }

    moveNorth(position) {
        position.y += 1;
        return position;
    }

    takePhoto(position) {
        return {...position};
    }
}

module.exports = new CommandHelper();
