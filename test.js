var g = $J.post("http://steamcommunity.com/id/*/ajaxenableprofilemodifier/", {
  sessionid: g_sessionID,
  appid: "753",
  assetid: "1309377320",
  enabled: "1"}).done(function() { alert(g.responseText) });
