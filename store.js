var storage = "./storage.json";
var fs = require('fs');
var store = new Store(storage);
var params = process.argv;
var command = params[2];

switch (command) {
    case "add":
        store.add(params[3], params[4]);
        break;
    case "get":
        store.get(params[3]);
        break;
    case "remove":
        store.remove(params[3]);
        break;
    case "list":
        store.list();
        break;
    case "clear":
        store.clear()
        break;
    default:
        console.log(`this command isn't available
        Try "add, get, remove, list, clear"`);
        break;
}

store.save();

function Store(filename) {

    if (fs.existsSync(storage)) {
        this.data = JSON.parse(fs.readFileSync(filename));
    } else {
        console.log(`File does not found`);
    }

    this.add = function (key, val) {
        if (key && val) {
            this.data[key] = val;
            console.info(`${key} added`);
        } else {
            console.log('Key or Value are missing');
        }
    }

    this.remove = function (key) {
        if (key) {
            delete this.data[key];
            console.log(`${key} is removed`);
        } else {
            console.log('Key is  missing');
        }
    }

    this.get = function (key) {
        if (key) {
            if (this.data[key]) {
                console.log(`${key} : ${this.data[key]}`);
            } else {
                console.log("key is not found")
            }
        } else {
            console.log('Key is  missing');
        }
    }

    this.list = function () {
        for (let key in this.data) {
            console.log(`${key} : ${this.data[key]}`);
        }
    }

    this.clear = function () {
        for (let key in this.data) {
            delete this.data[key];
        }
        console.log("Done");
    }

    this.save = function () {
        fs.writeFileSync(storage , JSON.stringify(this.data));
    }
}