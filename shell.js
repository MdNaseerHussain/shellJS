const readline = require('readline-sync');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

currentDirectory = os.homedir();

const execPromise = async (command) => {
    return new Promise((resolve, reject) => {
        exec(`cd ${currentDirectory}; ${command}`, {shell: 'powershell'}, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${error.message}`);
            } else if (stderr) {
                reject(`stderr: ${stderr}`);
            } else {
                resolve(`${stdout}`);
            }
        });
    });
}

const newCommand = async () => {
    const command = readline.question(`shell ${currentDirectory} $ `);
    let result;

    switch (command.trim().split(' ')[0]) {
        case 'exit':
            process.exit();
        case 'cd':
            const newDirectory = path.resolve(currentDirectory, command.trim().split(' ')[1]);
            try {
                await execPromise(`cd ${newDirectory}`);
                currentDirectory = newDirectory;
            } catch (e) {
                console.log(e);
            }
            break;
        default:
            result = await execPromise(command);
            console.log(result);
    }
};

const main = async () => {
    while (true) {
        await newCommand();
    }
};

main();
