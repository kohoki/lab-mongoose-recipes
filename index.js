const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const cake = {
      title: "sweetCake",
      level: "Easy Peasy",
      ingredients: ["eggs", "sugar", "milk", "flour", "biscuits"],
      cuisine: "french",
      dishType: "dessert",
      duration: 20,
      creator: "The dude",
      created: '2020-01-21'
    }
    return Recipe.create(cake);
  })
  .then((db)=>{
    console.log(db.title);
  // Iter 3
   return Recipe.insertMany(data)
  })
  .then(()=>{
    return Recipe.find({});
  })
  .then((recipes)=>{
    recipes.forEach(element => {
           console.log(element.title);
         });
    // Iter 4
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(()=>{
    console.log("Update fine");
    // Iter 5
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then((message)=>{
    console.log(message);
  })
  .then(()=>
  {
    // It 6
    return mongoose.disconnect()
  })
  .then(()=>{
    console.log("database disconnected");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });  