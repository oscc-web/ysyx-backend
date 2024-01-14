const moment = require("moment");
const mongo = require("../src/model/mongo.ts");

function genRandomNum(bound) {
    return Math.floor(Math.random() * bound);
}

function genRandomStr(size) {
    let chars  = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let genStr = "";

    for(let i = 0; i < size; i++) {
        genStr += chars[genRandomNum(chars.length)];
    }

    return genStr;
}

function genRandomObj(keyCount, nestFlag) {
    let genObj = {};

    for (let i = 0; i < keyCount; i++) {
        let genObjKey;
        switch (genRandomNum(nestFlag ? 6 : 5)) {
            case 0: {
                genObjKey = genRandomNum(1000);
                break;
            }
            case 1: {
                genObjKey = Math.random();
                break;
            }
            case 2: {
                genObjKey = Math.random() < 0.5 ? true : false;
                break;
            }
            case 3: {
                genObjKey = genRandomStr(genRandomNum(5) + 5);
                break;
            }
            case 4: {
                genObjKey = null;
                break;
            }
            case 5: {
                genObjKey = genRandomObj(keyCount, nestFlag);
                break;
            }
        }
        genObj[genRandomStr(5)] = genObjKey;
    }
    genObj["index"] = testIndex;
    genObj["date"]  = moment().format("yyyy-MM-DD HH:mm:ss");
    testIndex++;

    return genObj;
}

const testCycle = 5;
let testIndex = 0;
let testResObj = {
    "insertDataOne:   ": false,
    "insertDataMany:  ": false,
    "updateDataOne:   ": false,
    "updateDataMany:  ": false,
    "findData:        ": false,
    "findDataByOrder: ": false,
    "deleteDataOne:   ": false,
    "deleteDataMany:  ": false
}

module.exports = {
    testMongo: async () => {
        console.log("------------")
        console.log("Test MongoDB");
        console.log("------------");

        console.log("Test insert");
        console.log("=========================");
        try {
            for (let i = 0; i < testCycle; i++) {
                const dataObj = genRandomObj(5, false);
                await mongo.insertDataOne("ysyx", "test", dataObj);
            }
        }
        catch (err) {
            testResObj["insertDataOne"] = false;
        }
        finally {
            testResObj["insertDataOne"] = true;
        }
        console.log("=========================");
        try {
            for (let i = 0; i < testCycle; i++) {
                const dataObj1 = genRandomObj(5, false);
                const dataObj2 = genRandomObj(5, false);
                await mongo.insertDataMany("ysyx", "test", [dataObj1, dataObj2]);
            }
        }
        catch (err) {
            testResObj["insertDataMany"] = false;
        }
        finally {
            testResObj["insertDataMany"] = true;
        }

        console.log();
        console.log("Test update");
        console.log("=========================");
        try {
            await mongo.updateDataOne("ysyx", "test", {}, { name: "test" });
        }
        catch (err) {
            testResObj["updateDataOne"] = false;
        }
        finally {
            testResObj["updateDataOne"] = false;
        }
        console.log("=========================");
        try {
            await mongo.updateDataMany("ysyx", "test", {}, { name: "test" });
        }
        catch (err) {
            testResObj["updateDataMany"] = false;
        }
        finally {
            testResObj["updateDataMany"] = true;
        }

        console.log();
        console.log("Test find");
        console.log("=========================");
        try {
            await mongo.findData("ysyx", "test", { name: "test" });
        }
        catch (err) {
            testResObj["findData"] = false;
        }
        finally {
            testResObj["findData"] = true;
        }
        console.log("=========================");
        try {
            await mongo.findDataByOrder("ysyx",
                                        "test",
                                        { name: "test" },
                                        "index",
                                        true);
            await mongo.findDataByOrder("ysyx",
                                        "test",
                                        { name: "test" },
                                        "index",
                                        false);
        }
        catch (err) {
            testResObj["findDataByOrder"] = false;
        }
        finally {
            testResObj["findDataByOrder"] = true;
        }

        console.log();
        console.log("Test delete");
        console.log("=========================");
        try {
            await mongo.deleteDataOne("ysyx", "test", { name: "test" });
        }
        catch (err) {
            testResObj["deleteDataOne"] = false;
        }
        finally {
            testResObj["deleteDataOne"] = true;
        }
        console.log("=========================");
        try {
            await mongo.deleteDataMany("ysyx", "test", { name: "test" });
        }
        catch (err) {
            testResObj["deleteDataMany"] = false;
        }
        finally {
            testResObj["deleteDataMany"] = true;
        }

        console.log();
        console.log("Test result");
        console.log("=========================");
        for (const key in testResObj) {
            if (key.indexOf(":") != -1) {
                console.log(key + (testResObj ? "PASS" : "FAIL"));
            }
        }
    }
}

