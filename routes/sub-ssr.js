var express = require("express");
var router = express.Router();
const loadData = require("./http-load");
const conf = require("../conf");

/* GET ssr */
router.get("/", function (req, res, next) {
  loadData(conf.ssr, "ssr")
    .then((list) => {
      const data = list.map((item) => item.value).join("\n");
      res.send(data);
    })
    .catch((e) => {
      res.send("loadData Error ...");
    });
});

module.exports = router;
