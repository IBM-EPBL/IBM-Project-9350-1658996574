var http = require("https");

var options = {
  "method": "POST",
  "hostname": "{REST_API_HOSTNAME}",
  "port": null,
  "path": "/dbapi/v4/auth/tokens",
  "headers": {
    "content-type": "application/Parkinson_MLmodel.sav",
    "x-deployment-id": "D6717965d-bf1b-492f-9374-b9791915c168",
    "api-key":"s3nNigNL1Ev3RNdHNux58n0UNRXQdCr4AzYDUmYrPwTV"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ userid: '<ADD STRING VALUE>', password: '<ADD STRING VALUE>' }));
req.end();
Footer
