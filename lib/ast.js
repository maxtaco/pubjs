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
// Code for making the elements of the abstract syntax tree (AST)
// for the pubjs grammar.  Everything should inherit from a Node
// object.  A File object is output by the parser
//
//-----------------------------------------------------------------------

function Node (startLine) {
    this._startLine = startLine;

    this.pushText = function (txt) { return false; }
    this.pushJs = function (txt) { return false; }
    this.isJs = function (txt) { return false; }
    this.isTextZone = function (txt) { return false; }
};

//-----------------------------------------------------------------------

function dump_v (v) { 
    return v.map (function (x) { 
	if (typeof (x) == 'string') { return x; }
	else { return x.dump (); ; }
    });
};

//-----------------------------------------------------------------------

function InlineJs (startLine, code) {
    var that = new Node (startLine);
    that._code = code;

    that.dump = function () {
	return { type : 'InlineJs', code : this._code };
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var out = eng.newOutput ();
	out.addBlock ("print (" + this._code + ");", this._startLine);
	return out;
    };

    return that;
};

//-----------------------------------------------------------------------

function MyString (startLine, elements, quote) {

    //-----------------------------------------
    // Constructor ---  smush together elements
    // so long as we have different string components.
    // when we get an InlineJs block, then we push it
    // as a separate object.
    var that = new Node (startLine);
    that._quote = quote;

    that.init = function (elements) {
	var v = [];
	var buf = [];
	for (var i in elements) {
	    var element = elements[i];
	    if (typeof (element) == 'string') {
		buf.push (element);
	    } else {
		if (buf.length) {
		    v.push (buf.join (""));
		}
		last = null;
		v.push (element);
	    }
	}
	if (buf.length) { v.push (buf.join ("")); }
	this._elements = v;
    };
    that.init (elements);

    //-----------------------------------------

    that.dump = function () {
	return { type : 'String',
		 elements : dump_v (this._elements),
		 quoteChar : this._quote };
    };

    //-----------------------------------------

    that.text = function () {
	var s = this._quote + this._elements.join ("") + this._quote;
	return s;
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var out = eng.newOutput ();
	out.addLine (this.text (), this._startLine);
	return out;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function Js (startLine, code) {
    var that = new Node (startLine);
    that._code = [ code ];

    //-----------------------------------------

    that.isJs = function () { return true; }

    //-----------------------------------------

    that.pushJs = function (frag) {
	var ret = false;
	if (frag.isJs ()) {
	    this._code = this._code.concat (frag._code);
	    ret = true;
	}
	return ret;
    };

    //-----------------------------------------

    that.code = function () {
	return this._code.join ('');
    };

    //-----------------------------------------

    that.dump = function () {
	return { type : 'Js', code : this.code () };
    };
    
    //-----------------------------------------

    that.compile = function (eng) {
	var out = eng.newOutput ();
	out.addBlock (this.code (), this._startLine);
	return out;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function JsZone (startLine, blocks) {
    var that = new Node (startLine);

    //-----------------------------------------
    
    that.compress = function (blocks) {
	var out = [];
	var last = null;
	for (var i in blocks) {
	    var block = blocks[i];
	    if (!last || !last.pushJs (block)) {
		out.push (block);
		last = block;
	    }
	}
	return out;
    };

    that._blocks = that.compress (blocks);

    //-----------------------------------------

    that.dump = function () {
	return { type : 'JsZone', code : dump_v (this._blocks) };
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var out = eng.newOutput ();
	for (var i in this._blocks) {
	    var b = this._blocks[i];
	    var c = b.compile (eng);
	    out.addOutput (c);
	}
	return out;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function Text (startLine, text) {
    var that = new Node (startLine);
    that._text = [ text ];

    //-----------------------------------------

    that.pushText = function (text) {
	this._text.push (text);
	return true;
    };

    //-----------------------------------------

    that.text = function () {
	return this._text.join ('');
    };

    //-----------------------------------------

    that.compile = function (eng) {
	var out = eng.newOutput ();
	var lines = this.text ().split ("\n");
	var n = this._startLine;
	out.addLineDiagnostics (n);
	out.addLine ("print (", n);
	out.indent ();
	for (var i in lines) {
	    if (i > 0) {
		out.addLine (",", n);
		n++;
	    }
	    var line = lines[i];
	    if (i != lines.length - 1) {
		line += "\n";
	    }
	    out.addLine (JSON.stringify (line), n);
	}
	    
	out.unindent ();
	out.addLine (");", n);
	out.addLineDiagnostics (n);
	return out;
    };

    //-----------------------------------------

    that.dump = function () {
	return { type : 'Text', text : this.text (),
		 lineno : this._startLine };
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function TextZone (startLine, blocks) {
    var that = new Node (startLine);
    that._blocks = blocks;

    //-----------------------------------------

    that.dump = function () {
	return { type : 'TextZone', code : dump_v (this._blocks) };
    };

    //-----------------------------------------

    that.isTextZone = function () { return true; }

    //-----------------------------------------

    that.compile = function (eng) {
	var out = eng.newOutput ();
	for (var i in this._blocks) {
	    var b = this._blocks[i];
	    var c = b.compile (eng);
	    out.addOutput (c);
	}
	return out;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function File (startLine, textZone) {
    var that = new Node (startLine);
    that._textZone = textZone;
    
    //-----------------------------------------------------------------------

    that.dump = function ()  {
	return { type : 'File',
		 body : this._textZone.dump () };
    };

    //-----------------------------------------------------------------------

    that.compile = function (eng) {
	var lineno = 0;
	var out = eng.newOutput ();
	
	if (eng.commandLine ()) {
	    out.addLine ("var pubjs = require ('pubjs').runtime;");
	    out.addLine ("function runPubJs (print, locals, diagnostics) {", 
			 lineno);
	    out.indent ();
	}

	out.addLine ("with (locals) {", lineno);
	out.indent ();
	var body = this._textZone.compile (eng);
	out.addOutput (body);
	out.unindent ();
	out.addLine ("}");

	if (eng.commandLine ()) {
	    out.unindent ();
	    out.addLine ("};");
	    out.addLine ("pubjs.runCommandLine (process.argv, runPubJs);", 0);
	}

	return out;
    };

    //-----------------------------------------------------------------------

    return that;
};

//-----------------------------------------------------------------------

var _iter_id = 0;

function makeForeach (startLine, endLine, text, body) {

    var buf = text.join ("\n");
    var rxx = new RegExp ("^\\s*\\(\\s*var\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s+in\\s+(.*)\\s*\\)\\s*");
    var m = buf.match (rxx);
    var out = "";
    if (!m) {
	throw new Error ("bad foreach expression");
    } 
    var id = m[1];
    var expr = m[2];
    var iter = "__pubjs_iter_" + _iter_id;
    _iter_id++;
    var txt = "for (var " + iter + " in " + expr + ") { ";
    txt += "var " + id + " = " + expr + "[" + iter + "]; ";

    ret = [ new Js (startLine, txt) ];
    
    if (body.isTextZone ()) {
	ret.push (body);
	ret.push (new Js (endLine, " } "));
    }
    return ret;
};


//-----------------------------------------------------------------------

exports.InlineJs = InlineJs;
exports.String = MyString;
exports.Js = Js;
exports.JsZone = JsZone;
exports.Text = Text;
exports.TextZone = TextZone;
exports.makeForeach = makeForeach;
exports.File = File;

