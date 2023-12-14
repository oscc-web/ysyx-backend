const path = require("path");
const json = require("../models/json.js");

const {
    dirDB
} = require("../config/config.js");

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

            const booksArr = json.getJSONDataByField(
                path.join(dirDB, "books.json"),
                "equal",
                "id",
                dataObj.id
            );
            if (booksArr .length > 0) {
                res.end(JSON.stringify({
                    msg: "success",
                    data: booksArr[0].download
                }));
            }
            else {
                res.end(JSON.stringify({
                    msg: "empty",
                    data: 0
                }));
            }
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

            const booksArr = json.getJSONDataByField(
                path.join(dirDB, "books.json"),
                "equal",
                "id",
                dataObj.id
            );
            if (booksArr.length > 0) {
                let download = (booksArr[0].download);
                download++;

                json.setJSONDataById(
                    path.join(dirDB, "books.json"),
                    dataObj.id, {
                        download: download
                    }
                );
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
    }
}
