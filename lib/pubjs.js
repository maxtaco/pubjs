
// Runtime for command-line hooks
var runtime = require ('./runtime').runtime;
exports.runtime = runtime;

// Compile function for Express
var compile = function (str, options) {
    var Engine = require ("./engine").Engine;
    var fn = options.filename;
    var eng = new Engine (fn);
    var ast = eng.parse (str);
    var outdat = eng.compile ().formatOutput ();
    try { 
	var func = new Function ('print', 'locals', 'diagnostics', outdat);
    } catch (e) {
	e.message = "In compiling file '" + fn + "': " + e.message;
	throw e;
    }
    return function (locals) {
	var sink = new runtime.Sink ();
	var printFn = sink.printFn ();
	var diagnostics = {};
	try {
	    func.call (this, printFn, locals, diagnostics);
	} catch (e) {
	    e.message = "In file '" + fn + "' on or after line " +
		diagnostics.lineno + ": " + e.message;
	    throw e;
	}
	return sink.output ();
    };
};

exports.compile = compile;
