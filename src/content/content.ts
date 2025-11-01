//simple dummy listener for now.


//chrome extension api method lets the program listen for msgs sent using sendMessage

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => { // callback function whenever msg is rcvd
  if (message.action ==="summarise") {
    console.log("request  rcvd by popup!");
    sendResponse({ status:"ok" });
  }
});