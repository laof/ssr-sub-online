var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var ssrHTMLRouter = require("./routes/ssr");
var subSSR = require("./routes/sub-ssr");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ssr", ssrHTMLRouter);
app.use("/sub-ssr", subSSR);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
