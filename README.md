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

Usage
-----

To install:

    npm install -g pubjs

To use in express:

```javascript

// Regigster the handler...
app.register ('.pjs', require ('pubjs'));

// Then invoke it as needs be...
app.get('/', function(req, res){
  res.render('index.pjs', {
    title: 'Express'
  });
});
```
   

TODOS
-----
* regtest suite
* documentation (flesh out this file)
