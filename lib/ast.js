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

function InlineJs (startLine, code) {
    var that = new Node (startLine);
    that._code = code;
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
    that._elements = v;

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function Js (startLine, code) {
    var that = new Node (startLine);
    that._code = [ code ];

    //-----------------------------------------

    that.pushJs = function (frag) {
	that._code.push (frag);
	return true;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function JsZone (startLine, blocks) {
    var that = new Node (startLine);
    that._blocks = blocks;
    return that;
};

//-----------------------------------------------------------------------

function Text (startLine, text) {
    var that = new Node (startLine);
    that._text = [ text ];

    //-----------------------------------------

    that.pushText = function (text) {
	that._text.push (text);
	return true;
    };

    //-----------------------------------------

    return that;
};

//-----------------------------------------------------------------------

function TextZone (startLine, blocks) {
    var that = new Node (startLine);
    that._block = blocks;
    return that;
};

//-----------------------------------------------------------------------

exports.InlineJs = InlineJs;
exports.String = MyString;
exports.Js = Js;
exports.JsZone = JsZone;
exports.Text = Text;
exports.TextZone = TextZone;
