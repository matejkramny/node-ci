exports.setup = function() {
	var opts = {
		url: "https://github.com/foo/bar",
		email: "foo@bar.example",
		refs: {
			master: "bar-master.sh"
		}
	}
	
	return opts;
}
