angular.module('app').component('appJson', {
    templateUrl: 'app/json/json.component.html',
    controller: function() {
        const $ctrl = this;

        $ctrl.values = [{}];

        $ctrl.addValue = function(value) {
            $ctrl.values.push(angular.copy(value));
            angular.copy({}, value);
        }
    }
});