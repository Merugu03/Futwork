const csv = require("csv-parser");
const { json } = require("express/lib/response");
const fs = require("fs");

const sample = [];
const results = {
  processed: [],
  unprocessed: [],
};
const processed = [];
const unprocessed = [];

const process = () => {
  for (let i = 0; i < sample.length; i++) {
    if (!processed[sample[i].mobile]) {
      results.processed.push(sample[i]);
      processed[sample[i].mobile] = 1;
    } else {
      if (!unprocessed[sample[i].mobile]) {
        results.unprocessed.push(sample[i]);
        unprocessed[sample[i].mobile] = 1;
      }
    }
  }
  return results;
};

const postData = (req, res, next) => {
  try {
    if (!req.files) {
      // Empty File
      res
        .status(500)
        .send('<h1>Please upload the file</h1>  <a href="/">click here</a>');
    } else if (req.files.file.mimetype != "text/csv") {
      // upload wrong file
      res
        .status(415)
        .send(
          '<h1>Please upload only CSV file</h1>  <a href=" / ">click here</a>'
        );
    } else {
      // console.log(req.files.file.mimetype);
      // res.send(req.files.file.mimetype);

      // moving the file to loacl storage
      const file = req.files.file;
      file.mv(__dirname + "/sample.csv", function (err, result) {
        if (err) {
          res.status(500).send(err.message);
        } else {
          fs.createReadStream(__dirname + "/sample.csv")
            .pipe(csv())
            .on("data", (data) => sample.push(data))
            .on("end", () => {
              const json = process();
              res.status(200).end(JSON.stringify(json));
            });
        }
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getData = (req, res) => {
  console.log("Get data");
  res.sendFile("../public/index.html");
};

module.exports = { postData, getData };
