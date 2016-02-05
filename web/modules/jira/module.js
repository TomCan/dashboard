/**
 * Created by Tom on 21/01/2016.
 */

$dashboard.screens['jira'].obj = {

    name: 'jira',
    interval: null,

    init: function(settings) {

        this.settings = settings;

        this.interval = setInterval(this.refresh, 60000);
        this.refresh();

        // load the template
        $.get('modules/jira/template.html').success(function(data) {
            $($dashboard.screens['jira'].obj.settings.elem).html(data);
        });

    },

    refresh: function() {

        console.log('Refresh me');

    }

};