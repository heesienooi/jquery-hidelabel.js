jquery-hidelabel.js
===================


###.hidelabel( [callback(element)] )

`.hidelabel()`has a optional *callback* function that return the label element or value. If a *callback* function has pass to `.hidelabel()`, it will used the return as it's hidden label. Otherwise, it will look for `label` that has `for` that matched with the input `id`.

Check out the demo.html to see a live example.


#### Usage

```javascript
$('input').hidelabel();
```

OR

```javascript
$('input').hidelabel(function(element) {
	var $this = $(this),
		$label = $this.prev();
	return $label;
})
```
OR

```javascript
$('input').hidelabel(function() {
	var $this = $(this),
		text = $this.prev().text();
	return text;
})
```

#### Styles

```css
.hidden-label {
	position: absolute;
	display: block;
	width: auto;
	padding: 4px 8px;
	margin: 0;
	color: inherit;
	cursor: text;
	pointer-events: none;

	-webkit-transition: color 0.2s linear 0s;
	-moz-transition: color 0.2s linear 0s;
	-o-transition: color 0.2s linear 0s;
	-ms-transition: color 0.2s linear 0s;
	transition: color 0.2s linear 0s;
}

.hidden-label.el-focused {
	color: #ccc;
}

.hidden-label.el-populated {
	display: none;
}
```
