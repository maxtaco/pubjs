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

//=======================================================================

function Engine (filename) {

    //-----------------------------------------

    this._filename = filename;
    this._txt = null;
    this._ast = null;

    //-----------------------------------------

    this.compile = function () {
	return this._ast.compile (this);
    };

    //-----------------------------------------

    // Fix this up a bunch!
    this.error = function (node, msg) {
	console.log (this._filename + ":" + node.startLine () + ": " + msg);
	process.exit (1);
    };

    //-----------------------------------------

    this.readInput = function (cb) {
	var fs = require ('fs');
	var self = this;
	fs.readFile (this._filename, function (err, data) {
	    if (err) throw err;
	    self._txt = String (data);
	    cb();
	});
    };

    //-----------------------------------------

    this.dump = function () {
	// dump the compressed AST to the terminal, in case we're
	// curious as to what it is.
	console.log (JSON.stringify (this._ast.dump ()));
    };

    //-----------------------------------------

    // Load up the parser and run it on the input text 
    this.parse = function (txt) {
	if (!txt) { txt = this._txt; }
	var astmod = require ('./ast');
	var parser = require ('./parser').parser;
	// Set the ast bindings into the parser's free yy variable
	parser.yy = astmod;
	
	var res = parser.parse (txt);
	var ast = null;
	if (res) { 
	    ast = parser.yy.output;
	    this._ast = ast;
	}
	return ast;
    };

    //-----------------------------------------

    return this;
};

//-----------------------------------------------------------------------

exports.Engine = Engine;
