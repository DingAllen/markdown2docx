// 设定一个json，实现字的大小到磅数的转换
sizeText2pound = {
    "初号": 42,
    "小初": 36,
    "一号": 26,
    "小一": 24,
    "二号": 22,
    "小二": 18,
    "三号": 16,
    "小三": 15,
    "四号": 14,
    "小四": 12,
    "五号": 10.5,
    "小五": 9,
    "六号": 7.5,
    "小六": 6.5,
    "七号": 5.5,
    "八号": 5,
}

function getRealPound(pound) {

    // 如果是数字，直接返回，否则转换，如果转换失败，返回默认值
    if (typeof pound == "number") {
        return pound;
    } else {
        if (pound in sizeText2pound) {
            return sizeText2pound[pound];
        } else {
            console.log(`字号[${pound}]不存在，返回默认值12磅。`);
            return 12;
        }
    }
}

module.exports = getRealPound;