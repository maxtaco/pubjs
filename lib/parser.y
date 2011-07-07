
/* description: the parser definition for pubjs 
 *
 * To build:
 *  % jison parser.y lexer.l
 *
 * Author: Max Krohn <max@okcupid.com>
 *
 */

%start File

%% 

File
    : TextZoneInner 
    {
	yy.output = new yy.File (@1.first_line, $1);
    }
    ;

TextZoneInner
    : TextBlocks
    {
        $$ = new yy.TextZone (@1.first_line, $1);
    }
    ;

TextZone
    : TEXT_OPEN TextZoneInner TEXT_CLOSE
    {
        $$ = $2;
    }
    ;

Text 
    : TEXT { $$ = yytext; }
    ;

TextBlocks
    : { $$ = []; }
    | TextBlocks TextBlock
    {
        $1.push ($2);
        $$ = $1;
    }
    | TextBlocks Text
    {
        var v = $1;
        // Squish blocks of text together if possible
        if (!v.length || !v[v.length - 1].pushText ($2)) {
            v.push (new yy.Text (@2.first_line, $2));
        }
        $$ = v;
    }
    ;

TextBlock
    : InlineJs
    | JsZone
    ;

JsZone
    : JS_OPEN JsZoneInner JS_CLOSE
    {
        $$ = $2;
    }
    ;

JsZoneInner
    : JsBlocks 
    {
       $$ = yy.JsZone (@1.first_line, $1);
    }
    ;

Js
    : JS { $$ = yytext; }
    ;

JsBlocks
    : { $$ = []; }
    | JsBlocks JsBlock
    {
       $$ = $1.concat ($2);
    }
    ;

Foreach
    : FOREACH ForeachText ForeachZone
    {
       $$ = yy.makeForeach (@1.first_line, @3.last_line, $2, $3);
    }
    ;

ForeachZone
    : TextZone { $$ = $1; }
    | LBRACE { $$ = new yy.Js (@1.first_line, yytext); }
    ;


ForeachText
    : TEXT { $$ = [ $1 ]; }
    | ForeachText TEXT { $1.push ($2); $$ = $1; }
    ;

JsBlock
    : String   { $$ = [ $1 ]; }
    | TextZone 
    { 
        $$ = [ new yy.Js (@1.first_line, " { "), 
	       $1, 
               new yy.Js (@1.last_line, " } ") 
             ];
    }
    | Foreach { $$ = $1; }
    | Js      { $$ = [ new yy.Js (@1.last_line, $1) ]; }
    ;

String
    : String1
    | String2
    ;

String1
    : QUOTE1 StringAtoms QUOTE1
    {
        $$ = new yy.String (@1.first_line, $2, "'");
    }
    ;

String2
    : QUOTE2 StringAtoms QUOTE2
    {
        $$ = new yy.String (@1.first_line, $2, "\"");
    }
    ;
	

StringAtoms
    : { $$ = []; }
    | StringAtoms StringAtom
    {
       $1.push ($2);
       $$ = $1;
    }
    ;

StringAtom
    : STRING   { $$ = yytext; }
    | InlineJs { $$ = $1; }
    ;

InlineJs
    : IJS_OPEN InlineJsAtoms IJS_CLOSE
    {
       $$ = new yy.InlineJs (@1.first_line, $2.join (""));
    }
    ;

InlineJsAtoms
    : { $$ = []; }
    | InlineJsAtoms InlineJsAtom
    {
        $1.push ($2);
	$$ = $1;
    }
    ;

InlineJsAtom
    : IJS { $$ = yytext; }
    ;

