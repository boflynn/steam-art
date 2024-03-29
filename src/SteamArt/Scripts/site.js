﻿(function () {
    Object.defineProperty(Array.prototype, 'max', {
        enumerable: false,
        value: function (attribute) {
            var max = this[0][attribute];

            for (var i = 1; i < this.length; ++i) {
                if (this[i][attribute] > max) {
                    max = this[i][attribute];
                }
            }

            return max;
        }
    });

    Object.defineProperty(Array.prototype, 'min', {
        enumerable: false,
        value: function (attribute) {
            var min = this[0][attribute];

            for (var i = 1; i < this.length; ++i) {
                if (this[i][attribute] < min) {
                    min = this[i][attribute];
                }
            }

            return min;
        }
    });

    var Game = function (jsonGame) {
        this.appid = jsonGame.appid;
        this.img_icon_url = jsonGame.img_icon_url;
        this.name = jsonGame.name;
        this.playtime_forever = jsonGame.playtime_forever;
    };

    Game.prototype.steamIconUrl = function () {
        return 'http://media.steampowered.com/steamcommunity/public/images/apps/' + this.appid + '/' + this.img_icon_url + '.jpg';
    };

    Game.prototype.gameImg = function () {
        return '<img src="' + this.steamIconUrl() + '" alt="' + this.name + '" title="' + this.name + '" width="' + this.width + '" height="' + this.width + '" />';
    };

    function createGame(jsonGame) {
        return new Game(jsonGame);
    }

    function orderGames(games) {
        var optionsMap = {
            'none': null,
            'played': { name: 'playtime_forever', order: 1 },
            'name': { name: 'name', order: -1 }
        };

        var sortOption = document.querySelector('input[name="sort-options"]:checked').value;

        var sortAttribute = optionsMap[sortOption];

        if (sortAttribute === null) {
            return games;
        }

        var sorted = games.sort(function (left, right) {
            return right[sortAttribute.name] > left[sortAttribute.name] ? 1 * sortAttribute.order : -1 * sortAttribute.order;
        });

        return sorted;
    }

    function scaleGames(games) {
        var minWidth = 32;
        var maxWidth = 128;
        var optionsMap = { 'none': null, 'played': 'playtime_forever' };

        var scaleOption = document.querySelector('input[name="scale-options"]:checked').value;

        var scaleAttribute = optionsMap[scaleOption];

        if (scaleAttribute === null) {
            return games;
        }

        var maxValue = games.max(scaleAttribute);
        var minValue = games.min(scaleAttribute);

        for (var i = 0; i < games.length; ++i) {
            var game = games[i];
            var value = game[scaleAttribute];

            game.width = minWidth + (maxWidth - minWidth) * (value - minValue) / (maxValue - minValue);
        }

        return games;
    }

    function makeArt(games) {
        var art = document.getElementById('this-is-art');

        var arts = [];

        games = orderGames(games);
        games = scaleGames(games);

        for (var i = 0; i < games.length; ++i) {
            var game = games[i];

            if (game.playtime_forever !== 0) {
                arts.push(game.gameImg());
            }
        }

        art.innerHTML = arts.join('');
    }

    document.getElementById('make-art').addEventListener('click', function (evt) {
        var baseUrl = '/api/SteamProfile/';
        var steamId = document.getElementById('steam-id').value;

        if (steamId === '') {
            alert('missing steam id');

            evt.preventDefault();
            return false;

            // TODO - better
        }
        var url = baseUrl + steamId;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function (event) {
            if (request.status >= 200 && request.status < 400) {
                var results = JSON.parse(request.responseText).map(createGame);

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