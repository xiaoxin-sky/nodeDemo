import { Readable, Transform, Writable } from "stream";
const commaSplitter = new Transform({
  readableObjectMode: true,
  transform(chuck: string, encoding, callback) {
    // [].splice
    this.push(chuck.toString().split(","));
    callback();
  },
});
const arrayToObject = new Transform({
  writableObjectMode: true,
  readableObjectMode: true,
  transform(chuck: Array<string>, _encoding, callback) {
    const obj: { [k in string]: string } = {};
    chuck.forEach((v, index) => {
      if (index % 2) {
        obj[chuck[index - 1]] = v;
      } else {
        obj[v] = null;
      }
    });
    this.push(obj);
    callback();
  },
});
const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk: object, encoding, callback) {
    this.push(JSON.stringify(chunk) + "\n");
    callback();
  },
});
process.stdin
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout);

const readStream = new Readable({
  read() {
    this.push("我是一个可读流呀");
    this.push(null);
  },
});
console.log(asjad);

// 实现可写流
const writeStream = new Writable({
  write(chuck: Buffer, _encoding, callback) {
    console.log("拿到了可写流的数据：", chuck.toString());
    this.write(chuck);
    // this.end();
    // process.exit();
  },
});
writeStream.on("", () => {
  console.log("读取结束");
  process.exit();
});

readStream.pipe(writeStream);
