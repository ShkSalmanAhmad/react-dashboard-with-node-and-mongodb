var uuid = require('uuid');

function User() {
    this.userId = uuid.v1();
    this.email = "email";
    this.password = "password";
}
User.prototype.setEmail = function (email) {
    this.email = email;
};
User.prototype.setPassword = function (password) {
    this.password = password;
};
User.prototype.getEmail = function () {
    return this.email;
};
User.prototype.getPassword = function () {
    return this.password;
};
module.exports = User
// Person.prototype.sayHello = function () {
//     console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
// };