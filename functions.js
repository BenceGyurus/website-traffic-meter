const fs = require('fs');
const logger = require('./log');

class Functions{

    /*
    @param {string} fileName
    @return {object|boolean}
    @description This function is used to open a json file and return the parsed object
    */
    static openJsonFile(fileName, encoding='utf8'){
        try{
            let file = fs.readFileSync(fileName, encoding);
            if (file){
                try{
                    return JSON.parse(file);
                }catch{
                    logger("Error parsing data.json", "error");
                    return false;
                }
            }
            logger("Error reading data.json", "error");
            return false;
        }catch(error){
            logger(`Error reading ${fileName}`, "error");
            return false;
        }
    }

    /*
    @param {void}
    @return {object|boolean}
    @description This function is used to open the config.json file
    */
    static openConfig(){
        return this.openJsonFile('./config.json');
    }
}

module.exports = Functions;