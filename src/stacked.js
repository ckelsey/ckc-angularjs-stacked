'use strict'
angular.module('ckc-stacked',[])
.controller('StackedCtlr', ['StackedS', function (StackedS){
    var self = this;
    this.StackedS = StackedS;
}])
.service("StackedS", [function(){
    var self = {
        stacked_columns:[],
        update: function(new_stacks){
            angular.copy(new_stacks, self.stacked_columns);
            return self.stacked_columns;
        }
    };
    return self;
}])
.directive('stacked',['$timeout', '$compile', function($timeout, $compile){
    return {
        restrict:'A',
        scope: {
          ngModel: '='
        },
        controller:'StackedCtlr',
        controllerAs:'ctlr',
        templateUrl:function(a,b){if(b && b.hasOwnProperty('stackedTemplateUrl') && b.stackedTemplateUrl !== ''){ return b.stackedTemplateUrl;}else{return '/bower_components/ckc-angularjs-stacked/views/sample_stacked.html';}},
        link:function(scope,elm,attrs,ctlr){
            var stacked_items = scope.ngModel;
            var stacked_columns = [];

            if(!attrs.hasOwnProperty('stackedSort') || (attrs.hasOwnProperty('stackedSort') && attrs.stackedSort == '')){
                var stacked_sort = '$index';
            }else{
                var stacked_sort = attrs.stackedSort;
            }
            if(!attrs.hasOwnProperty('stackedSortDirection') || (attrs.hasOwnProperty('stackedSortDirection') && attrs.stackedSortDirection == '')){
                var stacked_sort_direction = 'desc';
            }else{
                var stacked_sort_direction = attrs.stackedSortDirection;
            }
            if(!attrs.hasOwnProperty('stackedMinWidth') || (attrs.hasOwnProperty('stackedMinWidth') && attrs.stackedMinWidth == '')){
                var stacked_min_width = 200;
            }else{
                var stacked_min_width = attrs.stackedMinWidth;
            }
            if(!attrs.hasOwnProperty('stackedMaxWidth') || (attrs.hasOwnProperty('stackedMaxWidth') && attrs.stackedMaxWidth == '')){
                var stacked_max_width = 400;
            }else{
                var stacked_max_width = attrs.stackedMaxWidth;
            }
            if(!attrs.hasOwnProperty('stackedSmart') || (attrs.hasOwnProperty('stackedSmart') && attrs.stackedMaxWidth == '')){
                var stacked_smart = false;
            }else{
                var stacked_smart = attrs.stackedSmart;
            }

            var items = null;

            var get_column_count = function(){
                return Math.floor(elm[0].offsetWidth / ((parseInt(stacked_max_width) + parseInt(stacked_min_width)) / 2));
            };

            var isDate = function(date) {
                return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
            }

            var sort_items = function(){
                var items_array = [];
                var sort = stacked_sort;
                var direction = stacked_sort_direction;
                if(typeof stacked_items == 'object'){
                    for(var p in stacked_items){
                        items_array.push(stacked_items[p]);
                    }
                }else{
                    for(var a=0;a<stacked_items.length;a++){
                        items_array.push(stacked_items[a]);
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
                if(stacked_items !== undefined){
                    items = sort_items();
                    var column_count = get_column_count();
                    stacked_columns = [];
                    var index = 0;
                    if(column_count == 0){
                        column_count = 1;
                    }
                    for(var i=0;i<column_count;i++){
                        stacked_columns.push([]);
                    }
                    for(var j=0;j<items.length;j++){
                        stacked_columns[index].push(items[j]);
                        if(index == (column_count - 1)){
                            index = 0;
                        }else if(index == 0){
                            index++;
                        }else{
                            index++;
                        }
                    }

                    $timeout(function(){
                        ctlr.StackedS.update(stacked_columns);
                        var cols = document.querySelectorAll('.stacked_column');
                        for(var k=0;k<cols.length;k++){
                            cols[k].style.width = (100 / column_count) + '%';
                        }
                    }, 100);
                }
            };

            attrs.$observe('stackedMaxWidth', function(value){
                if(!attrs.hasOwnProperty('stackedMaxWidth') || (attrs.hasOwnProperty('stackedMaxWidth') && attrs.stackedMaxWidth == '')){
                    stacked_max_width = 400;
                }else{
                    stacked_max_width = attrs.stackedMaxWidth;
                }
                stack();
            });

            attrs.$observe('stackedMinWidth', function(value){
                if(!attrs.hasOwnProperty('stackedMinWidth') || (attrs.hasOwnProperty('stackedMinWidth') && attrs.stackedMinWidth == '')){
                    stacked_min_width = 400;
                }else{
                    stacked_min_width = attrs.stackedMinWidth;
                }

                stack();
            });

            attrs.$observe('stackedSortDirection', function(value){
                if(!attrs.hasOwnProperty('stackedSortDirection') || (attrs.hasOwnProperty('stacked') && attrs.stackedSortDirection == '')){
                    stacked_sort_direction = 'desc';
                }else{
                    stacked_sort_direction = attrs.stackedSortDirection;
                }
                stack();
            });

            attrs.$observe('stackedSort', function(value){
                if(!attrs.hasOwnProperty('stackedSort') || (attrs.hasOwnProperty('stackedSort') && attrs.stackedSort == '')){
                    stacked_sort = 400;
                }else{
                    stacked_sort = attrs.stackedSort;
                }
                stack();
            });

            scope.$watch('ngModel', function(s){
                stacked_items = s;
                if(s !== null && s !== undefined){
                    var keys = Object.keys(stacked_items);
                    if(keys.length > 0){
                        stack();
                    }
                }
                return s;
            }, function(val){});

            var done_resizing = function(){ stack(); };
            var win_resizing;
            window.onresize = function(){
                clearTimeout(win_resizing);
                win_resizing = setTimeout(done_resizing, 100);
            };
            stack();
        }
    };
}])
;
