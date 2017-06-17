function Casino(smCount, money) {
    var machines = new Array();

    var smIds = 0;

    var mOnSM = Math.floor(money / smCount);
    var lucky = Math.floor((Math.random() * smCount));

    for(var i = 0; i < smCount; i++){
        var sm = new SlotMachine(mOnSM);
        sm.setId(smIds);
        smIds++;
        
        sm.isLucky(i == lucky);

        machines.push(sm);
        money -= mOnSM;

        sm.renderSM();
    }
    machines[0].putCash(money);


    this.updateInfo = function () {
        getMachinesInfo();

    };

    function getMachinesInfo() {
        var info = {curBiggest: machines[0] , total : 0};

        machines.forEach(function (item, i, arr) {
            info.total += item.getMoney();

            if(item.getMoney() > info.curBiggest.getMoney()){
                info.curBiggest = item;
            }
        });

        $('#casino-control').find('.info').find('span').html(`Total money: ${info.total}$<br>Machines: ${machines.length}`);

        return info;
    }

    getMachinesInfo();

    this.removeSM = function(id){
        var m = null;
        for(var i = 0; i < machines.length; i++)
        {
            if(machines[i].getId() == id){
                m = machines[i];
                break;
            }
        }

        if(m){
            m.getModel().remove();
            machines.splice(machines.indexOf(m), 1);
        }
    };

    $('#add').click(function () {
        var inf = getMachinesInfo();
        var mon = Math.floor(inf.curBiggest.getMoney() / 2);
        inf.curBiggest.getCash(mon);

        var sm = new SlotMachine(mon);
        sm.setId(smIds);
        smIds++;

        machines.push(sm);

        sm.renderSM();

    });
}