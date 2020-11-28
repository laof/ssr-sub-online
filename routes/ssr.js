var express = require("express");
var router = express.Router();
const path = require("path");
const fs = require("fs");
const loadData = require("./http-load");
const conf = require("../conf");

let jsArr = [
  '<script src="https://cdn.bootcdn.net/ajax/libs/jquery/2.0.1/jquery.min.js"></script>'
];

const SSRTemp = fs
  .readFileSync(path.join(__dirname, "..", "public", "ssr.html"))
  .toString();

function readScript(fileName) {
  const url = path.join(__dirname, "..", "public", "js", fileName);
  const data = fs.readFileSync(url);
  return `<script>${data.toString()}</script>`;
}

jsArr.push(readScript("qrcode.min.js"));
jsArr.push(readScript("popup.js"));

jsArr = jsArr.join("\n");

/* GET ssr */
router.get("/", function (req, res, next) {
  loadData(conf.ssr, "ssr")
    .then((list) => {
      const text = SSRTemp.replace(
        "THML_TEMPLATES_3712237621",
        JSON.stringify(list)
      );
      const html = text.replace("INJECTION_JAVASCRIPT_826383526286", jsArr);
      res.send(html);
    })
    .catch((e) => {
      res.send("loadData Error ...");
    });
});

module.exports = router;
