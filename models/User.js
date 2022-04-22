const mongoose = require('mongoose')

const { Schema, model } = mongoose;

//task: Create a person with this prototype:
const personSchema = new Schema({
    name: { type: String, required: [true,"name is required"] },
    dateOfBirth: { type: Date, default: Date.now },
    age: { type: Number},
    email: { type: String,unique:true},
    address: { type: String },
    favoriteFoods:{type: [String]}   
});

module.exports = Person = mongoose.model('Person', personSchema)

// task: Create and Save a Record of a Model:
module.exports.createAndSavePerson =() => {
    let person = new Person({
    name: "salma",
    dateOfBirth: 20/02/1999,
    age:23,
    email: "salma@gmail.com",
    address: "address 1",
    favoriteFoods:["pasta", "couscous"]
});

person.save((err, data) => {
    if (err) return console.error(err);
    console.log("user added", data)
  });
}

//task: Create Many Records with model.create()
const arrayOfPeople = [
    { name: "jinen",dateOfBirth:03/03/1960, age: 62, favoriteFoods: ["potato"] },
    { name: "sara", age: 46, favoriteFoods: ["roast chicken","chocolate"] },
    { name: "fares", age: 22,email:"fares@gmail.com",address:"address2", favoriteFoods: ["wine"] },
  ];
  
  module.exports.createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.log(err);
      console.log("people added", people);
    });
  };

  //task: Use model.find() to Search Your Database
  module.exports.findPeopleByName = (Name, done) => {
    Person.find({ name: Name }, (err, personFound) => {
      if (err) return console.log(err);
      console.log("user found", personFound);
    });
  };

  //task: Use model.findOne() to Return a Single Matching Document from Your Database
  module.exports.findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) return console.log(err);
      console.log("user found", data);
    });
  };

  //task: Use model.findById() to Search Your Database By _id
  module.exports.findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) =>
      err ? console.log(err) : console.log("user found", data)
    );
  };

//task: Perform Classic Updates by Running Find, Edit, then Save
module.exports.findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, data) => {
      if (err) return console.log(err);
      data.favoriteFoods.push(foodToAdd);
      data.save((err, dataNext) =>
        err
          ? console.log("error saving data: ", err.message)
          : console.log("user edited", dataNext)
      );
    });
  };

//task: Perform New Updates on a Document Using model.findOneAndUpdate()
module.exports.findAndUpdate = (personName, done) => {
    const ageToSet = 20;
  
    Person.findOneAndUpdate(
      { name: personName },
      { $set: { age: ageToSet } },
      { new: true },
      (err, data) => (err ? console.log("error", data) :
      console.log("user updated", data))
    );
  };

  //task: Delete One Document Using model.findByIdAndRemove
  module.exports.removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) =>
      err ? console.log("error",err) :
      console.log("user removed", data)
    );
  };

  //task: MongoDB and Mongoose - Delete Many Documents with model.remove()
  module.exports.removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({ name: nameToRemove }, (err, data) =>
      err ? console.log("error", data) :
      console.log("people removed", data)
    );
  };

  //task: Chain Search Query Helpers to Narrow Search Results
  module.exports.queryChain = (done) => {
    const foodToSearch = "burrito";
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, dataNext) =>
        err
          ? console.error("error getting data: ", err.message)
          : console.log("datanext", dataNext)
      );
  };


  // RESTAPI
//find all user <people>
module.exports.findAllUsers = ( done) => {
    Person.find((err, usersFound) => {
      if (err) return console.log(err);
      console.log("users found", usersFound)
    });
  };

//edit name of user by id
  module.exports.editById = (req, done) => {
    const newName = "adham";
  
    Person.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: newName } },
      (err, data) => (err ? console.log("error", data) :
      console.log("user updated", data))
    );
  };
  
  //remove user by id
  module.exports.removeUserById = (personId, done) => {
    Person.remove(personId, (err, data) =>
      err ? console.log("error",err) :
      console.log("user removed", data)
    );
  };
  