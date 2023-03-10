const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const router = require("./routes/index");

const { engine } = require("express-handlebars");

const app = express();

// view engine setup

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");
app.disable("x-powered-by");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/libs", express.static("public"));
app.use("/libraries", express.static("node_modules"));

app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
