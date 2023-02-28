class Pokemon {             // create Pokemon
    constructor(name, type, hp) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.attacks = [];
    }
    learnAttack(attack) {           
        this.attacks.push(attack);          // new attacks added to attacks array
        console.log(`${this.name} learned ${attack.name}!`);  // message about new attack
    }
    showStatus() {       
        console.log(`Name: ${this.name}\nHealth: ${this.hp}`);          
        for (const attack of this.attacks) {                    // iterate through attack array to display attacks and powerpoints
            console.log(`${attack.name}: ${attack.actualPowerPoints}/${attack.maxPowerPoints} PP`); 
        }
    }
    useAttack(attack, enemy) {          // attack a pokemon -> attack = index of attacks array, enemy = pokemon which is attacked 
        const usedAttack = this.attacks[attack];
        if (enemy.hp == 0) {            // check if enemy pokemon already fainted
            console.log(`${enemy.name} has already fainted!`);
            return;                     // dont execute attack because enemy fainted
        }
        if (usedAttack.actualPowerPoints === 0) {    // check for pp
            console.log(`${usedAttack.name} has no PP left!`);
            return;                     // dont execute attack when no pp available
        }
        if (usedAttack.type == "Electric" && enemy.type == "Water" || enemy.type == "Flying") {     // when very effective 
            enemy.hp = Math.max(0, enemy.hp - (usedAttack.damage * 2));                             // double damage
            console.log(`It's super effective!`);
        } else if (usedAttack.type == "Electric" && enemy.type == "Grass" || enemy.type == "Electric" || enemy.type == "Dragon") {  // when not very effective
            enemy.hp = Math.max(0, enemy.hp - (usedAttack.damage * 0.5));                                                           // half damage
            console.log(`It's not very effective!`);    
        } else if (usedAttack.type == "Electric" && enemy.type == "Ground") {
            console.log(`It has no effect...`);
        }
          else {
            enemy.hp = Math.max(0, enemy.hp - usedAttack.damage);               // normal damage calculation
        }
        usedAttack.actualPowerPoints--;                                         // decrease uses of an attack
        if (enemy.hp == 0) {
            console.log(`${enemy.name} fainted!`);                             // message when enemy is defeated
        }
    }
    useItem(item, attack) {                                     // choose item and attack to restore attacks PP 
        const attackToBeRestored = this.attacks[attack];
        if (attackToBeRestored.actualPowerPoints == attackToBeRestored.maxPowerPoints) {   // when at maximum no need to restore
            console.log(`PP already at maximum`);
        } else {
            attackToBeRestored.actualPowerPoints = Math.min(attackToBeRestored.maxPowerPoints, attackToBeRestored.actualPowerPoints + item.amount);
            console.log(`PP of ${attackToBeRestored.name} have been restored`);             
        }
    }
}

class Attack {                              // create attacks
    constructor(name, type, damage, actualPowerPoints, maxPowerPoints) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.actualPowerPoints = actualPowerPoints;
        this.maxPowerPoints = maxPowerPoints;
    }
}

class Item {                                // create items
    constructor(name, amount, status) {
        this.name = name;
        this.amount = amount;
        this.status = status;
    }
    showItemEffect() {
        console.log(`${this.name} restores ${this.amount} ${this.status}`);
    }
}    
// create instance for pokemon
const pikachu = new Pokemon("Pikachu", "Electric", 200);
const pidgey = new Pokemon("Pidgey", "Flying", 500);

// create instance for pokemon attack
const thunderbolt = new Attack("Thunderbolt", "Electric", 70, 10, 10);
pikachu.learnAttack(thunderbolt);

// create instance for item
const ether = new Item("Ether", 10, "PP");



pikachu.useItem(ether, 0);
pikachu.showStatus();




