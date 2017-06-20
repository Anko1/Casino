const MyCasino =  new Casino(12, 270);

$(function () {
   //window.casino = new Casino(12, 270);
    $('#sm-info-wrapper').hide();


    $.notify.addStyle('black', {
        html: "<div><span data-notify-text/></div>",
        classes: {
            base: {
                "white-space": "nowrap",
                "background-color": "green",
                "padding": "5px"
            },
            black: {
                "color": "black",
                "background-color": "blue"
            }
        }
    });

});
