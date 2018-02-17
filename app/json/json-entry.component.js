(function() {
    const unsetIfFalseProperties = ['bold', 'italic', 'underlined', 'strikethrough', 'obfuscated'];

    angular.module('minecraftJsonApp').component('minecraftJsonAppEntry', {
        templateUrl: '/app/json/json-entry.component.html',
        bindings: {
            value: '<',
            onUpdate: '&',
            onDelete: '&'
        },
        controller: function($scope, appService) {
            const $ctrl = this;

            $ctrl.colors = appService.getMinecraftColors();
            $ctrl.clickEvents = appService.getClickEvents();
            $ctrl.hoverEvents = appService.getHoverEvents();
            $ctrl.value = $ctrl.value || {};

            $ctrl.update = function() {
                if($ctrl.value.clickEvent && !$ctrl.value.clickEvent.action) {
                    $ctrl.value.clickEvent = undefined;
                }
                if($ctrl.value.hoverEvent && !$ctrl.value.hoverEvent.action) {
                    $ctrl.value.hoverEvent = undefined;
                }
                angular.forEach(unsetIfFalseProperties, function(property) {
                    unsetIfFalse($ctrl.value, property);
                });
                $ctrl.onUpdate({value: $ctrl.value});
            }

            $ctrl.onDeleteChild = function(value) {
                $ctrl.value.extra.splice($ctrl.value.extra.indexOf(value), 1);
                $ctrl.update();
            }

            var unsetIfFalse = function(o, property) {
                if(o[property] === false) {
                    o[property] = undefined;
                }
            }
        }
    });
})();