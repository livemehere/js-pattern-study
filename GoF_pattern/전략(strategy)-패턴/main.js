const objectPath = require("object-path");
const fs = require("fs");
const ini = require("ini");

class Config {
  constructor(strategy) {
    this.data = {};
    this.strategy = strategy;
  }

  get(path) {
    return objectPath.get(this.data, path);
  }

  set(path, value) {
    objectPath.set(this.data, path, value);
  }

  read(file) {
    this.data = this.strategy.deserialize(fs.readFileSync(path, "utf-8"));
  }

  save(file) {
    fs.writeFileSync(file, this.strategy.serialize(this.data));
  }
}

const jsonStrategy = {
  deserialize: (data) => JSON.parse(data),
  serialize: (data) => JSON.stringify(data, null, 2),
};

const iniStrategy = {
  deserialize: (data) => ini.parse(data),
  serialize: (data) => ini.stringify(data),
};

const config = new Config(iniStrategy);
config.set("name", "kong");
config.set("대학교.학년", 4);
config.set("대학교.반", "A");
config.save("info.ini");

const config2 = new Config(jsonStrategy);
config2.set("name", "kong");
config2.set("대학교.학년", 4);
config2.set("대학교.반", "A");
config2.save("info.json");
