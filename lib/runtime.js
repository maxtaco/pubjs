//
// Copyright (c) 2011 (MIT License)
//    Maxwell Krohn <max@okcupid.com>
//    HumorRainbow, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//-----------------------------------------------------------------------
//
// Functions to support the tame runtime!  Needs to required in every tame-
//   generated file. All are core, except for Rendezvous, which isn't
//   core, but is quite useful.
//
//-----------------------------------------------------------------------

function Sink () {
    
    this._lines = [];

    this.printFn = function () {
	var self = this;
	return function () { 
	    for (var i in arguments) {
		var line = arguments[i];
		self._lines.push (line);
	    }
	};
    };

    this.output = function () {
	return this._lines.join ('');
    };
};

//-----------------------------------------------------------------------


function runCommandLine (args, fn) {

    function run2 (data) {
	var locals = JSON.parse (data);
	var sink = new Sink ();
	var diags = {};
	fn (sink.printFn (), locals, diags);
	sink.output ();
    };

    if (args.length < 2) { run2 ("{}"); }
    else if (args[2] == "-") { 
	var fs = require ('fs');
	fs.readFile ("/dev/stdin", function (err, data) {
	    if (err) throw err;
	    run2 (String (data));
	});
    } else { run2 (args[2]); }
};

//-----------------------------------------------------------------------

exports.runtime = {
    runCommandLine : runCommandLine,
    Sink : Sink
};

//-----------------------------------------------------------------------
