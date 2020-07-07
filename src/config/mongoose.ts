// AGREGAR USER Y PASS OPCIONALES
// RESPETAR LA SEPARACION DE LAS VARIABLES EN EL .env

const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, // true in Dev and false in Prod due to performace impact
}).then(
    () => {
      console.log('Mongoose is connected to ' + process.env.DB_URL);
    },
    (error) => {
      console.table(error);
    },
);

mongoose.connection.on('error', (error) => {
  console.table(error);
});


module.exports = mongoose;
