(function () {
    function getSteamIconUrl(appId, iconHash) {
        return 'http://media.steampowered.com/steamcommunity/public/images/apps/' + appId + '/' + iconHash + '.jpg';
    }

    function buildGameImg(game) {
        return '<img src="' + getSteamIconUrl(game.appid, game.img_icon_url) + '" alt="' + game.name + '" title="' + game.name + '" />';
    }

    function makeArt(games) {
        var art = document.getElementById('this-is-art');

        var arts = [];
        for (var i = 0; i < games.length; ++i) {
            var game = games[i];

            if (game.playtime_forever !== 0) {
                arts.push(buildGameImg(game));
            }
        }

        art.innerHTML = arts.join('');
    }

    document.getElementById('make-art').addEventListener('click', function (evt) {
        var baseUrl = '/api/SteamProfile/';
        var steamId = document.getElementById('steam-id').value;

        var url = baseUrl + steamId;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function (event) {
            if (request.status >= 200 && request.status < 400) {
                var results = JSON.parse(request.responseText);

                makeArt(results);
            } else {
                // TODO - handle error
            }
        };

        request.onerror = function () {
            // TODO - handle error
        };

        request.send();

        evt.preventDefault();
        return false;
    });
})();