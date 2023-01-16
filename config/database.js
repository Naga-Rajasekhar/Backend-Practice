const mongoose = require("mongoose");
const { MONGO_URL } = process.env;
exports.connect = () => {
  mongoose.connect = (MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedToplology: true,
  })
    .then(console.log("DB connection succesful"))
    .catch((error) => {
      console.log("DB connection failed");
      console.log(error);
      process.exit(1);
    });
};
