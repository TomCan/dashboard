/**
 * Created by Tom on 21/01/2016.
 */

$dashboard.screens['jira'].obj = {

    name: 'jira',
    id: null,
    elem: null,
    interval: null,

    init: function(id, elem) {

        this.id = id;
        this.elem = elem;
        this.interval = setInterval(this.refresh, 60000);
        this.refresh();

        // load the template
        $.get('modules/jira/template.html').success(function(data) {
            $($dashboard.screens['jira'].obj.elem).html(data);
        });

    },

    refresh: function() {

        console.log('Refresh me');

    }

};