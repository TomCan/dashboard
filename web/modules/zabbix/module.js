/**
 * Created by Tom on 21/01/2016.
 */

$dashboard.screens['zabbix'].obj = {

    name: 'zabbix',
    dashboard: null,
    settings: null,
    interval: null,

    username: null,
    password: null,
    url: null,

    alertLevel: 0,

    init: function(settings) {

        this.settings = settings;
        this.dashboard = settings.dashboard;
        this.interval = setInterval(this.refresh.bind(this), 10000);

        // load the config
        var context = this;
        $.ajax({ url: 'zabbix.json', dataType: 'json'}).done(function(data) {
            context.url = data.url;
            context.username = data.username;
            context.password = data.password;
            context.refresh();
        });

        // load the template
        $.get('modules/zabbix/template.html').success(function(data) {
            $(context.settings.elem).html(data);
        });

    },

    refresh: function() {

        console.log('Refresh zabbix');
        this.doZabbixLogin();

    },

    doZabbixLogin: function() {
        command = {
            jsonrpc: "2.0",
            method: "user.login",
            id: 1,
            params: {
                user: this.username,
                password: this.password
            }
        }
        this.doZabbixRequest(command, this);
    },

    doZabbixRequest: function(command, context) {

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: context.url + '/api_jsonrpc.php',
            data: command,
        }).done(function(data) {
            context.processZabbixData(command, data);
        });

    },

    processZabbixData: function(command, data) {
//        console.log(command);
        console.log('ZAB');
        console.log(data);
    }



};