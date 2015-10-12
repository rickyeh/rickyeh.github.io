function Animal() {}  // Define an animal class

Animal.prototype.eat = function() {
    console.log('Eating...');
}

Animal.prototype.sleep = function() {
    console.log('Sleeping...');
}

function Dog() {
    Animal.call(this);
}

function Cat() {
    Animal.call(this);
}

Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;

Dog.prototype.bark = function() {
    console.log('Woof woof!');
}

Cat.prototype.meow = function() {
    console.log('Meow');
}

var garfield = new Cat();
var lucky = new Dog();
lucky.bark();
lucky.eat();
lucky.sleep();

garfield.eat();
garfield.meow();
