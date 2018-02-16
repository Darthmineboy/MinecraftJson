angular.module('app').component('appJsonEntry', {
    templateUrl: 'app/json/json-entry.component.html',
    bindings: {
        value: '<',
        onUpdate: '&'
    },
    controller: function($scope, appService) {
        const $ctrl = this;

        $ctrl.colors = appService.getMinecraftColors();
        $ctrl.value = $ctrl.value || {};

        $ctrl.update = function() {
            $ctrl.onUpdate({value: $ctrl.value});
        }
    }
});