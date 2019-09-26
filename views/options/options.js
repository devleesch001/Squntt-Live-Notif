window.onload = function () {
    chrome.storage.local.get(['devMode', 'notif', 'playSound'], function (result) {
        document.getElementById("devMode").checked = result.devMode;
        document.getElementById("streamsNotify").checked = result.notif;
        document.getElementById("playSound").checked = result.playSound;

        document.getElementById("version").innerHTML = chrome.runtime.getManifest().version;
        onselectstart = (e) => {e.preventDefault()}
    });

    $(document).ready(function () {

        if ($('#devMode').is(':checked')) {
            $("#displayDevMode").show();
        } else {
            $("#displayDevMode").hide();
            document.addEventListener('contextmenu', event => event.preventDefault())
        }


        $('#streamsNotify').click(function () {
            let checked = $(this).is(':checked');
            chrome.storage.local.set({'notif': checked}, function () {
            });
        });

        $('#playSound').click(function () {
            let checked = $(this).is(':checked');
            chrome.storage.local.set({'playSound': checked}, function () {
            });
        });

        $('#devMode').click(function () {
            let checked = $(this).is(':checked');
            chrome.storage.local.set({'devMode': checked}, function () {
            });

            if (checked) {
                $("#displayDevMode").show();
            } else {
                $("#displayDevMode").hide();
                document.addEventListener('contextmenu', event => event.preventDefault())
            }
        });

        $('#testSound').click(function () {
            notif.play();
            console.log("Test Sound");
        });
        $('#testNotify').click(function () {  // AJAX check la class "togglebtn" lorsque click demare la fucntion
            stream.notified = false;
            createImageNotification("notfication TEST");
            console.log("Test Notif");
        });

    });
};

