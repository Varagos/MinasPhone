"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimeStamp = function () {
    return new Date().toISOString();
};
var info = function (namespace, message, object) {
    if (object) {
        console.info("[" + getTimeStamp() + "] [INFO] [" + namespace + "] [" + message + "]", object);
    }
    else {
        console.info("[" + getTimeStamp() + "] [INFO] [" + namespace + "] [" + message + "]");
    }
};
var warn = function (namespace, message, object) {
    if (object) {
        console.info("[" + getTimeStamp() + "] [WARN] [" + namespace + "] [" + message + "]", object);
    }
    else {
        console.info("[" + getTimeStamp() + "] [WARN] [" + namespace + "] [" + message + "]");
    }
};
var error = function (namespace, message, object) {
    if (object) {
        console.info("[" + getTimeStamp() + "] [ERROR] [" + namespace + "] [" + message + "]", object);
    }
    else {
        console.info("[" + getTimeStamp() + "] [ERROR] [" + namespace + "] [" + message + "]");
    }
};
var debug = function (namespace, message, object) {
    if (object) {
        console.info("[" + getTimeStamp() + "] [DEBUG] [" + namespace + "] [" + message + "]", object);
    }
    else {
        console.info("[" + getTimeStamp() + "] [DEBUG] [" + namespace + "] [" + message + "]");
    }
};
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
};
