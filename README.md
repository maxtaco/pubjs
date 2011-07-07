pubjs
=====
Yet another *node.js* templating system.

It differs from all others we've seen because it offer arbitrary nesting
of code and HTML output.  

Code Examples
-------------

```html
<html>
<body>
<table>
{% for (var i in foo) {
      var rec = foo[i];
      if (rec.cat) {{
      <tr>
        <td>%{rec.cat}</td>
        {% if (rec.dog) {{<td>woof <b>woof!</b></td>}} %}
      </tr>
      }}
   }
%}
</table>
```

We've also taken the liberty of adding a bona fide `foreach` to JavaScript:

```html
<table>
{% 
   foreach (var row in rows) {{
       <tr>
       {% 
           foreach (var col in row) {{
               <td>%{col}</td>
           }} 
        %}
        </tr>
    }}
%}
</table>
```
   

TODOS
-----
* make an express wrapper
* regtest suite
* documentation (flesh out this file)
