
// Credit for the localizeHtmlPage function: https://stackoverflow.com/a/25612056/81076
function localizeHtmlPage () {
  var objects = document.getElementsByTagName('html')
  for (var j = 0; j < objects.length; j++) {
    var obj = objects[j]

    var valStrH = obj.innerHTML.toString()
    var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : ''
    })

    if (valNewH !== valStrH) {
      obj.innerHTML = valNewH
    }
  }
}

localizeHtmlPage()

document.getElementById('addUrlBtn').addEventListener('click', (e) => addUrlPattern(e))
document.getElementById('saveBtn').addEventListener('click', (e) => save())
document.addEventListener('DOMContentLoaded', onLoad)

function onLoad () {
  chrome.storage.sync.get(function (result) {
    document.getElementById('isActive').checked = result.active
    document.getElementById('ftname').value = (result.ftname === undefined) ? 'ft=test' : result.ftname

    if (result.furl === undefined) {
      document.getElementById('furl').value = 'https://www.example.com'
    } else {
      document.getElementById('furl').value = result.furl.shift()
      result.furl.forEach(element => addUrlPattern(null, element))
    }
  })
}

function save () {
  var urlNodes = document.getElementById('urlPanel')
    .querySelectorAll('.css-input')
  var urls = Array.from(urlNodes)
    .map(input => input.value)

  var ftname = document.getElementById('ftname').value
  var isActive = document.getElementById('isActive').checked

  chrome.storage.sync.set({
    furl: urls,
    ftname: ftname,
    active: isActive
  }, function () {})
}

function removeUrlPattern (clickEvent) {
  clickEvent.preventDefault()
  var removeButton = clickEvent.target
  var urlPatternInput = removeButton.previousSibling
  document.getElementById('urlPanel').removeChild(removeButton)
  document.getElementById('urlPanel').removeChild(urlPatternInput)
}

function addUrlPattern (clickEvent, value) {
  clickEvent?.preventDefault()

  var newInput = document.createElement('INPUT')
  newInput.setAttribute('type', 'text')
  newInput.className = 'css-input'
  newInput.value = value || ''

  var newBtn = document.createElement('button')
  newBtn.className = 'rmUrlBtn'
  newBtn.addEventListener('click', (e) => removeUrlPattern(e))
  document.getElementById('urlPanel').appendChild(newInput)
  document.getElementById('urlPanel').appendChild(newBtn)
}
