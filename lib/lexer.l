
%s JS_MODE Q1_MODE Q2_MODE JSI_MODE CC_MODE
%%


<INITIAL>"{%"          { this.begin ('JS_MODE'); return 'JS_OPEN'; }
<INITIAL>"}}"          { this.popState (); return 'TXT_CLOSE'; }
<INITIAL,Q1_MODE,Q2_MODE>"%{" { this.begin ('JSI_MODE'); return 'JSI_OPEN'; }
<INITIAL>[^{}%]+|[{}%] { return 'TXT'; }

<JS_MODE>"%}"          { this.popState (); return 'JS_CLOSE'; }
<JS_MODE>"{{"          { this.begin ('INITIAL'); return 'TXT_OPEN'; }
<JS_MODE>"\""          { this.begin ('Q2_MODE'); return 'Q2'; }
<JS_MODE>"'"           { this.begin ('Q1_MODE'); return 'Q1'; }
<JS_MODE>"/*"          { this.begin ('CC_MODE'); }
<JS_MODE>"//".*		/* skip over C++-style comments */
<JS_MODE>[^{%"'/]+|[{%"'/] { return 'JS'; }
<JS_MODE><<EOF>>       return 'ENDOFFILE';

<JSI_MODE>"{"          { this.begin ('JSI_MODE'); return 'LBRACE'; }
<JSI_MODE>"}"          { this.popState (); return 'RBRACE'; }
<JSI_MODE>[^{}]+       { return 'JSI'; }
<JSI_MODE><<EOF>>      return 'ENDOFFILE';

<Q2_MODE>"%{"           { this.begin ('JSI_MODE'); return 'JSI_OPEN'; }
<Q2_MODE>"\\".          return 'STRING';
<Q2_MODE>[^\\"]+	return 'STRING';
<Q2_MODE>"\""		{ this.popState (); return "QUOTE2"; }
<Q2_MODE><<EOF>>	return 'ENDOFFILE';

<Q1_MODE>"%{"           { this.begin ('JSI_MODE'); return 'JSI_OPEN'; }
<Q1_MODE>"\\".	        return 'STRING';
<Q1_MODE>[^\\']+	return 'STRING';
<Q1_MODE>"'"		{ this.popState (); return "QUOTE1"; }
<Q1_MODE><<EOF>>	return 'ENDOFFILE';

<CC_MODE>"*/"           { this.popState(); }
<CC_MODE>"*"		/* ignore */
<CC_MODE>[^*]+          /* ignore */
<CC_MODE><<EOF>>        return 'ENDOFFILE';
