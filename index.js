const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
    //not needed anymore with mongoose 5.x    
    //useMongoClient: true
});

connect.then(() => {

    console.log('Connected correctlty to mongo server');

    var newDish = Dishes({
        name: "Uthapizza",
        description: "test"
    });

    newDish.save().then((dish) => {
        console.log('saved the dish:\n');
        console.log(dish);

        return Dishes.find({}).exec();
    }).then((dishes) => {
        console.log('retrieved dishes:\n');
        console.log(dishes);

        return mongoose.connection.db.dropCollection('dishes');
        //return Promise.resolve();
    }).then(() => {
        console.log('collection dropped');
        return mongoose.connection.close();
    }).then(() => {
        console.log('mongo connection closed');
    }).catch((err) => {
        console.log('error occured:\n');
        console.log(err);
    });

});