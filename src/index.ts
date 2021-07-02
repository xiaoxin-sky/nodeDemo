import http, { IncomingMessage, RequestListener, ServerResponse } from "http";
import path from "path";
import { readFile } from "./static";
import querystring from "querystring";
import stream, { Readable, Transform, Writable } from "stream";
import fs from "fs";
const server = http.createServer(async (req, res) => {
  if (req.url === "/form") {
    res.setHeader("content-type", "text/html;charset=utf8");
    const data = await readFile(req.url + ".html");
    res.end(data);
    
    return;
  }

  if (req.url === "/json") {
    // res.setHeader("Content-Type", "application/json;charset=utf8");
    /* const fileStream = fs.createReadStream(
      path.join(process.cwd(), "/public/index.json")
    ); 
    fileStream.pipe(res);*/
    res.setHeader("Content-Type", "application/javascript;charset=utf8");
    const rstrem = new stream.Readable({
      objectMode: true,
    });
    rstrem.push("asdasdds");
    rstrem.push(null);
    // rstrem.pipe(res);
    rstrem.on("data", (chuck) => {
      console.log(typeof chuck);
    });
    rstrem.on("end", () => {
      rstrem.pipe(res);
    });
    /* const readStream = new stream.Writable();
    readStream.write({ a: "sasd" });
    readStream.end(); */
    return;
  }
  if (req.url === "/read") {
    const fileStream = fs.createReadStream(
      path.join(process.cwd(), "/public/index.json")
    );
    let currentCharCode = 65;
    const inStream = new Readable({
      read(size) {
        this.push(String.fromCharCode(currentCharCode++));
        if (currentCharCode > 90) {
          // console.log();
          // this.push(fileStream);
          this.push(null);
        }
      },
    });

    inStream.pipe(res);
    /*  const inStream = new stream.Readable({
      read() {
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
          this.push(null);
        }
      },
    });
    inStream.currentCharCode = 65;

inStream.pipe(process.stdout); */
    return;
  }

  if (req.url === "/name") {
    console.log(req.method);
    let data: any;
    req.on("data", (chuck: any) => {
      data = chuck;
      console.log("data1", data);
    });
    req.on("end", () => {
      const re = data.toString("utf-8");
      // console.log(querystring.parse(re));
      const params = querystring.parse(re);
      res.setHeader("content-type", "application/json;");
      res.end();
      return;
    });

    // res.setHeader('content-type','text/html;')
    // res.end('ok')
    return;
  }

  if (req.url === "/transform") {
    const commaSplitter = new Transform({
      readableObjectMode: true,
      transform(chuck: string) {
        // [].splice
        return chuck.toString().split(",");
      },
    });
    const arrayToObject = new Transform({
      writableObjectMode: true,
      readableObjectMode: true,
      transform(chunck: Array<string>) {
        const obj: { [k in string]: string } = {};
        chunck.forEach((v, index) => {
          if (index % 2) {
            obj[chunck[index - 1]] = v;
          } else {
            obj[v] = "";
          }
        });
        return obj;
      },
    });
    const objectToString = new Transform({
      writableObjectMode: true,
      transform(chunk: object) {
        return JSON.stringify(chunk);
      },
    });
    process.stdin
      .pipe(commaSplitter)
      .pipe(arrayToObject)
      .pipe(objectToString)
      .pipe(process.stdout);
    return;
  }

  if (req.url === "/upload") {
    
    const dataWriteable = new Writable({
      write(chuck:Buffer) {
        console.log('写入');
        console.log(chuck.toString());
      },
    });
    req.pipe(dataWriteable);
    console.log("传输结束");
    res.end("ok");
      console.log(req.complete);
    /* dataWriteable.end(() => {
      
    }); */
    return;
  }
});
server.listen(3003, () => {
  console.log("启动成功3003");
});
