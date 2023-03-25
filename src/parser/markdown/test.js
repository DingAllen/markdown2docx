const Reader = require("./reader");

const reader = new Reader("test.md");

reader.handleParagraphs((type, content) => {
    // 这里输出的必然是胡乱的，后续还需要将无法识别的type转换为正文来处理，并在正文部分对表格和公式进行处理
    console.log(type, content);
});