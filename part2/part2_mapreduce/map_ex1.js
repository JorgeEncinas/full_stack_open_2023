var animals = [
    { name: "Fluffykins",   species:"rabbit" },
    { name: "Caro",         species:"dog" },
    { name: "Hamilton",     species:"dog" },
    { name: "Harold",       species:"fish" },
    { name: "Ursula",       species:"cat" },
    { name: "Jimmy",        species:"fish" }
]

//For loop ver.
var names = []
for (var i = 0; i < animals.length; i++) {
    names.push(animals[i].name)
}

//Map ver.
var names = animals.reduce((animal) => {
    return animal.name
})
