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

    Dishes.create({
        name: "Uthapizza",
        description: "test",
    }).then((dish) => {
        console.log('saved the dish:\n');
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description: "Updatedt Test"}
        },{new: true}).exec();

    }).then((dish) => {
        console.log('updated dish:\n');
        console.log(dish);

        dish.comments.push({
               rating: 5,
               comment: "I \'m getting hungry!",
               author: "Adam Bezecny" 
        });

        return dish.save();   
    }).then((dish) => {

        console.log("Updated dish with comment:\n");
        console.log(dish);

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