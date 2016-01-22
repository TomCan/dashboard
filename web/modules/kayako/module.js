/**
 * Created by Tom on 21/01/2016.
 */

$dashboard.screens['kayako'].obj = {

    name: 'kayako',
    id: null,
    interval: null,
    elem: null,

    init: function(id, elem) {

        console.log(this.name + ' init ' + id);

        this.id = id;
        this.elem = elem;

        this.interval = setInterval(this.refresh, 60000);
        this.refresh();

        // load the template
        $.get('modules/kayako/template.html').success(function(data) {
            $($dashboard.screens['kayako'].obj.elem).html(data);
        });

    },

    refresh: function() {

        console.log('Refresh me');

    }

};