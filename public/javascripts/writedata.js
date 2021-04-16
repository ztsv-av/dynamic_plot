import {fsLibrary} from "../../app.js"
function writeData() {

    // Data which will need to add in a file.
    var data = "\nHello world."

    // Write data in 'newfile.txt' . 
    fsLibrary.appendFile('data.txt', data, 'utf8', (error) => {

        // In case of a error throw err exception. 
        if (error) throw err;
    })
}