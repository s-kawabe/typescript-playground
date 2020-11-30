"use strict";
var _a;
var downloadedData = {
    id: 1
    // user: {
    //   name: {
    //     first: 'taro',
    //     last: 'tanaka'
    //   }
    // }
};
// Optional chaining★
console.log((_a = downloadedData.user) === null || _a === void 0 ? void 0 : _a.name);
// Non-null assertion operator (!)
// console.log(downloadedData.user!.name);
