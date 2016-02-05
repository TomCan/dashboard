/**
 * Created by Tom on 21/01/2016.
 */

$dashboard.screens['kayako'].obj = {

    name: 'kayako',
    interval: null,

    init: function(settings) {

        this.settings = settings;

        this.interval = setInterval(this.refresh, 60000);
        this.refresh();

        // load the template
        $.get('modules/kayako/template.html').success(function(data) {
            $($dashboard.screens['kayako'].obj.settings.elem).html(data);
        });

    },

    refresh: function() {

        console.log('Refresh me');

    }

};