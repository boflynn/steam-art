using Newtonsoft.Json;

namespace SteamArt.Models
{
    public class GetOwnedGames
    {
        [JsonProperty(PropertyName = "response")]
        public GetOwnedGamesResponse Response { get; set; }
    }
}