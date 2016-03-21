# node-hubspot

Node.js wrapper for the HubSpot API

## install

npm install hubspot

## use

	var Client = require('hubspot');

	var client = new Client();

	client.useKey('API_KEY');
	client.useToken('MY_ACCESS_TOKEN');
	client.campaigns.get(function(err, res) {
		if (err) { throw err; }
		console.log(res);
	});
