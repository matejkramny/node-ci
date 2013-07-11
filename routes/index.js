var repositories = require('../repositories').repositories;
var util = require('util')
var exec = require('child_process').exec;
var mailer = require('nodemailer');

exports.hook = function(req, res) {
	// must be coming from github..
	//if (req.ip != "204.232.175.64" || req.ip != "192.30.252.0") {
		console.log("Req ip: "+req.ip);
	//	return;
	//}
	console.log("IP Seems fine");
	
	var payload = JSON.parse(req.body.payload);
	console.log("Payload: "+payload);
	for (var i = 0; i < repositories.length; i++) {
		var repository = repositories[i];
		if (payload.repository.url != repository.url) {
			continue;
		}
		
		// check ref
		for (var ref in repository.refs) {
			if (payload.ref.indexOf(ref) != -1) {
				// found ref
				exec(__dirname+"/../scripts/"+repository.refs[ref], function (err, stdout, stderr) {
					console.log("Out:"+stdout);
					console.log("Err:"+stderr);
					
					var html = "Script deployed on your CI server..<br/>"
						+ "STDOUT<br/>"
						+ stdout.replace(/\n/g, "<br/>")
						+ "<br/><br/>STDERR<Br/>"
						+ stderr.replace(/\n/g, "<br/>")
						+ "<br/><br/>Your failthful servant, CI server";
					
					var transport = mailer.createTransport("sendmail");
					transport.sendMail({
						to: repository.email,
						from: "ci@foo.bar",
						subject: "CI Deployed",
						html: html,
					});
				});
				break;
			}
		}
		
		break;
	}
}
