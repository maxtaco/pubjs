
// Runtime for command-line hooks
var runtime = require ('./runtime').runtime;
exports.runtime = runtime;

// Compile function for Express
var compile = function (str, options) {
    var Engine = require ("./engine").Engine;
    var eng = new Engine (options.filename);
    var ast = eng.parse (str);
    var outdat = eng.compile ().formatOutput ();
    var fn = new Function ('print', 'locals', outdat);

    return function (locals) {
	var sink = new runtime.Sink ();
	var printFn = sink.printFn ();
	fn.call (this, printFn, locals);
	return sink.output ();
    };
};

exports.compile = compile;
