const command = document.querySelector(".container .tools .command #command")
const canPlaceOnField = document.querySelector(".container .tools .edit .keyin .can-place-on #can-place-on")
const canPlaceOnAdd = document.querySelector(".container .tools .edit .keyin .can-place-on #add")
const canDestroyField = document.querySelector(".container .tools .edit .keyin .can-destroy #can-destroy")
const canDestroyAdd = document.querySelector(".container .tools .edit .keyin .can-destroy #add")
const keepOnDeath = document.querySelector(".container .tools .edit .buttons .keep-on-death #keep-on-death")
const lockMode = document.querySelector(".container .tools .edit .buttons .lock-mode #lock-mode")
const clearAll = document.querySelector(".container .tools .run .clear-all")
const undo = document.querySelector(".container .tools .run .undo")
const copy = document.querySelector(".container .tools .run .copy")

let result = {}
let history = []

copy.addEventListener("click", ev => {
  command.select()
  document.execCommand("copy")
})

undo.addEventListener("click", ev => {
  if (history.length > 0) {
    if (history[history.length - 1] == "place") {
      result.can_place_on.blocks.splice(result.can_place_on.blocks.length - 1, 1)

      if (result.can_place_on.blocks.length == 0) {
        delete result.can_place_on
      }

      history.splice(history.length - 1, 1)
    } else if (history[history.length - 1] == "destroy") {
      result.can_destroy.blocks.splice(result.can_destroy.blocks.length - 1, 1)

      if (result.can_destroy.blocks.length == 0) {
        delete result.can_destroy
      }

      history.splice(history.length - 1, 1)
    }
  }

  refresh()
})

clearAll.addEventListener("click", ev => {
  history = []
  result = {}
  refresh()
})

canPlaceOnAdd.addEventListener("click", ev => {
  if (canPlaceOnField.value != "") {
    result.can_place_on ??= {
      blocks: []
    }

    result.can_place_on.blocks.push(canPlaceOnField.value)
    history.push("place")
  }

  canPlaceOnField.value = ""
  refresh()
})

canDestroyAdd.addEventListener("click", ev => {
  if (canDestroyField.value != "") {
    result.can_destroy ??= {
      blocks: []
    }

    result.can_destroy.blocks.push(canDestroyField.value)
    history.push("destroy")
  }

  canDestroyField.value = ""
  refresh()
})

keepOnDeath.addEventListener("change", ev => {
  if (keepOnDeath.checked) {
    if (!result.keep_on_death) {
      result.keep_on_death = {}
    }
  } else {
    if (result.keep_on_death) {
      delete result.keep_on_death
    }
  }

  refresh()
})

lockMode.addEventListener("change", ev => {
  if (lockMode.value == "none") {
    if (result.item_lock) {
      delete result.item_lock
    }
  } else if (lockMode.value == "inventory") {
    result.item_lock ??= {
      mode: ""
    }

    result.item_lock.mode = "lock_in_inventory"
  } else if (lockMode.value == "slot") {
    result.item_lock ??= {
      mode: ""
    }

    result.item_lock.mode = "lock_in_slot"
  }

  refresh()
})

const refresh = () => {
  command.value = JSON.stringify(result)
}

refresh()