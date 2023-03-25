const Writer = require("./docx/writer");
const Reader = require("./markdown/reader");

class Parser {
    constructor(filename) {
        this.writer = new Writer();
        this.reader = new Reader(filename);

        /**
         * 用于记录当前状态，以便于在处理内容时进行判断
         * normal: 正常状态
         * table: 表格状态
         * list: 列表状态
         * @type {string}
         */
        this.state = 'normal';
        /**
         * 计数器，与状态配合使用，用法随状态变化
         * @type {number}
         */
        this.count = 0;
        this.chapter = 0;
        this.section = 0;
        this.subsection = 0;

        this.parse()
    }

    write(filename) {
        this.writer.save(filename);
    }

    parse() {
        this.reader.handleParagraphs((type, content) => {
            switch (type) {
                case 'p':
                    this.writer.text(content);
                    this.state = 'normal';
                    break;
                case 'img':
                    this.writer.text(`img: ${content}图片功能尚未完成`);
                    this.state = 'normal';
                    break;
                case '#':
                    this.section = 0;
                    this.writer.h1(`第${++this.chapter}章 ${content}`);
                    this.state = 'normal';
                    break;
                case '##':
                    this.subsection = 0;
                    this.writer.h2(`${this.chapter}.${++this.section} ${content}`);
                    this.state = 'normal';
                    break;
                case '###':
                    this.writer.h3(`${this.chapter}.${this.section}.${++this.subsection} ${content}`);
                    this.state = 'normal';
                    break;
                case '-':
                case '*':
                case '+':
                    if (this.state !== 'list') {
                        this.count = 0;
                    }
                    this.writer.text(`（${++this.count}）${content}`);
                    this.state = 'list';
                    break;
                default:
                    this.writer.text(`${type} ${content}`);
                    break;
            }
        });
    }
}

module.exports = Parser;