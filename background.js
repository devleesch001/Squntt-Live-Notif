function while_() {
    getStreamStatus()
        .then(function (response) {
            updateBadge(response["stream"]); //update icon
            chrome.storage.local.get('devMode', function (result) {
                if (result.devMode) {
                    console.log("response" + response);
                }

                if (response["stream"] === null) {
                    chrome.browserAction.setTitle({title: "Squntt_ est Hors-Ligne"});
                    chrome.notifications.clear("notifSquntt_");
                    if (result.devMode) {
                        console.log("Hors-ligne");
                    }
                } else {
                    chrome.browserAction.setTitle({title: "Squntt_ est En Ligne"});
                    createImageNotification("notifSquntt_");
                    if (result.devMode) {
                        console.log("Online");
                    }
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    setTimeout(while_, tickRate)
}

while_();