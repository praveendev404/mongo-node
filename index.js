const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
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
    });
  }
);
