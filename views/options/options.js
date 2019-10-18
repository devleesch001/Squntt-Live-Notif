window.onload = function () {
    chrome.storage.local.get(['devMode', 'notif', 'playSound'], function (result) { // get variable from chrome.storage
        document.getElementById("devMode").checked = result.devMode;      // define checkbox status
        document.getElementById("streamsNotify").checked = result.notif;
        document.getElementById("playSound").checked = result.playSound;

        document.getElementById("version").innerHTML = chrome.runtime.getManifest().version; // display version
        onselectstart = (e) => {
            e.preventDefault()
        }
    });

    $(document).ready(function () {
        if ($('#devMode').is(':checked')) { //  Check if the checkbox 'devMode' is check
            $("#displayDevMode").show(); // Show devMode menu
        } else {
            $("#displayDevMode").hide(); // Hide devMode menu
            document.addEventListener('contextmenu', event => event.preventDefault()) // disable contextmenu
        }

        $('#streamsNotify').click(function () { // when checkbox 'streamsNotify' is clicked
            let checked = $(this).is(':checked'); // save status of checkbox in variable checked
            chrome.storage.local.set({'notif': checked}, function () { // save status of variable checked in chrome.storage
            });
        });

        $('#playSound').click(function () { // when checkbox 'playSound' is clicked
            let checked = $(this).is(':checked'); // save status of checkbox in variable checked
            chrome.storage.local.set({'playSound': checked}, function () { // save status of variable checked in chrome.storage
            });
        });

        $('#devMode').click(function () { // when checkbox 'devMode' is clicked
            let checked = $(this).is(':checked'); // save status of checkbox in variable checked
            chrome.storage.local.set({'devMode': checked}, function () { // save status of variable checked in chrome.storage
            });

            if (checked) {
                $("#displayDevMode").show();
            } else {
                $("#displayDevMode").hide();
                document.addEventListener('contextmenu', event => event.preventDefault())
            }
        });



        $('#testSound').click(function () { // when button 'testSound' clicked
            notif.play();   // play sound of notification
            console.log("Test Sound");
        });
        $('#testNotify').click(function () { // when button 'testNotify' clicked
            stream.notified = false;
            createImageNotification("notfication TEST"); // run 'createImageNotification' creat Notification
            console.log("Test Notif");
        });

    });
};

