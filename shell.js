const readline = require('readline-sync');
const path = require('path-posix');
const os = require('os');
const { exec, fork } = require('child_process');
const convertPath = require( '@stdlib/utils-convert-path' );

let currentDirectory = convertPath(os.homedir(), 'posix');

const execPromise = async (command) => {
    return new Promise((resolve, reject) => {
        const child = exec(`cd ${currentDirectory}; ${command}`, {shell: 'bash'}, (error, stdout, stderr) => {
            if (error) {
                reject(`error: ${error.message}`);
            } else if (stderr) {
                reject(`stderr: ${stderr}`);
            } else {
                resolve(`${stdout}`);
            }
        });
        process.on('SIGINT', () => {
            console.log('Keyboard interrupt');
            child.kill();
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
            let newDirectory = path.resolve(currentDirectory, command.trim().split(' ')[1]);
            try {
                await execPromise(`cd ${newDirectory}`);
                currentDirectory = newDirectory;
            } catch (e) {
                console.log(e);
            }
            break;
        default:
            try {
                result = await execPromise(command);
                console.log(result);
            } catch (e) {
                console.log(e);
            }
    }
};

const main = async () => {
    while (true) {
        await newCommand();
    }
};

main();
