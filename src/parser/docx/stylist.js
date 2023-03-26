const parseJson = require("./utils/parseJson");
const docx = require("docx");
const getRealPound = require("./utils/pound");

const key2id = {
    "h1": {
        id: "Heading1",
        name: "Heading 1",
    },
    "h2": {
        id: "Heading2",
        name: "Heading 2",
    },
    "h3": {
        id: "Heading3",
        name: "Heading 3",
    },
    "h4": {
        id: "Heading4",
        name: "Heading 4",
    },
    "h5": {
        id: "Heading5",
        name: "Heading 5",
    },
    "h6": {
        id: "Heading6",
        name: "Heading 6",
    },
    "p": {
        id: "Normal",
        name: "Normal",
    },
}

class Stylist {

    constructor(filename) {
        this.paragraphStyles = [];
        this.readStyle(filename);
    }

    getParagraphStyles() {
        return this.paragraphStyles;
    }

    readStyle(filename) {
        // 通过配置json文件，可以对文字格式进行调整。在json中填入的键值对为：{关键字：样式json}。对于标题格式，需要输入特定关键字进行配置。如果不在关键字中，依然可以用于创建一个新的样式。
        // 这个函数用于解析样式json文件，返回一个json，其中包含了符合docx库的样式。

        const configs = parseJson(filename);

        // 对style中的键值对依次进行处理
        for (let key in configs) {
            let id = key;
            let name = key;
            // 如果key是关键字，就将其转换为对应的id
            if (key in key2id) {
                id = key2id[key].id;
                name = key2id[key].name;
            }
            let style = {
                id: id,
                name: name,
                run: {},
                paragraph: {spacing: {}},
            };
            let config = configs[key];
            for (let name in config) {
                var property = config[name];
                switch (name) {
                    case "字体":
                        style.run.font = {eastAsia: property};
                        break;
                    case "英文及数字字体":
                        style.run.font = {ascii: property};
                        break;
                    case "字号":
                        style.run.size = getRealPound(property) * 2;
                        // 如果此时存在首行缩进格式，就需要重新计算首行缩进的值
                        if (style.paragraph.indent && style.paragraph.indent.firstLine) {
                            style.paragraph.indent = {
                                firstLine: style.run.size * property * 10,
                            };
                        }
                        break;
                    case "加粗":
                        style.run.bold = property;
                        break;
                    case "居中":
                        if (property === true) {
                            style.paragraph.alignment = docx.AlignmentType.CENTER;
                        }
                        break;
                    case "行间距":
                        style.paragraph.spacing.line = getRealPound(property) * 20;
                        style.paragraph.spacing.lineRule = docx.HeightRule.EXACT;
                        break;
                    case "字间距加宽": // 以磅为单位
                        style.run.spacing = getRealPound(property) * 20;
                        break;
                    case "段前":
                        style.paragraph.spacing.before = getRealPound(property) * 20;
                        break;
                    case "段后":
                        style.paragraph.spacing.after = getRealPound(property) * 20;
                        break;
                    case "首行缩进": // 特殊格式，首行缩进，以字符为单位
                        style.paragraph.indent = {
                            firstLineChars: property * 100,
                        };
                        break;
                    default:
                        console.log(`未知的样式属性：${name}`);
                }
            }
            this.addParagraphStyle(style);
        }
    }

    addParagraphStyle(style) {
        this.paragraphStyles.push(style);
    }
}

module.exports = Stylist;