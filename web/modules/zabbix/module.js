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
                    .replace("{ZABBIX_AGO}", context.formatTime(parseInt(active[i].ago)));

                $('#activeTriggers').append(row);

            }

            for(var i = 0; i < inactive.length; i++) {

                row = $('#ZABBIX_templates .ZABBIX_triggerrow').html()
                    .replace("{ZABBIX_HOST}", inactive[i].hosts[0].name)
                    .replace("{ZABBIX_PRIO}", inactive[i].priority)
                    .replace("{ZABBIX_STATE}", 'i')
                    .replace("{ZABBIX_DESCRIPTION}", inactive[i].description)
                    .replace("{ZABBIX_AGO}", context.formatTime(parseInt(inactive[i].ago)));

                $('#inactiveTriggers').append(row);

            }

            context.dashboard.setAlert('zabbix', level);

        });

    },

    formatTime: function(seconds) {

        delta = seconds;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        var seconds = delta % 60;  // in theory the modulus is not required

        var formatted = "";
        if (days > 0) {
            formatted = days + "d " + hours + 'h ' + minutes + 'm';
        } else if (hours > 0) {
            formatted = hours + 'h ' + minutes + 'm ' + seconds + 's';
        } else if (minutes > 0) {
            formatted = minutes + 'm ' + seconds + 's';
        } else {
            formatted = seconds + 's';
        }
        return formatted;


    }



};