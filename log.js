/*
@param {string} message
@param {'info'|'error'|'warning'} type
@return {void}
@description This function is used to log messages to the console with different colors based on the type
*/
const logger = (message, type)=>{
    switch (type){
        case 'info':
            console.log(`\x1b[34m[INFO]: ${message}\x1b[0m`);
            break;
        case 'error':
            console.log(`\x1b[31m[ERROR]: ${message} \x1b[0m`);
            break;
        case 'warning':
            console.log(`\x1b[33m[WARNING]: ${message}\x1b[0m`);
            break;
    }
};

module.exports = logger;