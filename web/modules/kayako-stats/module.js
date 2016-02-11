/**
 * Created by Tom on 21/01/2016.
 */

$dashboard.screens['kayako-stats'].obj = {

    name: 'kayako-stats',
    interval: null,

    init: function(settings) {

        this.settings = settings;

        setTimeout(this.refresh.bind(this), 2000);
        this.interval = setInterval(this.refresh.bind(this), 60000);

        // load the template
        $.get('modules/kayako-stats/template.html').success(function(data) {
            $($dashboard.screens['kayako-stats'].obj.settings.element).html(data);
        });

    },

    refresh: function() {

        console.log('Refresh kayako-stats');

        $.getJSON('ajax.php/kayako/getStats').success(function(data) {

            $('.kayako_ticket_count_open').html(data.status.Open);
            $('.kayako_ticket_count_feedback').html(data.status.Feedback);
            $('.kayako_ticket_count_onhold').html(data.status['On hold']);
            $('.kayako_ticket_count_closed').html(data.status.Closed);

            users = Array();
            for (var user in data.user) {
                cnt = 0;
                if (data.user[user].Open) { cnt += data.user[user].Open; }
                if (data.user[user]['On hold']) { cnt += data.user[user]['On hold']; }
                if (data.user[user].Feedback) { cnt += data.user[user].Feedback; }
                users.push( { name: user, open: cnt } );
            }

            users.sort(function(a, b) {
                if (a.open > b.open) {
                    return -1;
                } else if (a.open < b.open) {
                    return 1;
                } else {
                    return 0;
                }
            });

            $('#kayako_by_members_members').empty();
            rank = 0;
            for (user in users) {

                if (users[user].open > 0) {

                    rank++;

                    row = $('#KAYAKO_OVERVIEW_templates .kayako_by_members_member').html()
                        .replace("{KAYAKO_NAME}", users[user].name)
                        .replace("{KAYAKO_COUNT}", users[user].open)
                        .replace("{KAYAKO_RANK}", rank);

                    $('#kayako_by_members_members').append(row);

                }

            }

        });


    },

    sortUnclosedTicketsByOwner: function(a, b) {

        openA = a.total;
        openB = b.total;
        if (a.Closed) { openA -= a.Closed; }
        if (b.Closed) { openB -= b.Closed; }

        if (openA > openB) {
            return -1;
        } else if (openA < openB) {
            return 1;
        } else {
            return 0;
        }

    }

};