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

    return that;
};

//-----------------------------------------------------------------------

function Js (startLine, code) {
    var that = new Node (startLine);
    that._code = [ code ];

    //-----------------------------------------

    that.pushJs = function (frag) {
	this._code.push (frag);
	return true;
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

    return that;
};

//-----------------------------------------------------------------------

function JsZone (startLine, blocks) {
    var that = new Node (startLine);
    that._blocks = blocks;

    //-----------------------------------------

    that.dump = function () {
	return { type : 'JsZone', code : dump_v (this._blocks) };
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

    that.dump = function () {
	return { type : 'Text', text : this.text () };
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
    return that;
};

//-----------------------------------------------------------------------

var _iter_id = 0;

function makeForeach (startLine, endLine, text) {

    var buf = text.join ("\n");
    var rxx = new RegExp ("^\\s*\\(\\s*var\\s+([a-zA-Z_][a-zA-Z0-9_]+)\\s+in\\s+(.*)\\s*\\)\\s*");
    var m = buf.match (rxx);
    var out = "";
    if (!m) {
	throw new Error ("bad foreach expression");
    } 
    var id = m[1];
    var expr = m[2];
    var iter = "__pubjs_iter_" + _iter_id;
    _iter_id++;
    var ret = "for (var " + iter + " in " + expr + ") { ";
    ret += "var " + id + " = " + expr + "[" + iter + "]; ";
    return new yy.Js (startLine, ret);
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

