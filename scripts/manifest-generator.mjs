const behaviorMetadataToggleButton = document.querySelector(".container .tools .edit .behavior-metadata .toggle #enable-metadata")
const behaviorMetadataAuthor = document.querySelector(".container .tools .edit .behavior-metadata .author-info")
const behaviorGametestToggleButton = document.querySelector(".container .tools .edit .behavior-gametest .toggle #enable-gametest")
const behaviorGametestGametest = document.querySelector(".container .tools .edit .gametest")
const behaviorGametestUI = document.querySelector(".container .tools .edit .behavior-gametest .gametest .ui-container #enable-ui")
const behaviorGametestGameTest = document.querySelector(".container .tools .edit .behavior-gametest .gametest .gametest-container #enable-gametest")
const behaviorGametestAdmin = document.querySelector(".container .tools .edit .behavior-gametest .gametest .admin-container #enable-admin")
const behaviorGametestNet = document.querySelector(".container .tools .edit .behavior-gametest .gametest .net-container #enable-net")
const showcase = document.querySelector(".container .tools .showcase #showcase")
const behaviorPackName = document.querySelector(".container .tools .edit .behavior-packs-name #pack-name")
const behaviorPackDescription = document.querySelector(".container .tools .edit .behavior-packs-description #pack-description")
const behaviorPackMinEngineVersion = document.querySelector(".container .tools .edit .behavior-min-engine-version #min-engine-version")
const behaviorMetadataName = document.querySelector(".container .tools .edit .behavior-metadata .author-info #name")
const behaviorMetadataWebsite = document.querySelector(".container .tools .edit .behavior-metadata .author-info #website")
const behaviorGametestPath = document.querySelector(".container .tools .edit .behavior-gametest .gametest #path")
const resourceMetadataToggleButton = document.querySelector(".container .tools .edit .resource-metadata .toggle #enable-metadata")
const resourceMetadataAuthor = document.querySelector(".container .tools .edit .resource-metadata .author-info")
const resourcePackName = document.querySelector(".container .tools .edit .resource-packs-name #pack-name")
const resourcePackDescription = document.querySelector(".container .tools .edit .resource-packs-description #pack-description")
const resourcePackMinEngineVersion = document.querySelector(".container .tools .edit .resource-min-engine-version #min-engine-version")
const resourceMetadataName = document.querySelector(".container .tools .edit .resource-metadata .author-info #name")
const resourceMetadataWebsite = document.querySelector(".container .tools .edit .resource-metadata .author-info #website")
const copy = document.querySelector(".container .tools .showcase .copy")
const packType = document.querySelector(".container .tools .pack-type #pack-type")
const behavior = document.querySelector(".container .tools .edit .behavior-packs")
const resource = document.querySelector(".container .tools .edit .resource-packs")

const behaviorResult = {
  format_version: 2,
  header: {
    uuid: "",
    version: [
      1,
      0,
      0
    ],
    min_engine_version: [
      1,
      20,
      0
    ]
  },
  modules: [
    {
      type: "data",
      uuid: "",
      version: [
        1,
        0,
        0
      ]
    }
  ]
}

const resourceResult = {
  format_version: 2,
  header: {
    uuid: "",
    version: [
      1,
      0,
      0
    ],
    min_engine_version: [
      1,
      20,
      0
    ]
  },
  modules: [
    {
      type: "resources",
      uuid: "",
      version: [
        1,
        0,
        0
      ]
    }
  ]
}

packType.addEventListener("change", ev => {
  if (packType.value == "behavior-pack") {
    behavior.style.display = "block"
    resource.style.display = "none"
  } else {
    behavior.style.display = "none"
    resource.style.display = "block"
  }

  refresh()
})

behaviorPackMinEngineVersion.addEventListener("change", ev => {
  behaviorResult.header.min_engine_version = behaviorPackMinEngineVersion.value.split(".").map(string => Number(string))
  refresh()
})

behaviorPackDescription.addEventListener("input", ev => {
  if (behaviorPackDescription.value == "") {
    delete behaviorResult.header.description
  } else {
    behaviorResult.header.description = behaviorPackDescription.value
  }

  refresh()
})

behaviorPackName.addEventListener("input", ev => {
  if (behaviorPackName.value == "") {
    delete behaviorResult.header.name
  } else {
    behaviorResult.header.name = behaviorPackName.value
  }

  refresh()
})

behaviorMetadataName.addEventListener("input", ev => {
  behaviorResult.metadata = {}

  if (!(
    behaviorMetadataName.value == "" &&
    behaviorMetadataWebsite.value == ""
  )) {
    behaviorResult.metadata.authors = [
      behaviorMetadataName.value
    ]

    behaviorResult.metadata.url = behaviorMetadataWebsite.value
  }

  refresh()
})

behaviorMetadataWebsite.addEventListener("input", ev => {
  behaviorResult.metadata = {}

  if (!(
    behaviorMetadataName.value == "" &&
    behaviorMetadataWebsite.value == ""
  )) {
    behaviorResult.metadata.authors = [
      behaviorMetadataName.value
    ]

    behaviorResult.metadata.url = behaviorMetadataWebsite.value
  }

  refresh()
})

behaviorMetadataToggleButton.addEventListener("change", ev => {
  behaviorMetadataAuthor.style.display = `${behaviorMetadataToggleButton.checked ? `block` : `none`}`

  if (behaviorMetadataToggleButton.checked) {
    behaviorResult.metadata = {}

    if (!(
      behaviorMetadataName.value == "" &&
      behaviorMetadataWebsite.value == ""
    )) {
      behaviorResult.metadata.authors = [
        behaviorMetadataName.value
      ]

      behaviorResult.metadata.url = behaviorMetadataWebsite.value
    }
  } else {
    delete behaviorResult.metadata
  }

  refresh()
})

behaviorGametestToggleButton.addEventListener("change", ev => {
  behaviorGametestGametest.style.display = `${behaviorGametestToggleButton.checked ? `block` : `none`}`

  if (behaviorGametestToggleButton.checked) {
    behaviorResult.dependencies = [
      {
        module_name: "@minecraft/server",
        version: "1.8.0-beta",
        entry: behaviorGametestPath.value
      }
    ]

    if (behaviorGametestAdmin.checked) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-admin",
        version: "1.0.0-beta"
      })
    }

    if (behaviorGametestGameTest.checked) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-gametest",
        version: "1.0.0-beta"
      })
    }

    if (behaviorGametestNet.checked) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-net",
        version: "1.0.0-beta"
      })
    }

    if (behaviorGametestUI.checked) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-ui",
        version: "1.2.0-beta"
      })
    }
  }

  refresh()
})

behaviorGametestAdmin.addEventListener("change", ev => {
  if (behaviorGametestAdmin.checked) {
    let is = false

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-admin") {
        is = true
      }
    }

    if (!is) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-admin",
        version: "1.0.0-beta"
      })
    }
  } else {
    let index = -1

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-admin") {
        index = i
      }
    }

    if (index != -1) {
      behaviorResult.dependencies.splice(index, 1)
    }
  }

  refresh()
})

behaviorGametestGameTest.addEventListener("change", ev => {
  if (behaviorGametestGameTest.checked) {
    let is = false

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-gametest") {
        is = true
      }
    }

    if (!is) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-gametest",
        version: "1.0.0-beta"
      })
    }
  } else {
    let index = -1

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-gametest") {
        index = i
      }
    }

    if (index != -1) {
      behaviorResult.dependencies.splice(index, 1)
    }
  }

  refresh()
})

behaviorGametestNet.addEventListener("change", ev => {
  if (behaviorGametestNet.checked) {
    let is = false

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-net") {
        is = true
      }
    }

    if (!is) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-net",
        version: "1.0.0-beta"
      })
    }
  } else {
    let index = -1

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-net") {
        index = i
      }
    }

    if (index != -1) {
      behaviorResult.dependencies.splice(index, 1)
    }
  }

  refresh()
})

behaviorGametestUI.addEventListener("change", ev => {
  if (behaviorGametestUI.checked) {
    let is = false

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-ui") {
        is = true
      }
    }

    if (!is) {
      behaviorResult.dependencies.push({
        module_name: "@minecraft/server-ui",
        version: "1.2.0-beta"
      })
    }
  } else {
    let index = -1

    for (let i = 0; i < behaviorResult.dependencies.length; i++) {
      if (behaviorResult.dependencies[i].module_name == "@minecraft/server-ui") {
        index = i
      }
    }

    if (index != -1) {
      behaviorResult.dependencies.splice(index, 1)
    }
  }

  refresh()
})

resourcePackMinEngineVersion.addEventListener("change", ev => {
  resourceResult.header.min_engine_version = resourcePackMinEngineVersion.value.split(".").map(string => Number(string))
  refresh()
})

resourcePackDescription.addEventListener("input", ev => {
  if (resourcePackDescription.value == "") {
    delete resourceResult.header.description
  } else {
    resourceResult.header.description = resourcePackDescription.value
  }

  refresh()
})

resourcePackName.addEventListener("input", ev => {
  if (resourcePackName.value == "") {
    delete resourceResult.header.name
  } else {
    resourceResult.header.name = resourcePackName.value
  }

  refresh()
})

resourceMetadataName.addEventListener("input", ev => {
  resourceResult.metadata = {}

  if (!(
    resourceMetadataName.value == "" &&
    resourceMetadataWebsite.value == ""
  )) {
    resourceResult.metadata.authors = [
      resourceMetadataName.value
    ]

    resourceResult.metadata.url = resourceMetadataWebsite.value
  }

  refresh()
})

resourceMetadataWebsite.addEventListener("input", ev => {
  resourceResult.metadata = {}

  if (!(
    resourceMetadataName.value == "" &&
    resourceMetadataWebsite.value == ""
  )) {
    resourceResult.metadata.authors = [
      resourceMetadataName.value
    ]

    resourceResult.metadata.url = resourceMetadataWebsite.value
  }

  refresh()
})

resourceMetadataToggleButton.addEventListener("change", ev => {
  resourceMetadataAuthor.style.display = `${resourceMetadataToggleButton.checked ? `block` : `none`}`

  if (resourceMetadataToggleButton.checked) {
    resourceResult.metadata = {}

    if (!(
      resourceMetadataName.value == "" &&
      resourceMetadataWebsite.value == ""
    )) {
      resourceResult.metadata.authors = [
        resourceMetadataName.value
      ]

      resourceResult.metadata.url = resourceMetadataWebsite.value
    }
  } else {
    delete resourceResult.metadata
  }

  refresh()
})

copy.addEventListener("click", ev => {
  showcase.select()
  document.execCommand("copy")
  copy.innerHTML = "Copied successfully!"

  setTimeout(() => {
    copy.innerHTML = "Copy"
  }, 1000)
})

const refresh = () => {
  if (packType.value == "behavior-pack") {
    behaviorResult.header.uuid = generateUUID()
    behaviorResult.modules[0].uuid = generateUUID()
    showcase.value = JSON.stringify(behaviorResult, undefined, 4)
  } else {
    resourceResult.header.uuid = generateUUID()
    resourceResult.modules[0].uuid = generateUUID()
    showcase.value = JSON.stringify(resourceResult, undefined, 4)
  }
}

const generateUUID = () => {
  const s4 = () => {
    return Math.floor((Math.random() + 1) * 0x10000).toString(16).slice(1)
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

refresh()