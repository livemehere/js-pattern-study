"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var Home_1 = require("../pages/Home");
var About_1 = require("../pages/About");
exports.router = [
    {
        path: '/',
        component: Home_1.default
    },
    {
        path: '/about',
        component: About_1.default
    }
];
