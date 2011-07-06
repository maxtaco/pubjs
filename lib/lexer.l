
%s JS_MODE Q1_MODE Q2_MODE IJS_MODE IJS2_MODE CC_MODE FOREACH_MODE
%%


<INITIAL>"{%"          { this.begin ('JS_MODE'); return 'JS_OPEN'; }
<INITIAL>"}}"          { this.popState (); return 'TEXT_CLOSE'; }
<INITIAL>"%{"          { this.begin ('IJS_MODE'); return 'IJS_OPEN'; }
<INITIAL>[^{}%]+|[{}%] { return 'TEXT'; }

<JS_MODE>"%}"          { this.popState (); return 'JS_CLOSE'; }
<JS_MODE>"{{"          { this.begin ('INITIAL'); return 'TEXT_OPEN'; }
<JS_MODE>"\""          { this.begin ('Q2_MODE'); return 'QUOTE2'; }
<JS_MODE>"'"           { this.begin ('Q1_MODE'); return 'QUOTE1'; }
<JS_MODE>"/*"          { this.begin ('CC_MODE'); }
<JS_MODE>"//".*		/* skip over C++-style comments */
<JS_MODE><<EOF>>       return 'ENDOFFILE';
<JS_MODE>"foreach"     { this.begin ('FOREACH_MODE'); return 'FOREACH'; }
<JS_MODE>[^{(%"'/f]+   { return 'JS'; }
<JS_MODE>[{(%"'/f]     { return 'JS'; }

<FOREACH_MODE>[^{]+    { return 'TEXT'; }
<FOREACH_MODE>[{]      { this.popState (); return 'LBRACE'; }

<IJS_MODE>"{"          { this.begin ('IJS2_MODE'); return 'IJS'; }
<IJS_MODE>"}"          { this.popState (); return 'IJS_CLOSE'; }
<IJS2_MODE>"}"         { this.popState (); return 'IJS'; }
<IJS2_MODE,IJS_MODE>[^{}]+   { return 'IJS'; }
<IJS2_MODE,IJS_MODE><<EOF>>  return 'ENDOFFILE';

<Q2_MODE>"\\".          return 'STRING';
<Q2_MODE>[^\\"]+	return 'STRING';
<Q2_MODE>"\""		{ this.popState (); return "QUOTE2"; }
<Q2_MODE><<EOF>>	return 'ENDOFFILE';

<Q1_MODE>"\\".	        return 'STRING';
<Q1_MODE>[^\\']+	return 'STRING';
<Q1_MODE>"'"		{ this.popState (); return "QUOTE1"; }
<Q1_MODE><<EOF>>	return 'ENDOFFILE';

<CC_MODE>"*/"           { this.popState(); }
<CC_MODE>"*"		/* ignore */
<CC_MODE>[^*]+          /* ignore */
<CC_MODE><<EOF>>        return 'ENDOFFILE';
