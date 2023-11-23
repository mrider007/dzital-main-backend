const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(error);
  }
}