const manifestGeneratorButton = document.querySelector(".container .buttons .manifest-generator")
const rawtextGeneratorButton = document.querySelector(".container .buttons .rawtext-generator")

manifestGeneratorButton.addEventListener("click", ev => {
  window.location = "./manifest-generator.html"
})

rawtextGeneratorButton.addEventListener("click", ev => {
  window.location = "./rawtext-generator.html"
})