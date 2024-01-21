const manifestGeneratorButton = document.querySelector(".container .buttons .manifest-generator")
const rawtextGeneratorButton = document.querySelector(".container .buttons .rawtext-generator")
const giveGeneratorButton = document.querySelector(".container .buttons .give-generator")

manifestGeneratorButton.addEventListener("click", ev => {
  window.location = "./manifest-generator.html"
})

rawtextGeneratorButton.addEventListener("click", ev => {
  window.location = "./rawtext-generator.html"
})

giveGeneratorButton.addEventListener("click", ev => {
  window.location = "./give-generator.html"
})