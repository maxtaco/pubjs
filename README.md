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
        <td>%{foo[i].cat}<td>
      </tr>{%  if (foo[i].dog) {{ woof <b>woof!</b> }} %}
      }}
   }
%}
</table>
```
   

