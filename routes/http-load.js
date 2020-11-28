const cheerio = require("cheerio");
const got = require("got");
const atob = require("atob");

function getList(text, key) {
  const values = [];
  const reg = {
    ss: /ss:\/\/(.*?)(?=[\r\n,])/g,
    ssr: /ssr:\/\/(.*?)(?=[\r\n,])/g,
    vmess: /vmess:\/\/(.*?)(?=[\r\n,])/g
  };

  if (!reg[key]) {
    return values;
  }

  const vs = text.match(reg[key]) || [];

  if (vs.length) {
    vs.forEach((item, index) => {
      values.push({
        name: key + index,
        value: item
      });
    });
  }

  return values;
}

function stringHTML(htmlString) {
  const text = [];
  const $ = cheerio.load(htmlString);
  const els = $("body *").contents();
  els.each(function () {
    const that = this;
    if (that.nodeType === 3) {
      text.push(that.data);
    }
  });
  return text.join("\n");
}

function loadData(url, format) {
  return new Promise(async (resolve) => {
    try {
      const response = await got(atob(url));
      const list = getList(stringHTML(response.body), format);
      resolve(list);
    } catch (error) {
      resolve("error.response.body");
    }
  });
}

module.exports = loadData;
