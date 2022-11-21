	
export interface Level{
    level: number
    roleConfig: Role[]
    speed: number
    speedUp: number
    accelerationZone: number[]
    speedUpTime: number
    passScore: number
}

export interface Role {
    name: string
    probability: number
}

export interface RoleType {
    type: number
    hp: number
    score: number
}

export interface RootObject {
    gopher: MyModule;
    workerGropher: MyModule;
    racerGopher: MyModule;
    armoredGopher: MyModule;
    ninjaGopher: MyModule;
    doctorGopher: MyModule;
    casualRabbitGopher: MyModule;
    wood: MyModule;
    Stone: MyModule;
    bomb: MyModule;
    coffeeRabbit: MyModule;
    pinkRabbit: MyModule;
}

export class MyModule {
    name: string = null;
    type: number = null;
    hp: number = null;
    score: number = null;
    constructor(type: number, hp: number, score: number, name: string) {
        this.type = type;
        this.hp = hp;
        this.score = score;
        this.name = name;
    }
}