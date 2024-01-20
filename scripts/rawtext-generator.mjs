const showcase = document.querySelector(".container .tools .showcase #showcase")
const command = document.querySelector(".container .tools .command #command")
const textField = document.querySelector(".container .tools .edit .text #text")
const textAdd = document.querySelector(".container .tools .edit .text #add")
const selectorField = document.querySelector(".container .tools .edit .selector #selector")
const selectorAdd = document.querySelector(".container .tools .edit .selector #add")
const scoreboardNameField = document.querySelector(".container .tools .edit .score #name")
const scoreboardScoreboardField = document.querySelector(".container .tools .edit .score #scoreboard")
const scoreboardAdd = document.querySelector(".container .tools .edit .score #add")
const clearAll = document.querySelector(".container .tools .run .clear-all")
const undo = document.querySelector(".container .tools .run .undo")
const copy = document.querySelector(".container .tools .run .copy")

const result = {
  rawtext: []
}

const colors = {
  "§0": "#000000",
  "§1": "#0000AA",
  "§2": "#00AA00",
  "§3": "#00AAAA",
  "§4": "#AA0000",
  "§5": "#AA00AA",
  "§6": "#FFAA00",
  "§7": "#AAAAAA",
  "§8": "#555555",
  "§9": "#55FF55",
  "§a": "#55FF55",
  "§b": "#55FFFF",
  "§c": "#FF5555",
  "§d": "#FF55FF",
  "§e": "#FFFF55",
  "§f": "#FFFFFF",
  "§g": "#DDD605",
  "§h": "#E3D4D1",
  "§i": "#CECACA",
  "§j": "#443A3B",
  "§m": "#971607",
  "§n": "#B4684D",
  "§p": "#DEB12D",
  "§q": "#47A036",
  "§s": "#2CBAAB",
  "§t": "#21497B",
  "§u": "#9A5CC6",
}

clearAll.addEventListener("click", ev => {
  result.rawtext = []
  refresh()
})

undo.addEventListener("click", ev => {
  result.rawtext.splice(result.rawtext.length - 1, 1)
  refresh()
})

copy.addEventListener("click", ev => {
  command.select()
  document.execCommand("copy")
  copy.innerHTML = "Copied successfully!"

  setTimeout(() => {
    copy.innerHTML = "Copy"
  }, 1000)
})

textAdd.addEventListener("click", ev => {
  if (textField.value != "") {
    result.rawtext.push({
      text: textField.value
    })

    textField.value = ""
  }

  refresh()
})

selectorAdd.addEventListener("click", ev => {
  if (selectorField.value != "") {
    result.rawtext.push({
      selector: selectorField.value.trim()
    })

    selectorField.value = ""
  }

  refresh()
})

scoreboardAdd.addEventListener("click", ev => {
  if (
    scoreboardNameField.value != "" &&
    scoreboardScoreboardField.value != ""
  ) {
    result.rawtext.push({
      score: {
        name: scoreboardNameField.value,
        objective: scoreboardScoreboardField.value
      }
    })

    scoreboardNameField.value = ""
    scoreboardScoreboardField.value = ""
  }

  refresh()
})

setInterval(() => {
  let output = ""

  for (let i = 0; i < result.rawtext.length; i++) {
    if (result.rawtext[i].text) {
      output += result.rawtext[i].text
    } else if (result.rawtext[i].selector) {
      const target = result.rawtext[i].selector

      if (target[0] == "@") {
        output += "Notch"
      } else {
        output += target
      }
    } else {
      output += "2147483647"
    }
  }

  showcase.innerHTML = ""

  let color = ""
  let italics = false
  let bold = false
  let messy = false

  for (let i = 0; i < output.length; i++) {
    if (output[i] == "§") {
      const colorString = "0123456789abcdefghijmnpqst"

      if (colorString.includes(output[i + 1])) {
        color = `§${output[i + 1]}`
      } else {
        if (output[i + 1] == "o") {
          italics = true
        } else if (output[i + 1] == "k") {
          messy = true
        } else if (output[i + 1] == "l") {
          bold = true
        } else if (output[i + 1] == "r") {
          italics = false
          bold = false
          messy = false
          color = ""
        }
      }
    } else {
      if (output[i - 1] != "§") {
        if (output[i] != "\\") {
          if (!(output[i - 1] == "\\" && output[i] == "n")) {
            const stringElement = document.createElement("span")

            stringElement.innerHTML = output[i]

            if (bold) {
              stringElement.classList.add("bold")
            }

            if (italics) {
              stringElement.classList.add("italics")
            }

            if (messy) {
              const strings = "abcdefghijklmnopqrstuvwxyz"

              stringElement.innerHTML = strings[Math.floor(Math.random() * strings.length)]
            }

            if (colors[color]) {
              stringElement.style.color = colors[color]
            }

            showcase.appendChild(stringElement)
          } else {
            const brElement = document.createElement("br")

            showcase.appendChild(brElement)
          }
        }
      }
    }
  }
}, 50)

const refresh = () => {
  command.value = JSON.stringify(result).replaceAll("\\\\", "\\")
}

refresh()