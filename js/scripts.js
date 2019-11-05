function AddressBook(){
  this.contacts = [];
  this.currentId = 0;
}

var newAddressBook = new AddressBook();

AddressBook.prototype.addContact = function(contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id){
  for (var i=0; i<this.contacts.length; i++){
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id){
  for (var i=0; i<this.contacts.length; i++){
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  }
  return false;
}


// Contact logic ------------------
function Contact(firstName, lastName, address, number){
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.number = number;
}

// Contact.prototype.fullName = function() {
//   return this.firstName + " " + this.lastName;
// }


// Functions ------------------------
function displayContacts(currentBook) {
  var displayedList = $("#landingZone");
  var htmlForListDisplay = "";

  currentBook.contacts.forEach(function(contact) {
    htmlForListDisplay += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "<br>" + "</li>";
  });
  displayedList.html(htmlForListDisplay);
};

// Adds interactive functionality to show and delete peeps
function attachContactListeners() {
  $("ul#landingZone").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    newAddressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContacts(newAddressBook);
  });
};

function showContact(id) {
  var contact = newAddressBook.findContact(id);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".address").html(contact.address);
  $(".phone-number").html(contact.number);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}




// User Input logic ---------------------
$(document).ready(function(){
  attachContactListeners();
  $("#contactForm").submit(function(event){
    event.preventDefault();


    var newContact = new Contact(
      $("#contactFirstName").val(),
      $("#contactLastName").val(),
      $("#contactAddress").val(),
      $("#contactNumber").val(),
    );
    newAddressBook.addContact(newContact);
    displayContacts(newAddressBook);
  });
  $('#contactForm')[0].reset();
});
