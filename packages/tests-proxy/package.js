Package.describe({
	name: "velocity:test-proxy",
	summary: "Dynamically created package to expose test files to mirrors",
	version: "0.0.4",
	debugOnly: true
});

Package.onUse(function (api) {
	api.use("coffeescript", ["client", "server"]);
	api.add_files("tests/mocha/client/clientTest.coffee",["client"]);
	api.add_files("tests/mocha/server/sampleServerTest.coffee",["server"]);
});