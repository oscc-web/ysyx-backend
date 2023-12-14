const fs = require("fs");
const http = require("http");
const path = require("path");

const {
    port,
    dirRoot,
    dirUpload
} = require("./config/config.js");

const {
    setBooksDownloadNum,
    getBooksDownloadNum
} = require("./control/control.js");

const contentTypeObj = {
    "json": "application/json",
    "pdf":  "application/pdf",
    "woff": "font/woff",
    "css":  "text/css",
    "html": "text/html;charset=utf-8",
    "js":   "text/javascript",
    "txt":  "text/plain;charset=utf-8",
    "gif":  "image/gif",
    "jpg":  "image/jpg",
    "png":  "image/png"
}

if (!fs.existsSync(dirUpload)) {
    fs.mkdirSync(dirUpload);
}

function sendPage(res, path, statusCode = 200) {
    const suffix = path.substring(path.lastIndexOf(".") + 1);
    if (contentTypeObj[suffix] !== undefined) {
        res.writeHead(statusCode, {
            "content-Type": contentTypeObj[suffix]
        });
        fs.createReadStream(path).pipe(res);
    }
}

function handlePage404(res, fileDir) {
    if (!fs.existsSync(fileDir)) {
        res.writeHead(404, { "content-type": "text/html;charset=utf-8" });
        res.end("No files or directories!");
        console.log("[error] no files or directories: ", fileDir);
        return true;
    }
    return false
}

const server = http.createServer((req, res) => {
    let url = decodeURI(req.url);
    let method = req.method.toLowerCase()
    console.log("[info] interface url:", url);

    let parameterPosition = url.indexOf("?");
    if (parameterPosition > -1) {
        url = url.slice(0, parameterPosition);
        console.log("[info] interface url (remove parameters): ", url);
    }
    console.log("[info] interface method:", method);

    if (/^\/public\//.test(url)) {
        let fileDir = "." + url;
        if (!handlePage404(res, fileDir)) {
            fs.createReadStream(fileDir).pipe(res);
        }
        return;
    }

    if (url === "/api/getBooksDownloadNum") {
        getBooksDownloadNum(req, res);
    }
    else if (url === "/api/setBooksDownloadNum") {
        setBooksDownloadNum(req, res);
    }
    else {
        sendPage(res, path.join(dirRoot, url));
    }
});
server.listen(port);
console.log("[info] listen port:", port)

process.on("exit", () => {
    console.log("[info]: exit process");
});

process.on("uncaughtException", (err) => {
    if (err.code == "ENOENT") {
        console.log("[error] no files or directories: ", err.path);
    }
    else {
        console.log(err);
    }
});

process.on("SIGINT", () => {
    process.exit();
});
