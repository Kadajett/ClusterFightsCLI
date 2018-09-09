const figlet = require('figlet');
const inquirer = require('inquirer');
const WebTorrent = require('webtorrent');
const fs = require('fs');

const options = {
    'tasks': [
        'MD5 Collision Finder',
        'Map Traversal'
    ]
}

class App {
    constructor() {
        this.title();
        // this.getTasks();
    }

    title() {
        figlet('Cluster Fights CLI', (err, data) => {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data);
            this.getTasks();
        })
    }

    prepMD5 () {
        inquirer
            .prompt([{type: 'confirm', name: 'Would you like to download the current MD5 test information'}])
            .then((answer) => {
                if(answer['Would you like to download the current MD5 test information']) {
                    this.generateFile(100);
                }
            });
    }

    generateFile(lines, outputDirectory) {
        let lineList = new Array(lines).fill('');
        lineList = lineList.map(line => {
            return this.generateLine();
        });
        
        console.log(lineList);
    }

    generateLine() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
      
        for (var i = 0; i < 100; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }

    downloadFile() {
        // Ask the user the location to download the file to.
        let client = new WebTorrent();

        client.add('./text.torrent', (torrent) => {
            console.log(torrent)
        });
    }

    getTasks() {
        inquirer
        .prompt([{type: 'list', name: 'taskList', choices: options.tasks}])
        .then(answer => {
            this.prepMD5();
        })
    }
}

new App();