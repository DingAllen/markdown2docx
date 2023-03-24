const Writer = require("./writer");

const writer = new Writer();

writer.addParagraphStyle({
    id: "Heading1",
    name: "Heading 1",
    basedOn: "Normal",
    next: "Normal",
    quickFormat: true,
    run: {
        size: 24,
    },
    paragraph: {
        spacing: {
            after: 120,
        },
    }
})
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
