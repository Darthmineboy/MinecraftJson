angular.module('app').component('appJsonMinecraftView', {
    templateUrl: '/app/json/json-minecraft-view.component.html',
    bindings: {
        _value: '=value'
    },
    controller: function($scope) {
        const $ctrl = this;

        $scope.$on('update-view', function() {
            build();
        });

        this.$onInit = function() {
            build();
        };

        var traverse = function(values, parent) {
            var _values = [];
            if(!values) {
                return;
            }
            angular.forEach(values, function(value) {
                if(parent){
                    value = angular.extend({}, parent, value);
                    if(value.extra === parent.extra) {
                        value.extra = undefined;
                    }
                }
                _values.push(value);
                angular.forEach(traverse(value.extra, value), function(e) {
                    _values.push(e);
                });
            });
            return _values;
        }

        var build = function() {
            var values = angular.copy($ctrl._value);
            values = traverse(values);
            $ctrl.values = values;
        }
    }
});