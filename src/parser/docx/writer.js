const docx = require('docx');
const fs = require('fs');
const Stylist = require('./stylist');

const {
    Document,
    Packer,
    Paragraph,
} = docx;

class Writer {

    constructor() {
        this.content = [];
        this.stylist = new Stylist('style.json');
    }

    save(filename) {

        // 文件名可以是绝对路径，也可以是相对路径
        // 检查文件名是否有.docx后缀，如果没有后缀则自动添加。如果有后缀但不是docx，则直接报错
        if (!filename.endsWith(".docx")) {
            // 判断文件是否存在后缀
            if (filename.indexOf(".") === -1) {
                filename += ".docx";
            } else {
                console.log("文件名后缀错误，必须是.docx");
                return;
            }
        }

        const doc = new Document({
            sections: [{
                children: this.content,
            }],
            styles: {
                paragraphStyles: this.stylist.getParagraphStyles(),
            }
        });
        Packer.toBuffer(doc).then((buffer) => {
            fs.writeFileSync(filename, buffer);
        });
    }

    h1(text) {
        this.content.push(new Paragraph({
            text: text,
            heading: docx.HeadingLevel.HEADING_1,
        }));
    }

    h2(text) {
        this.content.push(new Paragraph({
            text: text,
            heading: docx.HeadingLevel.HEADING_2,
        }));
    }

    h3(text) {
        this.content.push(new Paragraph({
            text: text,
            heading: docx.HeadingLevel.HEADING_3,
        }));
    }

    h4(text) {
        this.content.push(new Paragraph({
            text: text,
            heading: docx.HeadingLevel.HEADING_4,
        }));
    }

    h5(text) {
        this.content.push(new Paragraph({
            text: text,
            heading: docx.HeadingLevel.HEADING_5,
        }));
    }

    h6(text) {
        this.content.push(new Paragraph({
            text: text,
            heading: docx.HeadingLevel.HEADING_6,
        }));
    }

    text(text) {
        this.content.push(new Paragraph(text));
    }
}

module.exports = Writer;