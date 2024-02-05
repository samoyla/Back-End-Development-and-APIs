require('dotenv').config();

const mongoose = require('mongoose');

let Person;

let personSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  age: {
    type: Number
  },
  favoriteFoods:{
    type: [String]
  }
});

Person = mongoose.model('Person', personSchema);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAndSavePerson = (done) => {
  let Bobby = new Person({name: "Bobby", age: 43, favoriteFoods: ["oysters", "pizza", "bortsch"]});
  Bobby.save((err, data) => {
    if(err) return done(err);
    done(null, data)
  });
};

let arrayOfPeople = [
  {name: "Dilly", age: 55, favoriteFoods: ["tacos"]},
  {name: "Billy", age: 54, favoriteFoods: ["pizza"]},
  {name: "Willy", age: 53, favoriteFoods: ["pasta"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if(err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err,data) {
    if(err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, data) => {
      if(err) return done(err);
      done(null, person);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    (err, data) => {
    if(err) return done(err);
      done(null, data);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Person.find({favoriteFoods: foodToSearch})
  // .sort({name : 1})
  // .limit(2)
  // .select({age : false})
  // .exec((err, data) => {
  //   if(err) return done(err);
  //   done(null, [data]);
  // });

  const query = Person.find({ favoriteFoods: foodToSearch });

  // Utilisez les helpers de requête pour affiner la recherche
  query
    .sort({ name: 1 }) // Triez par nom dans l'ordre croissant
    .limit(2) // Limitez les résultats à 2 documents
    .select({ age: 0 }) // Masquez la propriété age

  // Exécutez la requête avec le callback
  query.exec((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
