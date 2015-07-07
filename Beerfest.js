Beers = new Mongo.Collection("beers");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    beers: function () {
      return Beers.find({});
    }
  });

  Template.body.events({
  "submit .new-beer": function (event) {
    // This function is called when the new task form is submitted

    var text = event.target.text.value;

    Beers.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  }
});

Template.beer.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Beers.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    Beers.remove(this._id);
  }
});

}
