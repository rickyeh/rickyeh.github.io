// Person and Food classes
// Food one property, energy, number
// Person has a method, isFull, boolean returned.  Eat(food), will use that energy.  Property energy (0-100)

function Food(energy) {
    this.energy = energy;
}

function Person() {
    this.energy = 0;
}

Person.prototype.isFull = function() {
    if (this.energy >= 100) {
        return true;
    } else {
        return false;
    }  
};

Person.prototype.eat = function(food) {
    this.energy += food.energy;
    
    if (this.energy > 100) {
        this.energy = 100;
    }
};

var apple = new Food(10);
var beef = new Food(20);
var chicken = new Food(85);

var rick = new Person();

console.log(rick.isFull());
rick.eat(beef);
rick.eat(chicken);
console.log(rick.isFull());

console.log(rick);