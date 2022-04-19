const mongoose = require("mongoose");

if (!process.env.MONGO_CONNECTION_STRING) {
  // eslint-disable-next-line no-throw-literal
  throw "Cannot read MONGO_CONNECTION_STRING, the uri seems to be undefined, have you set the environment variables ?";
}

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    // eslint-disable-next-line no-console
    console.log(
      "\x1b[1m\x1b[36m%s\x1b[0m",
      `Connection to ${x.connection.name} DB established.`
    );
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(`An error occured try to connect to the DB ${error}`);
  });