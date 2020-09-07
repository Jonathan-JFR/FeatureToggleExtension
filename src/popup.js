document.getElementById("saveBtn").onclick = function() {
    var furl = document.getElementById("furl").value;
    var ftname = document.getElementById("ftname").value;
    var isActive = document.getElementById("isActive").checked;

    chrome.storage.sync.set({'furl': furl}, function() {});
    chrome.storage.sync.set({'ftname': ftname}, function() {});
    chrome.storage.sync.set({'active': isActive}, function() {});
  }

document.addEventListener("DOMContentLoaded", onLoad);
  
function onLoad() {
  chrome.storage.sync.get(function(result) {
    document.getElementById("furl").value = (result.furl==undefined) ? "www.example.com" : result.furl;
    document.getElementById("ftname").value = (result.ftname==undefined) ? "ft=test" : result.ftname;  
    document.getElementById("isActive").checked = result.active;
  });
}
