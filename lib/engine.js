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

function Line (txt, lineno, indent) {
    this._text = txt;
    if (!lineno) { lineno = 0; }
    if (!indent) { indent = 0; }
    this._lineno = lineno;
    this._indent = indent;

    //-----------------------------------------
		   
    this.text = function () { return this._text; }
    this.lineno = function () { return this._lineno; }
    this.indent = function () { return this._indent; }

    //-----------------------------------------

    this.incIndent = function (i) { this._indent += i; }
    
    //-----------------------------------------

    this.push = function (obj) {
	var ret = false;
	console.log ("push " + obj.lineno () + " " + this.lineno ());
	if (obj.lineno () && this.lineno () == obj.lineno ()) {
	    this._text += " " + obj.text ();
	    ret = true;
	}
	return ret;
    };

    //-----------------------------------------

    return this;
};

//=======================================================================
//
//  A piece of output as output by the compilation engine

function Output () {

    this._lines = [];
    this._indent = 0;

    this.indent = function () { this._indent ++; };
    this.unindent = function () { this._indent--; };

    //-----------------------------------------

    this.addLine = function (txt, lineno) {
	console.log ("add line(" + lineno + "): " + txt);
	this.addLineObj (new Line (txt, lineno, this._indent));
    };

    //-----------------------------------------
    
    this.addLines = function (v, lineno) {
	for (var i in v) {
	    var line = v[i];
	    this.addLine (line, lineno);
	    lineno++;
	}
    };

    //-----------------------------------------
    
    this.last = function () {
	var ret = null;
	var len = this._lines.length;
	if (len) { ret = this._lines[len-1]; }
	console.log ("last " + ret);
	return ret;
    };

    //-----------------------------------------

    this.addLineObj = function (o) {
	var lst = this.last ();
	if (!lst || !lst.push (o)) {
	    this._lines.push (o);
	}
    };

    //-----------------------------------------

    this.addOutput = function (o) {
	for (var i in o._lines) {
	    var line = o._lines[i];
	    line.incIndent (this._indent);
	    this.addLineObj (line);
	}
    };
    
    //----------------------------------------

    this._cachedIndents = {};
    this.outputIndent = function (n) {
	var ret;
	if (this._cachedIndents[n]) {
	    ret = this._cachedIndents[n];
	} else {
	    var spc = "    ";
	    var v = []
	    for (var i = 0; i < n; i++) {
		v.push (spc);
	    }
	    ret = v.join ("");
	    this._cachedIndents[n] = ret;
	}
	return ret;
    };

    //----------------------------------------

    this.formatOutputLines = function () {
	var out = [];
	for (var i in this._lines) {
	    var l = this._lines[i];
	    var line = this.outputIndent (l.indent ()) + l.text ();
	    out.push (line);
	}
	return out;
    };

    //----------------------------------------

    this.formatOutput = function () {
	return this.formatOutputLines().join ("\n");
    };

    //-----------------------------------------

    return this;
};

//=======================================================================

function Engine (filename) {

    //-----------------------------------------

    this._filename = filename;
    this._txt = null;
    this._ast = null;

    //-----------------------------------------

    // A block of output is given by this class.
    this.Output = Output;

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
