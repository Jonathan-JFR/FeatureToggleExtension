document.getElementById("addUrlBtn").addEventListener("click", (e) => addUrlPattern(e));

document.addEventListener("DOMContentLoaded", onLoad);

  
function removeUrlPattern(clickEvent) {
  clickEvent.preventDefault();
  var removeButton = clickEvent.target;
  var urlPatternInput = removeButton.previousSibling;
  document.getElementById("urlPanel").removeChild(removeButton);
  document.getElementById("urlPanel").removeChild(urlPatternInput);
}

function addUrlPattern(clickEvent) {
  clickEvent.preventDefault();
  var newInput = document.createElement("INPUT");
  newInput.setAttribute("type", "text");
  newInput.className = "css-input";
  var newBtn = document.createElement("button");
  newBtn.className ="rmUrlBtn";
  newBtn.addEventListener("click", (e) => removeUrlPattern(e)); 
  document.getElementById("urlPanel").appendChild(newInput);
  document.getElementById("urlPanel").appendChild(newBtn);

}

document.getElementById("saveBtn").onclick = function() {
    var furl = document.getElementById("furl").value;
    var ftname = document.getElementById("ftname").value;
    var isActive = document.getElementById("isActive").checked;

    chrome.storage.sync.set({'furl': furl}, function() {});
    chrome.storage.sync.set({'ftname': ftname}, function() {});
    chrome.storage.sync.set({'active': isActive}, function() {});
  }

function onLoad() {
  chrome.storage.sync.get(function(result) {
    document.getElementById("furl").value = (result.furl==undefined) ? "www.example.com" : result.furl;
    document.getElementById("ftname").value = (result.ftname==undefined) ? "ft=test" : result.ftname;  
    document.getElementById("isActive").checked = result.active;
  });

}
