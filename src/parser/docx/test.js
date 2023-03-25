const Writer = require("./writer");

const writer = new Writer();

writer.h1("标题1");
writer.h2("标题2");
writer.h3("标题3");
writer.h4("标题4");
writer.text("正文");
writer.text("正文");
writer.text("正文");
writer.text("正文");
writer.text("正文");

writer.save("test2");
