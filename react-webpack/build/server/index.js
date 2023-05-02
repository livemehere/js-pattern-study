"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router_1 = require("../src/router");
var path_1 = require("path");
var fs_1 = require("fs");
var build_client_1 = require("./build-client");
var restart_1 = require("./restart");
/* 1. 클라이언트 번들 파일을 빌드합니다. */
(0, build_client_1.build)(restart_1.restart);
var app = (0, express_1.default)();
var port = 3000;
var renderToString = require('react-dom/server').renderToString;
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.get('*', function (req, res) {
    var _a;
    var component = (_a = router_1.router.find(function (r) { return r.path === req.path; })) === null || _a === void 0 ? void 0 : _a.component;
    var html = renderToString(component());
    var template = fs_1.default.readFileSync(path_1.default.join(__dirname, '../index.html'), 'utf-8');
    template = template.replace('<!--RENDER_FROM_SERVER-->', html);
    res.send(template);
});
app.listen(port, function () {
    console.log("server is running at http://localhost:".concat(port));
});
