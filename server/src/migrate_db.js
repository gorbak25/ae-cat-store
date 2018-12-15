const fs = require('fs');
const path = require('path');
const sha256File = require('sha256-file');
const mongoose = require('mongoose');
const Cat = require("../models/cat");

const appDir = path.dirname(require.main.filename);
const cats = JSON.parse(fs.readFileSync(appDir + '/../cats.json', 'utf8'));

console.log("Cats definitions loaded");

function connect_to_db() {
    return new Promise(resolve => {
        mongoose.connect('mongodb://localhost:27017/cats', { useNewUrlParser: true });
        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error"));
        db.once("open", function(callback){
            console.log("Connection to DB Succeeded");
            resolve();
        });
    });
}

function delete_all_cats() {
    return new Promise(resolve => {
          Cat.deleteMany({}, function (error) {
              if(error) {
                  console.log(error);
                  process.exit(-1);
              }
              console.log("Old cats deleted from DB");
              resolve();
          });
        }
    )
}

function add_cat(definition) {
    return new Promise(resolve => {
        var new_cat = new Cat(definition);

        new_cat.save(function (error) {
            if (error) {
                console.log(error);
                process.exit(-1);
            }
            resolve();
        })
    })
}

async function migrate() {
    await connect_to_db();
    await delete_all_cats();

    console.log("Saving cats to db");

    for(id in cats) {
        cat_definition = cats[id];
        cat_hash = sha256File(appDir + "/../cats/" + cat_definition.filename);
        cat_definition["hash"] = cat_hash;
        await add_cat(cat_definition);
    }

    console.log("Cats migrated");
    process.exit(0);
}

migrate();
