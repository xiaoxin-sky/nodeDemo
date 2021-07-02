"use strict";
exports.__esModule = true;
var stream_1 = require("stream");
var commaSplitter = new stream_1.Transform({
    readableObjectMode: true,
    transform: function (chuck, encoding, callback) {
        // [].splice
        this.push(chuck.toString().split(","));
    }
});
var arrayToObject = new stream_1.Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform: function (chunck, encoding, callback) {
        var obj = {};
        chunck.forEach(function (v, index) {
            if (index % 2) {
                obj[chunck[index - 1]] = v;
            }
            else {
                obj[v] = null;
            }
        });
        this.push(obj);
    }
});
var objectToString = new stream_1.Transform({
    writableObjectMode: true,
    transform: function (chunk, encoding, callback) {
        this.push(JSON.stringify(chunk) + "\n");
    }
});
process.stdin
    .pipe(commaSplitter)
    .pipe(arrayToObject)
    .pipe(objectToString)
    .pipe(process.stdout);
