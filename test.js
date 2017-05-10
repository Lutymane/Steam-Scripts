var g;
setTimeout(function (){
            g = $J.post("http://steamcommunity.com/id/LeZoidberg/ajaxenableprofilemodifier/", {
  sessionid: g_sessionID,
  appid: "753",
  assetid: "1309377320",
  enabled: "1"});
}, 5000);
g.responseText;
