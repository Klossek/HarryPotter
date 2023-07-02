exports.create = function (spec) {
  let number = spec.number;
  let file = spec.file;
  let length = spec.length;

  let getRandomStart = function () {
    return Math.floor(Math.random() * Math.floor(length));
  };

  let getCommand = function () {
    return (
      "/Applications/VLC.app/Contents/MacOS/VLC  -I dummy  --start-time=" +
      getRandomStart() +
      " " +
      file
    );
  };

  let getLenght = function () {
    return length;
  };

  let getNumber = function () {
    return number;
  };

  let instance = {};
  instance.getRandomStart = getRandomStart;
  instance.getCommand = getCommand;
  instance.getLenght = getLenght;
  instance.getNumber = getNumber;

  return instance;
};
