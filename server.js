var cors = require("cors");
var common = require("./common.js");
var app = common.express();
app.use(cors());
app.use(require("express-domain-middleware"));

const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

app.use(
  common.bodyParser.json({
    limit: "10mb"
  })
);

app.use(
  common.bodyParser.urlencoded({
    limit: "10mb",
    extended: true
  })
);
process.on("uncaughtException", function(err) {
  console.log(err);
});

app.all("/api/*", function(req, res, next) {
  next();
});

app.get("/api/get", function(req, res) {
  try {
    mongo.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err, client) => {
        if (err) {
          console.error(err);
          return;
        }
        const db = client.db("local");

        const collection = db.collection("Employee");
        collection.find().toArray((err, items) => {
          console.log(items);
          res.status(200).send({
            items: items
          });
        });
      }
    );
  } catch (err) {
    logger.error.write(err);
    return errorHandler(err, req, res, null);
  }
});

function errorHandler(err, req, res, next) {
  res.status(500);
  if (err.hasOwnProperty("message")) {
    res.status(500).send({
      StatusCode: 200,
      Status: "Error",
      Result: {
        Message: err.message
      }
    });
  } else {
    res.status(500).send({
      StatusCode: 500,
      Status: "Error",
      Result: {
        Message: err
      }
    });
  }
}

module.exports = app;
