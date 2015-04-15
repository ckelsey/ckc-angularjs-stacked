'use strict'
angular.module('ckc-stacked',[])

.directive('stacked',['$timeout', '$window', function($timeout, $window){
	return {
		restrict:'A',
		templateUrl:function(a,b){if(b && b.hasOwnProperty('stackedTemplateUrl') && b.stackedTemplateUrl !== ''){ return b.stackedTemplateUrl;}else{return '/bower_components/ckc-angularjs-stacked/views/sample_stacked.html';}},
		scope:{
			stacked_items:'=stackedItems',
		},
		link:function(scope,elm,attrs){
			if(!attrs.hasOwnProperty('stackedSort') || (attrs.hasOwnProperty('stackedSort') && attrs.stackedSort == '')){
				scope.stacked_sort = '$index';
			}else{
				scope.stacked_sort = attrs.stackedSort;
			}
			if(!attrs.hasOwnProperty('stackedSortDirection') || (attrs.hasOwnProperty('stackedSortDirection') && attrs.stackedSortDirection == '')){
				scope.stacked_sort_direction = 'desc';
			}else{
				scope.stacked_sort_direction = attrs.stackedSortDirection;
			}
			if(!attrs.hasOwnProperty('stackedMinWidth') || (attrs.hasOwnProperty('stackedMinWidth') && attrs.stackedMinWidth == '')){
				scope.stacked_min_width = 200;
			}else{
				scope.stacked_min_width = attrs.stackedMinWidth;
			}
			if(!attrs.hasOwnProperty('stackedMaxWidth') || (attrs.hasOwnProperty('stackedMaxWidth') && attrs.stackedMaxWidth == '')){
				scope.stacked_max_width = 400;
			}else{
				scope.stacked_max_width = attrs.stackedMaxWidth;
			}
			if(!attrs.hasOwnProperty('stackedSmart') || (attrs.hasOwnProperty('stackedSmart') && attrs.stackedMaxWidth == '')){
				scope.stacked_smart = false;
			}else{
				scope.stacked_smart = attrs.stackedSmart;
			}

			var items = null;
			var column_count = 0;
			
			var get_column_count = function(){
				return Math.floor(elm.width() / ((parseInt(scope.stacked_max_width) + parseInt(scope.stacked_min_width)) / 2));
			};
			
			var isDate = function(date) {
				return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
			}
			
			var sort_items = function(){
				var items_array = [];
				var sort = scope.stacked_sort;
				var direction = scope.stacked_sort_direction;
				if(typeof scope.stacked_items == 'object'){
					for(var p in scope.stacked_items){
						items_array.push(scope.stacked_items[p]);
					}
				}else{
					for(var a=0;a<scope.stacked_items.length;a++){
						items_array.push(scope.stacked_items[a]);
					}
				}
				if(sort !== '$index'){
					items_array.sort(function (a, b) {
						if(a.hasOwnProperty(sort) && b.hasOwnProperty(sort)){
							var aA, bB;
							if(isDate(a[sort]) && isDate(b[sort])){
								aA = new Date(a[sort]);
								bB = new Date(b[sort]);
							}else if(!isNaN(parseInt(a[sort])) && !isNaN(parseInt(b[sort]))){
								aA = parseInt(a[sort]);
								bB = parseInt(b[sort]);
							}else if(typeof a[sort] == 'string' && typeof b[sort] == 'string'){
								aA = a[sort].split('')[0];
								bB = b[sort].split('')[0];
							}else{
								return 0;
							}

							if(direction == 'desc'){
								return (aA > bB ? 1 : -1);
							}else{
								return (aA < bB ? 1 : -1);
							}
						}else{
							return 0;
						}
					});
				}
				return items_array;
			};
			
			var stack = function(){
				if(scope.stacked_items){
					items = sort_items();
					column_count = get_column_count();
					scope.stacked_columns = [];
					var index = 0;
					if(column_count == 0){
						column_count = 1;
					}
					for(var i=0;i<column_count;i++){
						scope.stacked_columns.push([]);
					}
					for(var j=0;j<items.length;j++){
						scope.stacked_columns[index].push(items[j]);
						if(index == (column_count - 1)){
							index = 0;
						}else if(index == 0){
							index++;
						}else{
							index++;
						}
					}
				}
			};

			attrs.$observe('stackedMaxWidth', function(value){
				if(!attrs.hasOwnProperty('stackedMaxWidth') || (attrs.hasOwnProperty('stackedMaxWidth') && attrs.stackedMaxWidth == '')){
					scope.stacked_max_width = 400;
				}else{
					scope.stacked_max_width = attrs.stackedMaxWidth;
				}
				stack();
			});
			
			attrs.$observe('stackedMinWidth', function(value){
				if(!attrs.hasOwnProperty('stackedMinWidth') || (attrs.hasOwnProperty('stackedMinWidth') && attrs.stackedMinWidth == '')){
					scope.stacked_min_width = 400;
				}else{
					scope.stacked_min_width = attrs.stackedMinWidth;
				}

				stack();
			});
			
			attrs.$observe('stackedSortDirection', function(value){
				if(!attrs.hasOwnProperty('stackedSortDirection') || (attrs.hasOwnProperty('stacked') && attrs.stackedSortDirection == '')){
					scope.stacked_sort_direction = 'desc';
				}else{
					scope.stacked_sort_direction = attrs.stackedSortDirection;
				}
				stack();
			});
			
			attrs.$observe('stackedSort', function(value){
				if(!attrs.hasOwnProperty('stackedSort') || (attrs.hasOwnProperty('stackedSort') && attrs.stackedSort == '')){
					scope.stacked_sort = 400;
				}else{
					scope.stacked_sort = attrs.stackedSort;
				}
				stack();
			});
			
			scope.$watch(
				function(){
					return elm.width();
				},
				function(newVal){
					if(newVal){
						stack();
					}
				},true
			);
			
			stack();
		}
	};
}])
;
