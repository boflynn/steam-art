using Newtonsoft.Json;

namespace SteamArt.Models
{
    public class Game
    {
        [JsonProperty(PropertyName = "appid")]
        public int AppId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "playtime_forever")]
        public int PlaytimeForever { get; set; }

        [JsonProperty(PropertyName = "img_icon_url")]
        public string IconUrl { get; set; }

        [JsonProperty(PropertyName = "img_logo_url")]
        public string LogoUrl { get; set; }
    }
}