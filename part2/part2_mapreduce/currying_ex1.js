let dragon = (name, size, element) => 
    name + ' is a ' +
    size + ' dragon that breathes ' +
    element + '!'

console.log(dragon("peanut", "peanut-sized", "peanuts"))

let dragon2 =
    name =>
        size =>
            element =>
                name + ' is a ' +
                size + ' dragon that breathes ' +
                element + '!'

console.log(dragon2("building")("building-sized")("buildings"))
let banjoDragon = dragon2("banjo")
let tinyDragon = banjoDragon("tiny")

console.log(tinyDragon("music"));

//Every functional library has a way of making "non-curry-able" functions, "curry-able"

//"npm install lodash"

import _ from "lodash"

dragon = _.curry(dragon)

let josephDragon = dragon("Joseph")
let giantDragon = josephDragon("giant")

console.log(giantDragon("fire"));

//So why is it used? My first thought is for "precomputing" things then slowly adding things depending on other params.

let dragons = [
    { name: "fluffykins", element:"lightning" },
    { name: "noomi", element:"lightning" },
    { name: "karo", element:"fire" },
    { name: "doomer", element:"timewarp" },
]

let hasElement =
    (element, obj) => obj.element === element

let lightningDragons =
    dragons.filter(x => hasElement("lightning", x))

console.log(lightningDragons)

//Let's curry this code.

import _ from "lodash"

let dragons2 = [
    { name: "fluffykins", element:"lightning" },
    { name: "noomi", element:"lightning" },
    { name: "karo", element:"fire" },
    { name: "doomer", element:"timewarp" },
]

let hasElement2 =
    _.curry((element, obj) => obj.element === element)

let lightningDragons2 =
    dragons.filter(x => hasElement2("lightning"))

//Calling "hasElement2('lightning')" returns a NEW FUNCTION
//Which is only expecting an "obj" parameter.
//Since filter passes 'x' into it, which is a "dragon" object,
//It works...

console.log(lightningDragons2)

//From @DanylCh, in the comment section of the video...

const hasElementES6 = (element) => (object) => {
    return object.element === element;
}

const lightningDragonsES6 = dragons.filter(hasElementES6("lightning"))
console.log(lightningDragonsES6);