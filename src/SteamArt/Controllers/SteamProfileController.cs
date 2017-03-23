using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using SteamArt.Models;

namespace SteamArt.Controllers
{
    public class SteamProfileController : ApiController
    {
        private const string ApiUrl = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={0}&steamid={1}&format=json&include_appinfo=1";

        private const string ImageUrl = "http://media.steampowered.com/steamcommunity/public/images/apps/{0}/{1}.jpg";

        private readonly string Key = ConfigurationManager.AppSettings["SteamApiKey"];

        // GET api/SteamProfile/76561198025345381
        public async Task<IHttpActionResult> Get(string id)
        {
            var url = string.Format(ApiUrl, Key, id);
            string json;

            using (var client = new HttpClient())
            {
                using (var r = await client.GetAsync(url))
                {
                    json = await r.Content.ReadAsStringAsync();
                }
            }

            var result = JsonConvert.DeserializeObject<GetOwnedGames>(json);
            var games = result.Response.Games;

            return Ok(games);
        }
    }
}