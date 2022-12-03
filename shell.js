const readline = require('readline-sync');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

currentDirectory = os.homedir();
console.log(currentDirectory)

const newCommand = () => {
    const command = readline.question(`shell ${currentDirectory} $ `);

    const execPromise = (command) => {
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
    };

    switch (command.trim().split(' ')[0]) {
        case 'exit':
            process.exit();
        case 'cd':
            const newDirectory = path.resolve(currentDirectory, command.trim().split(' ')[1]);
            execPromise(`cd ${newDirectory}`).then((_) => {
                currentDirectory = newDirectory;
                newCommand();
            }).catch((error) => {
                console.log(error);
                newCommand();
            });
            break;
        default:
            execPromise(command).then((stdout) => {
                console.log(stdout);
                newCommand();
            })
            .catch((error) => {
                console.log(error);
                newCommand();
            });
    }
};

newCommand();