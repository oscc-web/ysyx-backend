let dbClient = require("mongodb").MongoClient;
let dbURL = "mongodb://localhost:27017/";

module.exports = {
    createDataBase: (dbName) => {
        dbClient.connect(dbURL + dbName, (err, db) => {
            if (err) throw err;
            console.log("[data] create database");
            db.close();
        });
    },
    createCollection: (dbName, ceName) => {
        dbClient.connect(dbURL + dbName, function(err, db) {
            if (err) throw err;
            let dbConn = db.db(dbName);
            dbConn.collection(ceName).insertOne("{}", (err, res) => {
                if (err) throw err;
                console.log("[data] create collection");
                db.close();
            });
        });
    },
    insertDataOne: (dbName, ceName, dataObj) => {
        dbClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            let dbConn = db.db(dbName);
            dbConn.collection(ceName).insertOne(dataObj, (err, res) => {
                if (err) throw err;
                console.log("[data] insert data one");
                db.close();
            });
        });
    },
    insertDataMany: (dbName, ceName, dataArr) => {
        dbClient.connect(dbURL, function(err, db) {
            if (err) throw err;
            let dbConn = db.db(dbName);
            dbConn.collection(ceName).insertMany(dataArr, (err, res) => {
                if (err) throw err;
                console.log("[data] insert data many");
                console.log("[data] insert data number: " + res.insertedCount);
                db.close();
            });
        });
    },
    findData: (dbName, ceName, condObj) => {
        dbClient.connect(dbURL, (err, db) => {
            if (err) throw err;
            let dbConn = db.db(dbName);
            dbConn.collection(ceName).find(condObj).toArray((err, res) => {
                if (err) throw err;
                console.log("[data] find data");
                console.log(res);
                db.close();
            });
        });
    },
    findDataByOrder: (dbName, ceName, condObj, sortASC) => {
        dbClient.connect(dbURL, (err, db) => {
            if (err) throw err;
            let dbConn = db.db(dbName);
            let sortObj = (sortASC) ? { type: 1} : { type: -1 };
            dbConn.collection(ceName).find(condObj).sort(sortObj).toArray((err, res) => {
                if (err) throw err;
                console.log("[data] find data by order");
                console.log(res);
                db.close();
            });
        });
    },
    updateDataOne: (dbName, ceName, condObj, dataObj) => {
        dbClient.connect(dbURL, (err, db) => {
            if (err) throw err;
            let dbConn = db.db(dbName);
            let dbObjSet = { $set: dataObj };
            dbConn.collection(ceName).updateOne(condObj, dbObjSet, (err, res) => {
                if (err) throw err;
                console.log("[data] update data one");
                db.close();
            });
        });
    },
    updateDataMany: (dbName, ceName, condObj, dataObj) => {
        dbClient.connect(dbURL, (err, db) => {
            if (err) throw err;
            let dbConn = db.db(dbName);
            let dbObjSet = { $set: dataObj };
            dbConn.collection(ceName).updateMany(condObj, dbObjSet, (err, res) => {
                if (err) throw err;
                console.log("[data] update data many");
                console.log("[data] update data number: " + res.result.nModified);
                db.close();
            });
        });
    },
    deleteDataOne: (dbName, ceName, condObj) => {
        dbClient.connect(dbURL, (err, db) => {
            if (err) throw err;
            let dbConn = db.db(dbName);
            dbConn.collection(ceName).deleteOne(condObj, (err, res) => {
                if (err) throw err;
                console.log("[data] delete data one");
                db.close();
            });
        });
    },
    deleteDataMany: (dbName, ceName, condObj) => {
        dbClient.connect(dbURL, (err, db) => {
            if (err) throw err;
            let dbConn = db.db(dbName);
            dbConn.collection(ceName).deleteMany(condObj, (err, res) => {
                if (err) throw err;
                console.log("[data] delete data many");
                console.log("[data] delete data number: " + res.result.n);
                db.close();
            });
        });
    }
}


