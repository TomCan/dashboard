/**
 * Created by Tom on 21/01/2016.
 */

$dashboard.screens['zabbix'].obj = {

    name: 'zabbix',
    settings: null,
    dashboard: null,
    interval: null,

    alertLevel: 0,

    init: function(settings) {

        this.dashboard = settings.dashboard;
        this.settings = settings;
        this.interval = setInterval(this.refresh.bind(this), 10000);

        // load the template
        var context = this;
        $.get('modules/zabbix/template.html').success(function(data) {
            $(context.settings.element).html(data);
        });

    },

    refresh: function() {

        console.log('Refresh zabbix');
        this.getActiveTriggers();

    },

    getActiveTriggers: function() {

        var context = this;
        $.getJSON('ajax.php/zabbix/getActiveTriggers').success(function(data) {

            console.log(data);

            active = [];
            inactive = [];
            for(var i = 0; i < data.result.length; i++) {
                if (data.result[i].hosts.length > 0) {

                    data.result[i].description = data.result[i].description.replace("{HOSTNAME}", data.result[i].hosts[0].name );
                    data.result[i].ago = Math.round(new Date().getTime() / 1000) - data.result[i].lastchange;

                    if (data.result[i].lastEvent.value == "1") {
                        active.push(data.result[i]);
                    } else {
                        inactive.push(data.result[i]);
                    }
                }
            }

            $('#activeTriggers').empty();
            $('#inactiveTriggers').empty();

            level = 0;
            for(var i = 0; i < active.length; i++) {
                if (parseInt(active[i].priority) > level) {
                    level = parseInt(active[i].priority);
                }

                row = $('#ZABBIX_templates .ZABBIX_triggerrow').html()
                    .replace("{ZABBIX_HOST}", active[i].hosts[0].name)
                    .replace("{ZABBIX_PRIO}", active[i].priority)
                    .replace("{ZABBIX_STATE}", '')
                    .replace("{ZABBIX_DESCRIPTION}", active[i].description)
                    .replace("{ZABBIX_AGO}", active[i].ago);

                $('#activeTriggers').append(row);

            }

            for(var i = 0; i < inactive.length; i++) {

                row = $('#ZABBIX_templates .ZABBIX_triggerrow').html()
                    .replace("{ZABBIX_HOST}", inactive[i].hosts[0].name)
                    .replace("{ZABBIX_PRIO}", inactive[i].priority)
                    .replace("{ZABBIX_STATE}", 'i')
                    .replace("{ZABBIX_DESCRIPTION}", inactive[i].description)
                    .replace("{ZABBIX_AGO}", inactive[i].ago);

                $('#inactiveTriggers').append(row);

            }

            context.dashboard.setAlert('zabbix', level);

        });

    }



};