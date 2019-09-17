window.onload = function () {
    chrome.storage.local.get(['devMode', 'notif', 'playSound'], function (result) {
        document.getElementById("devMode").checked = result.devMode;
        document.getElementById("streamsNotify").checked = result.notif;
        document.getElementById("playSound").checked = result.playSound;
        // document.getElementById("playSound").checked = true;
    });

    $(document).ready(function () {

        if ($('#devMode').is(':checked')) {
            $("#testSound").show();
            $("#testNotify").show();
        } else {
            $("#testSound").hide();
            $("#testNotify").hide();
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
                $("#testSound").show();
                $("#testNotify").show();
            } else {
                $("#testSound").hide();
                $("#testNotify").hide();
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