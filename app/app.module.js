angular.module('minecraftJsonApp', [])
    .controller('minecraftJsonAppController', function($scope) {
        const $ctrl = this;

        $ctrl.onUpdate = function(json) {
            console.log(`onUpdate`);
        }
    });