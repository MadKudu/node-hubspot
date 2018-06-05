"use strict";
exports.__esModule = true;
var __1 = require("../..");
var apiKeyOptions = { apiKey: 'demo' };
var tokenOptions = { accessToken: 'token' };
var baseUrlOptions = { accessToken: 'token', baseUrl: 'http://some-url' };
var hubspot = new __1["default"](apiKeyOptions);
// Promise
// hubspot.contacts.get().then(results => {
//   console.log(results);
// }).catch((err) => {
//   console.error(err);
// });
// Callback
// hubspot.contacts.get({ count: 5 }, (err, results) => {
//   if (err) { console.error(err) }
//   console.log(results);
// });
hubspot.companies.get().then(function (results) {
    console.log(results);
})["catch"](function (err) {
    console.error(err);
});
