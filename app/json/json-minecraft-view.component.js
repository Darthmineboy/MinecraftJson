angular.module('app').component('appJsonMinecraftView', {
    templateUrl: '/app/json/json-minecraft-view.component.html',
    bindings: {
        _value: '=value'
    },
    controller: function($scope, $interval) {
        const $ctrl = this;

        var timer = $interval(function() {
            obfuscate($ctrl.values);
        }, 100);

        $scope.$on('$destroy', function() {
            $interval.cancel(timer);
        });

        $scope.$on('update-view', function() {
            build();
        });

        this.$onInit = function() {
            build();
        };

        var obfuscate = function(values) {
            angular.forEach(values, function(value) {
                console.log(value);
                if(value.obfuscated && value.text) {
                    value.text = randomString(value.text.length);
                }
            });
        }

        function randomString(len, charSet) {
            charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz,randomPoz+1);
            }
            return randomString;
        }

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
                value.styles = {};
                if(value.bold) {
                    value.styles['font-weight'] = 'bold';
                }
                if(value.italic) {
                    value.styles['font-style'] = 'italic';
                }
                var textDecoration;
                if(value.strikethrough && value.underlined) {
                    textDecoration = 'underline line-through'
                }else if(value.strikethrough) {
                    textDecoration = 'line-through'
                }else if(value.underlined) {
                    textDecoration = 'underline'
                }
                if(textDecoration) {
                    value.styles['text-decoration'] = textDecoration;
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