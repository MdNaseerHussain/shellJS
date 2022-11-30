const readline = require('readline-sync');
const path = require('path');
const os = require('os');

currentDirectory = os.homedir();

while(true) {
    const command = readline.question(`shell ${currentDirectory} $ `);

    switch (command) {
        case 'pwd':
            console.log(currentDirectory);
            break;
        case 'ls':
            //
            break;
        case 'cd':
            //
            break;
        case 'exit':
            process.exit();
        default:
            console.log('Command not found');
            break;
    }
}
