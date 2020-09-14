class Dog {
    constructor(name) {
        this.name = name;
        this.goAttack = false;
    }

    attack() {
        this.goAttack = true;
    }
}

class Person {
    constructor(name) {
        this.name = name;
        this.isHurt = false;
    }

    hurt(damage) {
        if (damage) {
            this.isHurt = true;
            return `${this.name} is hurt by attack`;
        } else {
            return `${this.name} is not hurt by attack`;
        }
    }
}

let dog = new Dog("LOL");
let person = new Person("Bad Luck Man");

dog.attack();
console.log(person.hurt(dog.goAttack));