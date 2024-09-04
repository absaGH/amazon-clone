class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
        this.speed = 0;
    }

    displayinfo(){
        const trunkStatus = this.isTrunkOpen ? 'open': 'closed';
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h Trunk: ${trunkStatus}`);
    }

    go(){
        if (!this.isTrunkOpen){
            (this.speed < 200)? (this.speed += 5) : (this.speed = 200);
        }
    }

    brake(){
        (this.speed > 0)? this.speed -= 5 : (this.speed = 0);
    }

    openTrunk(){
        if(this.speed === 0){
            this.isTrunkOpen = true;
        }

    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(brand, model, acceleration){
        super(brand, model);
        this.acceleration = acceleration;
    }

    go(){
        if (!this.isTrunkOpen){
            (this.speed < 300)? (this.speed += this.acceleration) : (this.speed = 300);
        }
    }

    openTrunk(){
        console.log('Race cars do not have a trunk.');
    }
    closeTrunk(){
        console.log('Race cars do not have a trunk.');
    }
}

const obj1 = new Car('Toyota', 'Corolla');
const obj2 = new Car('tesla', 'Model 3');

console.log(obj1);
console.log(obj2);

obj1.displayinfo();
obj2.displayinfo();
obj1.closeTrunk();
obj1.openTrunk();

obj1.go();
obj1.go();
obj1.go();
obj1.brake();

obj1.displayinfo();

const obj3 = new RaceCar('McLaren', 'F1', 20);
obj3.go();
obj3.displayinfo();