var animals = [
    { name: "Fluffykins",   species:"rabbit" },
    { name: "Caro",         species:"dog" },
    { name: "Hamilton",     species:"dog" },
    { name: "Harold",       species:"fish" },
    { name: "Ursula",       species:"cat" },
    { name: "Jimmy",        species:"fish" }
]

//For loop ver.
var dogs = []
for (var i = 0; i < animals.length; i++) {
    if(animals.species === "dog") {
        dogs.push(animal)
    }
}

//Filter ver

var dogs = animals.filter((animal) => {
    return animal.species === "dog"
})