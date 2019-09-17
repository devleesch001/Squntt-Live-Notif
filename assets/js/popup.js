getStreamStatus()
    .then(function (response) {
        let elm = document.getElementById("info");
        updateIcon(response["stream"]);
        if (response["stream"] === null) {
        } else {
            streamer.name = response.stream.channel["display_name"];
            streamer.title = response.stream.channel["status"];
            streamer.game = response.stream["game"];
            streamer.viewers = response.stream["viewers"];

            $(document).ready(function () {
                $(".streamer").text(streamer.name);
                $("#live-Status").attr('src', '../assets/icons/live_on.png');
                $(".title").text(streamer.title.replace("[FR] GOTAGA ► ", ""));
                $(".title").attr("title", streamer.title);
                $(".game-name").text(streamer.game);
                $(".game-name").attr("title", streamer.game);
                $(".viewers-count").text(streamer.viewers);
                $("#liveDot").attr({
                    "style": "color: #E31D1A",
                    "class": "fas fa-circle fa-2x"
                });

            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });

$(document).ready(function () {
    $(".settings .fa").click(function () {
        chrome.runtime.openOptionsPage();
    });
});