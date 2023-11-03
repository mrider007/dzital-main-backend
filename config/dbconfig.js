const mongoose = require('mongoose');

module.exports = async () => {
  try {
    // let db = await mongoose.connect('mongodb://' + process.env.HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    await mongoose.connect(process.env.MONGO_ATLAS);

    console.log("Database connected successfully!");

    // global.dbUrl = db.connections[0].db;
    // console.log('Database connected successfully');
  } catch (error) {
    console.error(error);
  }
}