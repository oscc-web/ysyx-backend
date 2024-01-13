const path = require("path");
const json = require("../model/json.ts");
const mongo = require("../model/mongo.ts");

const {
    dirDB
} = require("../config/config.ts");

module.exports = {
    getBooksDownloadNum: (req, res) => {
        let dataStr = "";
        req.on("data", (data) => {
            dataStr += data;
        });
        req.on("end", () => {
            let dataObj = {};
            try {
                dataObj = JSON.parse(dataStr);
            }
            catch (e) {
                console.log(e);
            }

            res.setHeader("Access-Control-Allow-Origin", "*");

            mongo.findData("ysyx", "books", dataObj).then((resDB) => {
                if (resDB.length > 0) {
                    res.end(JSON.stringify({
                        msg: "success",
                        data: resDB[0].download
                    }));
                }
                else {
                    res.end(JSON.stringify({
                        msg: "empty",
                        data: 0
                    }));
                }
            });
        });
    },
    setBooksDownloadNum: (req, res) => {
        let dataStr = "";
        req.on("data", (data) => {
            dataStr += data;
        });
        req.on("end", () => {
            let dataObj = {};
            try {
                dataObj = JSON.parse(dataStr);
            }
            catch (e) {
                console.log(e);
            }

            res.setHeader("Access-Control-Allow-Origin", "*");

            mongo.findData("ysyx", "books", dataObj).then((resDB) => {
                if (resDB.length >= 0) {
                    if (resDB.length == 0) {
                        mongo.insertDataOne(
                            "ysyx",
                            "books",
                            Object.assign(dataObj, {
                                download: 1
                            }
                        ));
                    }
                    else {
                        let download = resDB[0].download;
                        download++;
                        mongo.updateDataOne("ysyx", "books", dataObj, {
                            download: download
                        });
                    }

                    res.end(JSON.stringify({
                        msg: "success"
                    }));
                }
                else {
                    res.end(JSON.stringify({
                        msg: "error"
                    }));
                }
            });
        });
    },
    setBooksErrorInfo: (req, res) => {
        let dataStr = "";
        req.on("data", (data) => {
            dataStr += data;
        });
        req.on("end", () => {
            let dataObj = {};
            try {
                dataObj = JSON.parse(dataStr);
            }
            catch (e) {
                console.log(e);
            }

            res.setHeader("Access-Control-Allow-Origin", "*");

            console.log(dataObj);

            mongo.insertDataOne("ysyx", "books", dataObj).then(() => {
                res.end(JSON.stringify({
                    msg: "success"
                }));
            })
            // const dataArr = json.findDataByCol(
            //     path.join(dirDB, "books.json"),
            //     "equal",
            //     "id",
            //     dataObj.id
            // );
            // if (dataArr.length > 0) {
            //     let download = (dataArr[0].download);
            //     download++;

            //     json.updateDataById(
            //         path.join(dirDB, "books.json"),
            //         dataObj.id, {
            //             download: download
            //         }
            //     );
            //     res.end(JSON.stringify({
            //         msg: "success"
            //     }));
            // }
            // else {
            //     res.end(JSON.stringify({
            //         msg: "error"
            //     }));
            // }
        });
    }
}
