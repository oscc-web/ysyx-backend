let dbURL = "mongodb://127.0.0.1:27017";
let dbClient = new (require("mongodb").MongoClient)(dbURL);

module.exports = {
    deleteDataOne: async (dbName, ceName, condObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            await dbCollection.deleteOne(condObj);
            console.log("[data] delete data one");
            await dbClient.close();
        }
        catch (err) {
            console.error(err);
        }
    },
    deleteDataMany: async (dbName, ceName, condObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const res = await dbCollection.deleteMany(condObj);
            console.log("[data] delete data many");
            console.log("[data] delete data number: " + res.deletedCount);
            await dbClient.close();
        }
        catch (err) {
            console.error(err);
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
        }
    },
    insertDataOne: async (dbName, ceName, dataObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            await dbCollection.insertOne(dataObj);
            console.log("[data] insert data one");
            await dbClient.close();
        }
        catch (err) {
            console.error(err);
        }
    },
    insertDataMany: async (dbName, ceName, dataArr) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const res = await dbCollection.insertMany(dataArr);
            console.log("[data] insert data many");
            console.log("[data] insert data number: " + res.insertedCount);
            await dbClient.close();
        }
        catch (err) {
            console.error(err);
        }
    },
    updateDataOne: async (dbName, ceName, condObj, dataObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const dbObjSet = { $set: dataObj };
            await dbCollection.updateOne(condObj, dbObjSet);
            console.log("[data] update data one");
            await dbClient.close();
        }
        catch (err) {
            console.error(err);
        }
    },
    updateDataMany: async (dbName, ceName, condObj, dataObj) => {
        try {
            await dbClient.connect();
            const dbCurr = dbClient.db(dbName);
            const dbCollection = dbCurr.collection(ceName);
            const dbObjSet = { $set: dataObj };
            const res = await dbCollection.updateMany(condObj, dbObjSet);
            console.log("[data] update data many");
            console.log("[data] update data number: " + res.modifiedCount);
            await dbClient.close();
        }
        catch (err) {
            console.error(err);
        }
    }
}
