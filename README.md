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
      if (foo[i].cat) {{
      <tr>
        <td>%{foo[i].cat}</td>
        {% if (foo[i].dog) {{<td>woof <b>woof!</b></td>}} %}
      </tr>
      }}
   }
%}
</table>
```
   

