var express = require('express');
var fs = require('fs');
var stripeApiKey = "sk_test_2WkTa4068RXv3nU7SAgRH7FW";
var stripe = require('stripe')(stripeApiKey);
var qs = require('querystring');

var app = express.createServer(express.logger());

app.use(express.bodyParser());

app.get('/', function(request, response) {
    var buf = fs.readFileSync('index.html');
    response.send(buf.toString());
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});


app.post('/', function(request, response) {
    stripe.charges.create({
	card : request.body.stripeToken,
	amount : 3000,
	currency : "usd"
    }, function (err, res) {
	if (err) {
	    console.log("Token is " + request.body.stripeToken);
	    console.log("Body is " + qs.stringify(request.body));
	    console.log(err.message);
	    response.send(err.message);
	} else {
	    console.log("Token is " + request.body.stripeToken);
	    console.log("Body is " + qs.stringify(request.body));
	    response.send('Your card has been successfully charged. Thank you!');
	}
    });
});
