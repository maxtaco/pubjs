
// Runtime for command-line hooks
var runtime = require ('./runtime').runtime;
var fs = require ('fs');
exports.runtime = runtime;

var counter = 1;

// Report the compiler error to standard output, so that
// the log will show what went wrong...
var report_compile_error = function (text, options) {
    
    if (options.debug) {

	// Crazy that node doesn't have a tempfile system :(
	var seqno = ((process.pid + counter++) * (new Date ()).getTime()) 
	    % 0xfffffffff;
	var tmp = "/tmp/pubjs-template." + seqno + ".js";

	fs.writeFile (tmp, text, function (err) {
	    if (!err) {
		try {
		    require (tmp);
		} catch (e) {
		    // outer = e;
		}
		fs.unlink (tmp, function (err) {
		    if (err) {
			console.log ("In reporting compiler error; " +
				     "in unlinking '" + tmp + "': " + err);
		    }
		});
	    } else {
		console.log ("In reporting compiler error, failed to write '"
			     + tmp  + "': " +  err);
	    }
	});
    }
}

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
	report_compile_error (outdat, options);
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
