/**
 * Created by Tom on 21/01/2016.
 */

var $dashboard = {

    screens: [],
    screenIds: [],
    activeScreen: 0,

    locked: false,

    firstInterval: null,
    screenInterval: null,

    init: function() {

        this.getScreenList();
        this.firstInterval = setInterval(this.showFirst.bind(this), 100);

    },

    showFirst: function() {
        if (this.screenIds.length > 0) {
            clearInterval(this.firstInterval);
            this.screenInterval = setInterval(this.nextScreen.bind(this), 7500);
            this.activateScreen();
        }
    },

    activateScreen: function() {

        screenName = this.screenIds[this.activeScreen];
        console.log(screenName);
        $('#dashboard_screen_' + screenName).removeClass('hidden');
        $('#dashboard_nav_' + screenName ).addClass('active');
        $('.dashboard_screen').not('#dashboard_screen_' + screenName).addClass('hidden');
        $('.dashboard_nav').not('#dashboard_nav_' + screenName).removeClass('active');

    },

    nextScreen: function() {

        if (this.locked) return;

        this.activeScreen++;
        if (this.activeScreen >= this.screenIds.length) this.activeScreen = 0;
        this.activateScreen();

    },

    getScreenList: function() {

        $.ajax({
            url: "ajax.php/screens",
            context: this
        })
        .done(function(data) {
                var this2 = this;
                $.each(data.screens, function(key, s) {
                    // value contains screen object

                    if (typeof this2.screens[s.type] === 'undefined' || this2.screens[s.type] === null) {
                        // add screen
                        this2.screens[s.type] = s;
                        this2.screenIds[this2.screenIds.length] = s.type;

                        $.getScript('modules/' + s.type + '/module.js', function() {
                            $('#dashboard_screens').append('<div class="dashboard_screen hidden" id="dashboard_screen_' + s.type + '"></div>');
                            $('#dashboard_nav').append('<div class="dashboard_nav" id="dashboard_nav_' + s.type + '">' + s.type + '</div>');
                            this2.screens[s.type].obj.init('dashboard_screen_' + s.type, $('#dashboard_screen_' + s.type));
                        });
                    }

                }) ;
        });

    },

};



