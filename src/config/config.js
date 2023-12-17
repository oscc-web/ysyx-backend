const path = require("path");

const dirRoot = path.join(process.cwd());

module.exports = {
    port: 9090,
    dirRoot: dirRoot,
    dirDB: path.join(dirRoot, "db/"),
    dirLog: path.join(dirRoot, "log/"),
    dirUpload: path.join(dirRoot, "upload/")
}
