angular.module('minecraftJsonApp').component('minecraftJsonApp', {
    templateUrl: '/app/json/json.component.html',
    bindings: {
        view: '<',
        onUpdateOut: '&onUpdate'
    },
    controller: function($scope) {
        const $ctrl = this;

        $ctrl.values = [
            {
                text: 'Hello ',
                color: 'green'
            },
            {
                text: 'Darthmineboy ',
                color: 'aqua'
            },
            {
                text: 'and welcome children ',
                color: 'gold',
                extra: [
                    {
                        text: 'Mario & ',
                        color: 'green'
                    },
                    {
                        text: 'Borat'
                    }
                ]
            }
        ];

        $ctrl.onDelete = function(value) {
            $ctrl.values.splice($ctrl.values.indexOf(value), 1);
            $ctrl.onUpdate();
        }

        $ctrl.addValue = function(value) {
            $ctrl.values.push(angular.copy(value));
            angular.copy({}, value);
        }

        $ctrl.onUpdate = function() {
            // Broadcast to child components
            $scope.$broadcast('update-view');
            // Json
            const json = [""];
            angular.forEach($ctrl.values, function(e) {
                json.push(e);
            });
            $ctrl.json = json;
            $ctrl.onUpdateOut({json: json});
        }
    }
});