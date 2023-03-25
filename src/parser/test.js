const Parser = require('./parser');

const parser = new Parser('./markdown/test.md');
parser.write('./docx/test.docx');