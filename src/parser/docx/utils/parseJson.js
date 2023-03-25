const fs = require('fs');

// 读取json文件，并解析成json
function parseJson(filename) {

    // 判断文件后缀，若不是json就报错
    if (filename.split('.').pop() !== "json") {
        throw new Error("文件格式错误，必须为json格式。");
    }

    return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

module.exports = parseJson;