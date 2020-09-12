var furl = [];
var ftname="";
var isActive=false;

loadDataFromStore();
reloadListener();

function loadDataFromStore(){
    chrome.storage.sync.get(function(result) {
        isActive = result.active
        ftname = result.ftname
        furl = result.furl});
}

function changeIcon(status, tabId)
{
    if(tabId === undefined || tabId < 0){
        return;
    }

    if(status==="On"){
        chrome.pageAction.setIcon({
            tabId: tabId,
            path : {
                "16": "images/on16.png",
                "32": "images/on32.png",
                "128": "images/on128.png"
            }
          });
    }
    else{
        chrome.pageAction.setIcon({
            tabId: tabId,
            path : {
                "16": "images/off16.png",
                "32": "images/off32.png",
                "128": "images/off128.png"
            }
          });
    }
}

function setTitle(newTitle, tabId){
    if(tabId === undefined || tabId < 0){
        return;
    }
    chrome.pageAction.setTitle({tabId, title:newTitle});
}

function listener(details)
{
    if(!isActive){
        const msg = "Extension Not active";
        console.log("----------" + msg + "----------");
        changeIcon("Off", details.tabId);
        setTitle(msg,details.tabId);
        return;
    }
    if(!furl || !ftname){
        const msg = "Extension Not fully configured";
        console.log("----------" + msg + "----------");
        changeIcon("Off", details.tabId);
        setTitle(msg,details.tabId);
        return;
    }

    if(furl.every((url) => !details.url.includes(url))){
        const msg = "None of the urls match";
        console.log("----------" + msg + "----------");
        return;
    } 
        
    if(details.url.endsWith(ftname) || details.url.includes(ftname + '&')){
        const msg = "FT already present";
        console.log("----------" + msg + "----------");
        changeIcon("On", details.tabId);
        setTitle(msg,details.tabId);
        return;
    }

    var url = details.url + 
        (details.url.indexOf("?") == -1 
            ? "?" + ftname 
            : "&" + ftname)

    console.log("url--> " + url);''             
    changeIcon("On", details.tabId);
    setTitle("Feature Toogle On",details.tabId);
    return {redirectUrl:url};
}

function reloadListener(){
    if(chrome.webRequest.onBeforeRequest.hasListener(listener)){
        chrome.webRequest.onBeforeRequest.removeListener(listener);
        console.log('listener removed');
    }

    chrome.webRequest.onBeforeRequest.addListener(
        listener,
        {
            urls: [
                "<all_urls>"
            ],
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
        },
        ["blocking"]
    );
    console.log('listener added');
}

//Show the extension in all pages
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlMatches: '//*/*' },      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

//Track changes in Storage
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
                    'Old value was "%s", new value is "%s".',
                    key,
                    namespace,
                    storageChange.oldValue,
                    storageChange.newValue);
    }
    loadDataFromStore();
    reloadListener();
  });


chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        reloadListener();
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        reloadListener();
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});
