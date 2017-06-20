function SlotMachine(money) {
    var id;
    var money = money;
    var isLucky = null;
    var model = null;

    this.setId = function (i) {
        id = i;
    };
    this.getId = function () {
        return id;
    };
    this.isLucky = function (val){
        isLucky = val;
    };
    this.getMoney = function () {
        return money;
    };
    this.getModel = function () {
        return model;
    };
    this.getCash = function (value) {
        _getCash(value);
    };

    function _getCash(value, show = false) {
        value = parseInt(value);

        if (money - value >= 0) {
            money -= value;

            model.find('.cash').text(money);

            console.log(money);

            return value;
        }

        if(show) $.notify("Not enough money", "error");
    }

    this.putCash = function (value) {
        _putCash(value);
    };

    function _putCash(value, show = false) {
        value = parseInt(value);
        money += value;

        model.find('.cash').text(money);

        if(show) $.notify("Money has been added", "success");
    }

    function play(bet) {
        _putCash(bet);

        var spin = Math.floor((Math.random() * 900) + 100);
        if(isLucky) spin = 777;
        // alert(isLucky);

        var msg = {spin: spin, win: bet};

        var coef = checkRandom(spin);
        // console.log(coef);

        if (coef >= 0) {
            msg.win = msg.win * coef;
        }
        else {
            msg.win = money;
        }
        // console.log(msg.win);
        _putCash(-msg.win);

        MyCasino.updateInfo();
        //window.casino.updateInfo();

        return msg;
    }

    function checkRandom(val) {
        // alert(val);
        var digits = ("" + val).split("");
        var coef = 0;

        if (digits[0] == digits[1] || digits[0] == digits[2] || digits[1] == digits[2]) coef = 2;
        if (digits[0] == digits[1] && digits[1] == digits[2]) coef = 5;
        if (val === 777) coef = -1;

        return coef;
    }

    this.renderSM = function () {
        var slot = $(`<div class="slot" data-sm="${id}"><input type="number" placeholder="bet" value="1" min="0"><button class="play">Play</button><span class="cash">${money}</span><button class="sm-info">i</button></div>`);
        if(isLucky) slot.addClass('lucky');
        model = slot;

        slot.find('.play').click(function () {
            var val = model.find('input').val();

            var info = play(val);


            model.notify(`[${info.spin}] You win: ${info.win}`, {position: "top", className: "info", style: "black"});
        });

        slot.find('.sm-info').click(function () {
            $('#sm-info-wrapper').show();

            $('.total-from, .total-to').text(money);

            $('#get, #put, #remove').unbind();
            $('#get').click(function () {
                _getCash($(this).parent().find('input').val(), true);


                $('#sm-info-wrapper').hide();
            });
            $('#put').click(function () {
                _putCash($(this).parent().find('input').val(), true);

                $('#sm-info-wrapper').hide();
            });
            
            $('#remove').click(function () {
                MyCasino.removeSM(id);
                //window.casino.removeSM(id);

                $('#sm-info-wrapper').hide();
            });
        });

        $('#slot-wrapper').append(slot);
    };
}

