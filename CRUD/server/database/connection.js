
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect('mongodb+srv://admin:admin123@cluster0.mfbvo8v.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        // useFindAndModify: false,
          //  useCreateIndex: true
        });
        mongoose.connection.once('open', function(){
          console.log('Conection has been made!');
        })

    console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB