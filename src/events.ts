import EventEmitter from "events";

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();
emitter.once("hello", (e, b, c) => {
  console.log("1");

  setImmediate(() => {
    console.log("收到hello了！", e, b, c);
  });
  console.log("2");
});
emitter.once("hello", () => {
  console.log("收到hello了111！");
});
emitter.on(EventEmitter.errorMonitor, (err) => {
  console.log("出错", err);
});
emitter.on("error", (err) => {
  console.log(err);
});
emitter.emit("error");

emitter.emit("hello", "a", "b");
emitter.emit("hello", "ac", "bc");
