function getStreamStatus() {
    return new Promise(function (response, reject) {
        $.ajax({
            type: "GET",
            dataType: "json",
            timeout: 20000,
            cache: false,
            url: stream.urlApi,
            async: true,
            headers: {
                "Client-ID": stream.ClientID,
                "Accept": "application/vnd.twitchtv.v5+json"
            },
            success: function (data) {
                response(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                reject('erreur');
            }
        });
    });
}

function updateIcon(stream) {
    if (stream === null) {
        chrome.browserAction.setBadgeText({text: 'OFF'});
        chrome.browserAction.setBadgeBackgroundColor({color: '#920002'});
    } else {
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.browserAction.setBadgeBackgroundColor({color: '#4688f1'});
    }
}

function createImageNotification(id) {
    chrome.storage.local.get('notif', function (result) {
        if (result.notif) {
            if ((typeof stream.notified) == "undefined" || stream.notified == false) {
                stream.notified = true;

                chrome.notifications.clear(id);
                chrome.notifications.create(id, {
                    type: "image",
                    title: notificationConf.title,
                    message: notificationConf.message,
                    imageUrl: notificationConf.imageUrl,
                    iconUrl: notificationConf.iconUrl,
                    priority: 1,
                    //contextMessage: contextMessage,
                    //buttons: buttons
                }, function callback() {
                    chrome.storage.local.get('playSound', function (result) {
                        if (result.playSound) {
                            notif.play();
                        }
                    });
                });
                if (!chrome.notifications.onClicked.hasListeners("notifSquntt_")) {
                    chrome.notifications.onClicked.addListener(function () {
                        chrome.tabs.create({
                            url: ("https://www.twitch.tv/squntt_")
                        });
                    })
                }
            }
        }
    });
}