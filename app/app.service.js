angular.module('minecraftJsonApp').service('appService', function() {

    this.getMinecraftColors = function() {
        return colors;
    }

    this.getClickEvents = function() {
        return clickEvents;
    }

    this.getHoverEvents = function() {
        return hoverEvents;
    }

    const hoverEvents = [
        {
            name: 'None'
        },
        {
            name: 'Show Text',
            value: 'show_text'
        },
        {
            name: 'Show Item',
            value: 'show_item'
        },
        {
            name: 'Show Entity',
            value: 'show_entity'
        },
        {
            name: 'Show Achievement',
            value: 'show_achievement'
        }
    ];

    const clickEvents = [
        {
            name: 'None'
        },
        {
            name: 'Run Command',
            value: 'run_command'
        },
        {
            name: 'Suggest Command',
            value: 'suggest_command'
        },
        {
            name: 'Open URL',
            value: 'open_url'
        },
        {
            name: 'Change Page',
            value: 'change_page'
        }
    ];

    const colors = [
        {
            name: 'None'
        },
        {
            name: 'Black',
            value: 'black'
        },
        {
            name: 'Dark Blue',
            value: 'dark_blue'
        },
        {
            name: 'Dark Green',
            value: 'dark_green'
        },
        {
            name: 'Dark Aqua',
            value: 'dark_aqua'
        },
        {
            name: 'Dark Red',
            value: 'dark_red'
        },
        {
            name: 'Dark Purple',
            value: 'dark_purple'
        },
        {
            name: 'Gold',
            value: 'gold'
        },
        {
            name: 'Gray',
            value: 'gray'
        },
        {
            name: 'Dark Gray',
            value: 'dark_gray'
        },
        {
            name: 'Blue',
            value: 'blue'
        },
        {
            name: 'Green',
            value: 'green'
        },
        {
            name: 'Aqua',
            value: 'aqua'
        },
        {
            name: 'Red',
            value: 'red'
        },
        {
            name: 'Light Purple',
            value: 'light_purple'
        },
        {
            name: 'Yellow',
            value: 'yellow'
        },
        {
            name: 'White',
            value: 'white'
        },
        {
            name: 'Black',
            value: 'black'
        }
    ];

});