# ckc-angularjs-stacked
An Angularjs module for simple masonry grid layout

###Example
####HTML
```html
<form ng-init="staCKed={'min_width':200, 'max_width':400, 'sort_key':'number', 'sort_direction':'desc'}">
	<div class="form-group">
		<label>Minimum width</label>
		<input class="form-control" ng-model="staCKed.min_width" type="text" style="display:block;" />
	</div>
	<div class="form-group">
		<label>Maximum width</label>
		<input class="form-control" ng-model="staCKed.max_width" type="text" style="display:block;" />
	</div>
	<div class="form-group">
		<label>Sort key</label>
		<input class="form-control" ng-model="staCKed.sort_key" type="text" style="display:block;" />
	</div>
	<div class="form-group">
		<label>Sort direction</label>
		<input class="form-control" ng-model="staCKed.sort_direction" type="text" style="display:block;" />
	</div>
	<br />
</form>
<div stacked stacked-items="app.items_to_stack" stacked-template-url="/bower_components/ckc-angularjs-stacked/views/sample_stacked.html" stacked-min-width="{{staCKed.min_width}}" stacked-max-width="{{staCKed.max_width}}" stacked-sort="{{staCKed.sort_key}}" stacked-sort-direction="{{staCKed.sort_direction}}"></div>
```
####Javascript
```javascript
angular.module('st4rtApp',[
	'ckc-stacked'
]);
```

###Options
All options are defined in the HTML markup
* ___stacked-items___ - The items to stack.
* ___stacked-template-url___ - A URL to a template file.
* ___stacked-min-width___ - The smallest you want the columns to be.
* ___stacked-max-width___ - The largest you want the columns to be.
* ___stacked-sort___ - The key in which to sort the items. Can be a string, date, or integer.
* ___stacked-sort-direction___ - The direction to sort the items.

###Use
* ___Bower___ - ckc-angularjs-stacked
* Add "ckc-stacked" to your app's dependencies
* Add "flash_message" to your app's controller dependencies
* Add "stacked.min.js" and optionally "stacked.min.css" to your scripts/css
* Add "stacked" attribute to your container markup
