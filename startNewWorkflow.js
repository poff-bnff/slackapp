const https = require("https");

function StartWorkflow(workflow, branch, slackUserId, messagesChannel) {
  var options = {
    method: "POST",
    hostname: "api.github.com",
    path: `/repos/poff-bnff/web2021/actions/workflows/${workflow}/dispatches`,
    headers: {
      "User-Agent": "PostmanRuntime/7.26.3",
      Authorization: "Bearer " + process.env.GITHUB_TOKEN,
      "Content-Type": "application/json"
    },
    maxRedirects: 20
  };

  var req = https.request(options, function(res) {
    var chunks = [];

    res.on("data", function(chunk) {
      chunks.push(chunk);
    });

    res.on("end", function(chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function(error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({ ref: branch, inputs: {slackUserId: slackUserId, privateChannel: messagesChannel} });

  req.write(postData);
  console.log(postData)

  req.end();
}

module.exports.Start = StartWorkflow;