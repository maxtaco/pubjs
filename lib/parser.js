/* Jison generated parser */
var parser = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"File":3,"TextZoneInner":4,"TextBlocks":5,"TextZone":6,"TEXT_OPEN":7,"TEXT_CLOSE":8,"Text":9,"TEXT":10,"TextBlock":11,"InlineJs":12,"JsZone":13,"JS_OPEN":14,"JsZoneInner":15,"JS_CLOSE":16,"JsBlocks":17,"Js":18,"JS":19,"JsBlock":20,"Foreach":21,"FOREACH":22,"ForeachText":23,"LBRACE":24,"String":25,"String1":26,"String2":27,"QUOTE1":28,"StringAtoms":29,"QUOTE2":30,"StringAtom":31,"STRING":32,"IJS_OPEN":33,"InlineJsAtoms":34,"IJS_CLOSE":35,"InlineJsAtom":36,"IJS":37,"$accept":0,"$end":1},
terminals_: {2:"error",7:"TEXT_OPEN",8:"TEXT_CLOSE",10:"TEXT",14:"JS_OPEN",16:"JS_CLOSE",19:"JS",22:"FOREACH",24:"LBRACE",28:"QUOTE1",30:"QUOTE2",32:"STRING",33:"IJS_OPEN",35:"IJS_CLOSE",37:"IJS"},
productions_: [0,[3,1],[4,1],[6,3],[9,1],[5,0],[5,2],[5,2],[11,1],[11,1],[13,3],[15,1],[18,1],[17,0],[17,2],[17,2],[21,3],[23,1],[23,2],[20,1],[20,1],[20,1],[25,1],[25,1],[26,3],[27,3],[29,0],[29,2],[31,1],[31,1],[12,3],[34,0],[34,2],[36,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1:
        this.$ = new yy.File (_$[$0].first_line, $$[$0]);
    
break;
case 2:
        this.$ = new yy.TextZone (_$[$0].first_line, $$[$0]);
    
break;
case 3:
        this.$ = $$[$0-1];
    
break;
case 4: this.$ = yytext; 
break;
case 5: this.$ = []; 
break;
case 6:
        this.$.push ($$[$0-1]);
    
break;
case 7:
        var v = $$[$0-1];
        // Squish blocks of text together if possible
        if (!v.length || !v[v.length - 1].pushText ($$[$0])) {
            v.push (new yy.Text (_$[$0-1].first_line, $$[$0]));
        }
    
break;
case 10:
        this.$ = $$[$0-1];
    
break;
case 11:
       this.$ = yy.JsZone (_$[$0].first_line, $$[$0]);
    
break;
case 12: this.$ = yytext; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14:
       var v = $$[$0-1];
       if (!v.length || !v[v.length - 1].pushJs ($$[$0])) {
          v.push (new yy.Js (_$[$0-1].first_line, $$[$0-1]));
       }
    
break;
case 15:
       this.$.push ($$[$0-1]);
    
break;
case 16:
       this.$ = yy.makeForeach (_$[$0-2].first_line, _$[$0].first_line, $$[$0-1]);
    
break;
case 17: this.$ = [ $$[$0] ]; 
break;
case 18: $$[$0-1].push ($$[$0]); this.$ = $$[$0-1]; 
break;
case 24:
        this.$ = new yy.String (_$[$0-2].first_line, $$[$0-1], "'");
    
break;
case 25:
        this.$ = new yy.String (_$[$0-2].first_line, $$[$0-1], "\"");
    
break;
case 26: this.$ = []; 
break;
case 27:
       this.$.push ($$[$0-1]);
    
break;
case 28: this.$ = yytext; 
break;
case 29: this.$ = $$[$0]; 
break;
case 30:
       this.$ = new yy.InlineJs (_$[$0-2].first_line, $$[$0-1].join (""));
    
break;
case 31: this.$ = []; 
break;
case 32:
        this.$.push ($$[$0-1]);
    
break;
case 33: this.$ = yytext; 
break;
}
},
table: [{1:[2,5],3:1,4:2,5:3,10:[2,5],14:[2,5],33:[2,5]},{1:[3]},{1:[2,1]},{1:[2,2],8:[2,2],9:5,10:[1,8],11:4,12:6,13:7,14:[1,10],33:[1,9]},{1:[2,6],8:[2,6],10:[2,6],14:[2,6],33:[2,6]},{1:[2,7],8:[2,7],10:[2,7],14:[2,7],33:[2,7]},{1:[2,8],8:[2,8],10:[2,8],14:[2,8],33:[2,8]},{1:[2,9],8:[2,9],10:[2,9],14:[2,9],33:[2,9]},{1:[2,4],8:[2,4],10:[2,4],14:[2,4],33:[2,4]},{34:11,35:[2,31],37:[2,31]},{7:[2,13],15:12,16:[2,13],17:13,19:[2,13],22:[2,13],28:[2,13],30:[2,13]},{35:[1,14],36:15,37:[1,16]},{16:[1,17]},{6:22,7:[1,26],16:[2,11],18:18,19:[1,20],20:19,21:23,22:[1,27],25:21,26:24,27:25,28:[1,28],30:[1,29]},{1:[2,30],8:[2,30],10:[2,30],14:[2,30],28:[2,30],30:[2,30],32:[2,30],33:[2,30]},{35:[2,32],37:[2,32]},{35:[2,33],37:[2,33]},{1:[2,10],8:[2,10],10:[2,10],14:[2,10],33:[2,10]},{7:[2,14],16:[2,14],19:[2,14],22:[2,14],28:[2,14],30:[2,14]},{7:[2,15],16:[2,15],19:[2,15],22:[2,15],28:[2,15],30:[2,15]},{7:[2,12],16:[2,12],19:[2,12],22:[2,12],28:[2,12],30:[2,12]},{7:[2,19],16:[2,19],19:[2,19],22:[2,19],28:[2,19],30:[2,19]},{7:[2,20],16:[2,20],19:[2,20],22:[2,20],28:[2,20],30:[2,20]},{7:[2,21],16:[2,21],19:[2,21],22:[2,21],28:[2,21],30:[2,21]},{7:[2,22],16:[2,22],19:[2,22],22:[2,22],28:[2,22],30:[2,22]},{7:[2,23],16:[2,23],19:[2,23],22:[2,23],28:[2,23],30:[2,23]},{4:30,5:3,8:[2,5],10:[2,5],14:[2,5],33:[2,5]},{10:[1,32],23:31},{28:[2,26],29:33,32:[2,26],33:[2,26]},{29:34,30:[2,26],32:[2,26],33:[2,26]},{8:[1,35]},{10:[1,37],24:[1,36]},{10:[2,17],24:[2,17]},{12:41,28:[1,38],31:39,32:[1,40],33:[1,9]},{12:41,30:[1,42],31:39,32:[1,40],33:[1,9]},{7:[2,3],16:[2,3],19:[2,3],22:[2,3],28:[2,3],30:[2,3]},{7:[2,16],16:[2,16],19:[2,16],22:[2,16],28:[2,16],30:[2,16]},{10:[2,18],24:[2,18]},{7:[2,24],16:[2,24],19:[2,24],22:[2,24],28:[2,24],30:[2,24]},{28:[2,27],30:[2,27],32:[2,27],33:[2,27]},{28:[2,28],30:[2,28],32:[2,28],33:[2,28]},{28:[2,29],30:[2,29],32:[2,29],33:[2,29]},{7:[2,25],16:[2,25],19:[2,25],22:[2,25],28:[2,25],30:[2,25]}],
defaultActions: {2:[2,1]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    };

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+'\nExpecting '+expected.join(', ');
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0: this.begin ('JS_MODE'); return 14; 
break;
case 1: this.popState (); return 8; 
break;
case 2: this.begin ('IJS_MODE'); return 33; 
break;
case 3: return 10; 
break;
case 4: this.popState (); return 16; 
break;
case 5: this.begin ('INITIAL'); return 7; 
break;
case 6: this.begin ('Q2_MODE'); return 'Q2'; 
break;
case 7: this.begin ('Q1_MODE'); return 'Q1'; 
break;
case 8: this.begin ('CC_MODE'); 
break;
case 9:/* skip over C++-style comments */
break;
case 10:return 'ENDOFFILE';
break;
case 11: this.begin ('FOREACH_MODE'); return 22; 
break;
case 12: return 19; 
break;
case 13: return 19; 
break;
case 14: return 10; 
break;
case 15: this.popState (); return 24; 
break;
case 16: this.begin ('IJS2_MODE'); return 37; 
break;
case 17: this.popState (); return 35; 
break;
case 18: this.popState (); return 37; 
break;
case 19: return 37; 
break;
case 20:return 'ENDOFFILE';
break;
case 21: this.begin ('IJS_MODE'); return 33; 
break;
case 22:return 32;
break;
case 23:return 32;
break;
case 24: this.popState (); return "QUOTE2"; 
break;
case 25:return 'ENDOFFILE';
break;
case 26: this.begin ('IJS_MODE'); return 33; 
break;
case 27:return 32;
break;
case 28:return 32;
break;
case 29: this.popState (); return "QUOTE1"; 
break;
case 30:return 'ENDOFFILE';
break;
case 31: this.popState(); 
break;
case 32:/* ignore */
break;
case 33:/* ignore */
break;
case 34:return 'ENDOFFILE';
break;
}
};
lexer.rules = [/^\{%/,/^\}\}/,/^%\{/,/^[^{}%]+|[{}%]/,/^%\}/,/^\{\{/,/^"/,/^'/,/^\/\*/,/^\/\/.*/,/^$/,/^foreach\b/,/^[^{(%"'/f]+/,/^[{(%"'/f]/,/^[^{]+/,/^[{]/,/^\{/,/^\}/,/^\}/,/^[^{}]+/,/^$/,/^%\{/,/^\\./,/^[^\\"]+/,/^"/,/^$/,/^%\{/,/^\\./,/^[^\\']+/,/^'/,/^$/,/^\*\//,/^\*/,/^[^*]+/,/^$/];
lexer.conditions = {"JS_MODE":{"rules":[4,5,6,7,8,9,10,11,12,13],"inclusive":true},"Q1_MODE":{"rules":[2,26,27,28,29,30],"inclusive":true},"Q2_MODE":{"rules":[2,21,22,23,24,25],"inclusive":true},"IJS_MODE":{"rules":[16,17,19,20],"inclusive":true},"IJS2_MODE":{"rules":[18,19,20],"inclusive":true},"CC_MODE":{"rules":[31,32,33,34],"inclusive":true},"FOREACH_MODE":{"rules":[14,15],"inclusive":true},"INITIAL":{"rules":[0,1,2,3],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}