/**
 * Created by hanshaojie-pc on 2016/12/18.
 */

$(function () {
    date.init("date");
});

var date = {
    //初始化调用
    init: function (id,year,month,day) {
        this.id = id;
        this.week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        this.year = year || new Date().getFullYear();
        this.month = month || new Date().getMonth()+1;
        this.day = day || new Date().getDate();
        this.clearEle();
        this.createWeek();
        this.createDate();
        this.fillDate();
        this.createBtn();
        this.switchDate();
        this.setToday();
    },
    //创建星期
    createWeek: function () {
        var oTr = document.createElement("tr");
        for (var i = 0; i < 7; i++) {
            var oTh = document.createElement("th");
            oTh.innerHTML = this.week[i];
            oTr.append(oTh);
        }
        var oThead = document.createElement("tHead");
        oThead.append(oTr);
        var oTable = document.createElement("table");
        oTable.className = "date-table";
        oTable.style.borderCollapse = "collapse";
        oTable.border = 0;
        oTable.append(oThead);
        $("#" + this.id).append(oTable);
    },
    //创建6行7列的表格
    createDate: function () {
        var oTable = $("#" + this.id + " table.date-table");
        var oTbody = document.createElement("tBody");
        for (var i = 0; i < 6; i++) {
            var oTr = document.createElement("tr");
            for (var j = 0; j < 7; j++) {
                var oTd = document.createElement("td");
                var oSpan = document.createElement("span");
                oTd.append(oSpan);
                oTr.append(oTd);
            }
            oTbody.append(oTr);
        }
        oTable.append(oTbody);
    },
    //设置每月的1日，填充天数
    fillDate: function () {
        var d = new Date();
        d.setMonth(this.month - 1);
        var monthDay = this.monthDay(this.year,d.getMonth()+1);
        d.setDate(1);
        var day = d.getDay();
        this.startDay(day, monthDay);
    },
    //计算每月的1日从星期几开始填充
    startDay: function (day, date) {
        var oTd = $("#" + this.id + " table tbody td");
        /*计算当前月的上一月*/
        var prevMonth = this.fillZero(parseInt(this.month) - 1);
        if (prevMonth == 0){
            prevMonth = 12;
        }
        // 当前月的下一月不需要获得，只需根据当前月的天数和表格总数，即可求出当前月之后剩余多少天
        /*
        var nextMonth = this.fillZero(parseInt(this.month) + 1);
        if(nextMonth == 13){
            nextMonth = this.fillZero(1);
        } */

        //确定周一的位置
        if (this.week[0] == "星期一") {
            day = day - 1;
        }

        switch (day) {
            /*当周日位于最后*/
            case -1:
                /*填充当前月的天数*/
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + 6).children("span").html(i + 1);
                }
                /*填充当前月的上一月的天数*/
                for(var i=0; i<6; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(this.monthDay(this.year,prevMonth) - 5 + i);
                }
                /*填充剩余表格的天数*/
                for(var i=date; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date + 1);
                }
                break;
            /*当周日位于第一位*/
            case 0:
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + day).children("span").html(i + 1);
                }
                for(var i=date; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date + 1);
                }
                break;
            case 1:
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + day).children("span").html(i + 1);
                }
                for(var i=0; i<day; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(this.monthDay(this.year,prevMonth));
                }
                for(var i=date+1; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date);
                }
                break;
            case 2:
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + day).children("span").html(i + 1);
                }
                for(var i=0; i<day; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(this.monthDay(this.year,prevMonth)+ i - 1);
                }
                for(var i=date+2; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date - 1);
                }
                break;
            case 3:
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + day).children("span").html(i + 1);
                }
                for(var i=0; i<day; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(this.monthDay(this.year,prevMonth)+ i - 2);
                }
                for(var i=date+3; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date - 2);
                }
                break;
            case 4:
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + day).children("span").html(i + 1);
                }
                for(var i=0; i<day; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(this.monthDay(this.year,prevMonth)+ i - 3);
                }
                for(var i=date+4; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date - 3);
                }
                break;
            case 5:
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + day).children("span").html(i + 1);
                }
                for(var i=0; i<day; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(this.monthDay(this.year,prevMonth)+ i - 4);
                }
                for(var i=date+5; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date - 4);
                }
                break;
            case 6:
                for (var i = 0; i < date; i++) {
                    oTd.eq(i + day).children("span").html(i + 1);
                }
                for(var i=0; i<day; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(this.monthDay(this.year,prevMonth)+ i - 5);
                }
                for(var i=date+6; i<oTd.length; i++){
                    oTd.eq(i).addClass("gray");
                    oTd.eq(i).children("span").html(i - date - 5);
                }
                break;
        }
    },
    //计算每月的天数
    monthDay: function (year,month) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            return 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            return 30;
        } else if (month == 2) {
            if(this.isYear(year)){
                return 29;
            }else{
                return 28;
            }
        }
    },
    //判断平年还是闰年
    isYear: function (year) {
        if (year % 4 == 0 && year % 100 != 0) {
            return true;
        } else if(year % 400 == 0) {
            return true;
        } else {
            return false;
        }
    },
    //创建年月切换按钮
    createBtn: function () {
        var str = "";
        str += "<div class='btn-group clearFix'>";
        str += "<div class='switch fl' id='year-switch'>";
        str += "<button>上一年</button>";
        str += "<span>"+this.year+"年</span>";
        str += "<button>下一年</button>";
        str += "</div>";
        str += "<div class='switch fl today' id='go-today'>";
        str += "<button>回到今天</button>";
        str += "</div>";
        str += "<div class='switch fr' id='month-switch'>";
        str += "<button>上月</button>";
        str += "<span>"+this.month+"月</span>";
        str += "<button>下月</button>";
        str += "</div>";
        str += "</div>";
        $("#"+this.id).append(str);
    },
    //年月切换和回到今天
    switchDate:function () {
        var prevYear = $("#year-switch button:first-of-type");
        var nextYear = $("#year-switch button:last-of-type");
        var yearTxt = $("#year-switch span");
        var prevMonth = $("#month-switch button:first-of-type");
        var nextMonth = $("#month-switch button:last-of-type");
        var monthTxt = $("#month-switch span");
        var oToday = $("#go-today button");
        var _this = this;
        prevYear.on("click",function () {
            var curYear = parseInt(yearTxt.html());
            var curMonth = parseInt(monthTxt.html());
            yearTxt.html(curYear - 1 + "年");
            _this.init(_this.id,curYear - 1,curMonth);
        });
        nextYear.on("click",function () {
            var curYear = parseInt(yearTxt.html());
            var curMonth = parseInt(monthTxt.html());
            yearTxt.html(curYear + 1 + "年");
            _this.init(_this.id,curYear + 1,curMonth);
        });
        prevMonth.on("click",function () {
            var curMonth = parseInt(monthTxt.html());
            if(curMonth <= 1){
                curMonth = 13;
                yearTxt.html(parseInt(yearTxt.html()) - 1 + "年");
            }
            _this.init(_this.id,parseInt(yearTxt.html()),_this.fillZero(curMonth - 1));
            monthTxt.html(_this.fillZero(curMonth - 1) + "月");
        });
        nextMonth.on("click",function () {
            var curMonth = parseInt(monthTxt.html());
            if(curMonth >= 12){
                curMonth = 0;
                yearTxt.html(parseInt(yearTxt.html()) + 1 + "年");
            }
            _this.init(_this.id,parseInt(yearTxt.html()),_this.fillZero(curMonth + 1));
            monthTxt.html(_this.fillZero(curMonth + 1) + "月");
        });
        oToday.on("click",function () {
            _this.init(_this.id,new Date().getFullYear(),new Date().getMonth()+1);
        });
    },
    //补零
    fillZero:function (month) {
        if(month<10){
            return "0" + month;
        }else{
            return month;
        }
    },
    //清空
    clearEle:function () {
        $("#"+this.id).children().remove();
    },
    //设置当天的样式
    setToday:function () {
        var _this = this;
        var oTd = $("#" + this.id + " table tbody td");

        oTd.each(function () {
            if(_this.day == $(this).find("span").text() && _this.month == (new Date().getMonth()+1) && _this.year == new Date().getFullYear() && !$(this).hasClass('gray')){
                $(this).css({
                    color:"red"
                })
            }
        });
    }
};












