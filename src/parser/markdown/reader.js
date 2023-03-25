const fs = require('fs');

class Reader {

    constructor(filename) {
        this.paragraphs = [];
        this.parseData(filename);

        this.index = 0;
        this.length = this.paragraphs.length;
    }

    read() {
        if (this.index >= this.length) {
            return null;
        }
        return this.paragraphs[this.index++];
    }

    handleParagraphs(func) {
        let paragraph = this.read();
        while (paragraph) {
            func(paragraph[0], paragraph[1]);
            paragraph = this.read();
        }
    }

    /**
     * 实现对markdown文件内容的解析，把每一条内容解析成：[类型,内容]，并存入paragraphs数组中
     * 其实这里的类型不是真正的类型，是我图省事的做法，用于更高效地处理这样的数据
     * 真正进行类型的判断和内容处理的地方在后续使用paragraphs内数据时进行
     * @param filename Markdown文件名
     */
    parseData(filename) {

        // 判断文件后缀，若不是json就报错
        if (filename.split('.').pop() !== "md") {
            throw new Error("文件格式错误，必须为md格式。");
        }

        const data = fs.readFileSync(filename, 'utf8');

        const lines = data.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line === '') {
                continue;
            }

            // 用正则表达式判断是否有图片，如果有，直接保存括号内内容
            const reg = /!\[.*]\((.*)\)/;
            const result = reg.exec(line);
            if (result) {
                this.paragraphs.push(['img', result[1]]);
                continue;
            }

            const index = line.indexOf(' ');

            if (index === -1) {
                // 正文
                this.paragraphs.push(['p', line]);
                continue;
            }

            const type = line.substring(0, index);
            if (type === 'img' || type === 'p') {
                this.paragraphs.push(['p', line]);
            }
            const content = line.substring(index + 1);
            this.paragraphs.push([type, content]);
        }
    }
}

module.exports = Reader;