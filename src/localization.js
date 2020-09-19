// Credit for the localizeHtmlPage function: https://stackoverflow.com/a/25612056/81076
export function localizeHtmlPage () {
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
