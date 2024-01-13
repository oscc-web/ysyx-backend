const fs = require("fs");

module.exports = {
    addDataToBack: function(fileName, obj) {
        const dataArr = this.findDataAll(fileName);
        dataArr.push(obj);
        fs.writeFileSync(fileName, JSON.stringify(dataArr));
        return dataArr;
    },
    addDataToTop: function(fileName, obj) {
        const dataArr = this.findDataAll(fileName);
        dataArr.unshift(obj);
        fs.writeFileSync(fileName, JSON.stringify(dataArr));
        return dataArr;
    },
    deleteDataById: function(fileName, id) {
        const dataArr = this.findDataAll(fileName);
        const dataObjIndex = dataArr.findIndex((v) => {
            return v.id === id
        });
        if (dataObjIndex !== -1) {
            dataArr.splice(dataObjIndex, 1);
            fs.writeFileSync(fileName, JSON.stringify(dataArr), "utf-8");
            return true;
        }
        else {
            return false;
        }
    },
    findDataAll: function(fileName) {
        try {
            fs.accessSync(fileName);
        }
        catch (err) {
            fs.writeFileSync(fileName, "[]", "utf-8");
        }
        const dataArr = JSON.parse(fs.readFileSync(fileName, "utf-8"));
        return dataArr;
    },
    findDataByCol: function(fileName, type, col, value) {
        const dataArr = this.findDataAll(fileName);
        let dataArrNew = [];
        dataArr.forEach((v) => {
            if (type === "equal") {
                if (v[col] === value) {
                    dataArrNew.push(v);
                }
            }
            else if (type === "like") {
                if (v[col].indexOf(value) !== -1) {
                    dataArrNew.push(v);
                }
            }
            else {
            }
        });
        if (dataArrNew.length > 0) {
            return dataArrNew;
        }
        else {
            return [];
        }
    },
    findDataByOrder: function(fileName, sortField, sortType, sortOrder) {
        let dataArr = [];
        if (typeof(fileName) === "string") {
            dataArr = this.findDataAll(fileName);
        }
        else {
            dataArr = fileName;
        }

        return this.handleDataOrder(dataArr,
                                    sortField,
                                    sortType,
                                    sortOrder);
    },
    findDataByPage: function(fileName, page, pagePerNum) {
        let dataArr = [];
        if (typeof(fileName) === "string") {
            dataArr = this.findDataAll(fileName);
        }
        else {
            dataArr = fileName;
        }

        let dataNum = dataArr.length;
        if (page === undefined || page === "") {
            page = 0;
        }
        page = parseInt(page);
        if (pagePerNum === undefined || pagePerNum === "") {
            pagePerNum = 0;
        }
        pagePerNum = parseInt(pagePerNum);

        let pageNum = page * pagePerNum;
        if (pageNum === 0 || pageNum > dataNum) {
            pageNum = dataNum;
        }
        const dataPageArr = dataArr.slice((page - 1) * pagePerNum, pageNum);
        return dataPageArr;
    },
    updateDataById: function(fileName, id, obj) {
        const dataArr = this.findDataAll(fileName);
        const dataObj = dataArr.find((v) => {
            return v.id === id
        });
        if (dataObj) {
            Object.assign(dataObj, obj);
            fs.writeFileSync(fileName, JSON.stringify(dataArr), "utf-8");
            return true;
        }
        else {
            return false;
        }
    },

    handleDataOrder: function(dataArr, sortField, sortType, sortOrder) {
        dataArr.sort((objA, objB) => {
            let valA = objA[sortField];
            let valB = objB[sortField];
            if (sortType === "val") {
                if (typeof(valA) === "string") {
                    valA = parseInt(valA);
                    valB = parseInt(valB);
                }
                if (sortOrder === "asc") {
                    return (valA - valB);
                }
                else if (sortOrder === "desc") {
                    return (valB - valA);
                }
                else {
                    return 0;
                }
            }
            else if (sortType === "date") {
                let dateA = new Date(valA);
                let dateB = new Date(valB);
                let timeA = dateA.getTime();
                let timeB = dateB.getTime();
                if (sortOrder === "asc") {
                    return (timeA - timeB);
                }
                else if (sortOrder === "desc") {
                    return (timeB - timeA);
                }
                else {
                    return 0;
                }
            }
        });
        return dataArr;
    }
};
