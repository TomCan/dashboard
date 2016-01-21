/**
 * Created by Tom on 21/01/2016.
 */

var $dashboard = {

    getScreenList: function() {

        $.ajax({
            url: "ajax.php/screens"
        })
        .done(function(data) {
                $dashboard.screens = data.screens;
                $.each($dashboard.screens, function(key, value) {
                    // value contains screen object
                    console.log(value);
                });
        });

    },
};



