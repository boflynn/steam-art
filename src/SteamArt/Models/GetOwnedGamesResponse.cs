using Newtonsoft.Json;
using System.Collections.Generic;

namespace SteamArt.Models
{
    public class GetOwnedGamesResponse
    {
        [JsonProperty(PropertyName = "game_count")]
        public int GameCount { get; set; }

        [JsonProperty(PropertyName = "games")]
        public List<Game> Games { get; set; }
    }
}