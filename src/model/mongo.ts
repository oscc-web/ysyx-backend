const config = require("../config/config-dynamic.ts");

let dbURL = (!config.dbUsername) ? "mongodb://127.0.0.1:27017/" :
                                   `mongodb://${config.dbUsername}:` +
                                   `${config.dbPassword}@127.0.0.1:27017/` +
                                   `${config.dbName}`;
				   console.log(dbURL)
let dbClient = new (require("mongodb").MongoClient)(dbURL);

module.exports = {
    deleteDataOne: async (dbName, ceName, condObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const res = await dbCollection.deleteOne(condObj);
            console.log("[data] delete data one");
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    },
    deleteDataMany: async (dbName, ceName, condObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const res = await dbCollection.deleteMany(condObj);
            console.log("[data] delete data many, number: " + res.deletedCount);
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    },
    findData: async (dbName, ceName, condObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const res = await dbCollection.find(condObj).toArray();
            console.log("[data] find data");
            console.log("[data]", res);
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    },
    findDataByOrder: async (dbName, ceName, condObj, sortCol, sortASC) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const sortObj = { [sortCol]: (sortASC ? 1 : -1) };
            const res = await dbCollection.find(condObj).sort(sortObj).toArray();
            console.log("[data] find data by order");
            console.log("[data]", res);
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    },
    insertDataOne: async (dbName, ceName, dataObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const res = await dbCollection.insertOne(dataObj);
            console.log("[data] insert data one");
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    },
    insertDataMany: async (dbName, ceName, dataArr) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const res = await dbCollection.insertMany(dataArr);
            console.log("[data] insert data many, number: "  + res.insertedCount);
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    },
    updateDataOne: async (dbName, ceName, condObj, dataObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const dbObjSet = { $set: dataObj };
            const res = await dbCollection.updateOne(condObj, dbObjSet);
            console.log("[data] update data one");
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    },
    updateDataMany: async (dbName, ceName, condObj, dataObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const dbObjSet = { $set: dataObj };
            const res = await dbCollection.updateMany(condObj, dbObjSet);
            console.log("[data] update data many, number: " + res.modifiedCount);
            await dbClient.close();
            return res;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    }
}
