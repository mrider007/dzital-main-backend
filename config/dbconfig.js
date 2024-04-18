const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error(error);
  }
}