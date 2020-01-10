window.onload = function () {
    chrome.storage.local.get(['devMode', 'notif', 'playSound'], function (result) {
        if (result.playSound == null) {
            chrome.storage.local.set({'playSound': true}, function () {
            });
        }

        if (result.notif == null) {
            chrome.storage.local.set({'notif': true}, function () {
            });
        }

        if (result.devMode == null) {
            chrome.storage.local.set({'devMode': false}, function () {
            });
        }
    });
};


let tickRate = 60 * 1000; // time update = 60sec

let notif = new Audio("/assets/sounds/notif.mp3"); // audio for notification
notif.volume = 1; // volume of notification

let stream = []; // init array for stream info
if ((typeof stream.notified) == "undefined") {
    stream.notified = false;
}
stream.urlApi = "https://api.twitch.tv/kraken/streams/186509013"; // Squntt_
stream.ClientID = "98pfvdmm2imwdl4qe2gdqp35cth9m4";

let notificationConf = [];

notificationConf.imageUrl = '/assets/images/notifPaperwall.png';
notificationConf.iconUrl = '/assets/icons/squntt_icon48.png';
notificationConf.title = "Squntt_ live !";
notificationConf.message = "Je stream !";

let streamer = []; // init var usable for api