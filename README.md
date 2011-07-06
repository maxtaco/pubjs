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
   

TODOS
-----
* test foreach
* test deeper nesting
* make an express wrapper
* debug more the inplace output system
