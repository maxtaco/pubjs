pubjs
=====
Yet another *node.js* templating system.

It differs from all others we've seen because it offer arbitrary nesting
of code and HTML output.  

Tutorial and Code Examples
-------------------------

By default, input is in HTML mode, in which all input data is
passed through as output data, with the exception of expressions
of the form `%{foo}`, which are first evaluated by JavaScript, and
then output:

```html
<b>Name</b>: %{name}<br/>
<b>Passion</b>: %{passion}<br/>
```

However you can switch from HTML mode into JavaScript mode, with the
`{% .. %}` environment.  Inside a JavaScript environment, use normal
JavaScript, and also the function `print` to output HTML:

```html
<b>Name</b>: %{name}<br/>
{% if (pet) { print ("<b>Pet</b>: ", pet); } 
   else     { print ("<i>no pets</i>"); } %}</br>
<b>Passion</b>: %{passion}<br/>
```

You can also switch back to HTML mode from within JavaScript mode, with
any block of the form `{{..}}`.  An equivalent way to write the above is:

```html
<b>Name</b>: %{name}<br/>
{% if (pet) {{<b>Pet</b>: %{pet} }}
   else     {{<i>No pets!</i>}} %}</br>
<b>Passion</b>: %{passion}<br/>
```

And as advertised, you are free to go as deeply nested as you please:

```html
<b>Name</b>: %{name}<br/>
{% if (pet) {{
    <b>Pet</b>:
    {% if (pet.type == "dog") {{
           Goes woof! (and is
           {% if (pet.sex == "M") {{neutered}}
              else                {{spayed}}
           %}
           so doesn't reproduce)
       }} else if (pet.type == "cat") {{
            Goes meow!
       }}
    %}
}} else {{<i>no pet!</i>}} %}
```

We've also taken the liberty of adding a bona fide `foreach` to JavaScript,
for simplified iteration:

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
