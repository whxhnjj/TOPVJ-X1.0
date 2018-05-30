var mainbox_width = 350;
var mainbox_height = 400;
var zone_bg_color = "#CDC9C9";
var main_slide_zone_width = 350;
var main_slide_zone_height = 196;
var main_slide_block_width = 50;
var main_slide_block_height = 50;
var startX, startY;
var block_x, block_y, zone_x, zone_y, moveX, moveY;
var active_zone_bg = "";
var active_zone = "";
var event_source;
var showtype = 1;
var bTouch = false;
//文件系统浏览
var nav_w = 0;
var fl_w = 0;
var flb_w = 0;
var ty_left = 0;
var namefilter = "*";
function bulid_file_dialog(source, filter) {
    namefilter = filter;
    build(source, 5);
}

/*OSD存储设备文件选取*/
function build(source, type) {
    if ($("#guoxj_popupdlg").length > 0) {
        $("#guoxj_popupdlg").remove();
    }
    event_source = source;
    showtype = type;
    var active_span = document.createElement('span');
    active_span.id = 'guoxj_popupdlg';
    document.body.appendChild(active_span)

    var baseZIndex = 10001 + 0 * 10;
    var showZIndex = baseZIndex + 2;
    active_zone_bg = '<div id="active_zone_bg" style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:' + baseZIndex + ';background-color:' + zone_bg_color + ';display:none;"></div>';
    active_zone = '<div id="active_zone" style="z-index:' + showZIndex + ';position:relative;width:' + mainbox_width + 'px;height:' + mainbox_height + 'px;background-color: white;"></div>';
    $("#guoxj_popupdlg").html(active_zone_bg + active_zone);
    setBackgroundSize();
    window.onresize = setBackgroundSize;
    core_zone_bulid(type);
    show();
}
function getValue(str) {
    var nResult = 0;
    switch (str) {
        case "scrollTop":
            if (typeof (window.pageYOffset) != 'undefined') {
                nResult = window.pageYOffset
            } else if (typeof (document.compatMode) != 'undefined' && document.compatMode != 'BackCompat') {
                nResult = document.documentElement.scrollTop
            } else if (typeof (document.body) != 'undefined') {
                nResult = document.body.scrollTop
            }
            break;
        case "clientWidth":
            if (typeof (document.compatMode) != 'undefined' && document.compatMode != 'BackCompat') {
                nResult = document.documentElement.clientWidth
            } else if (typeof (document.body) != 'undefined') {
                nResult = document.body.clientWidth
            }
            break;
        case "clientHeight":
            if (typeof (document.compatMode) != 'undefined' && document.compatMode != 'BackCompat') {
                nResult = document.documentElement.clientHeight
            } else if (typeof (document.body) != 'undefined') {
                nResult = document.body.clientHeight
            }
            break;
        case "scrollWidth":
            if (typeof (document.compatMode) != 'undefined' && document.compatMode != 'BackCompat') {
                nResult = document.documentElement.scrollWidth
            } else if (typeof (document.body) != 'undefined') {
                nResult = document.body.scrollWidth
            }
            break;
        case "scrollHeight":
            if (typeof (document.compatMode) != 'undefined' && document.compatMode != 'BackCompat') {
                nResult = document.documentElement.scrollHeight
            } else if (typeof (document.body) != 'undefined') {
                nResult = document.body.scrollHeight
            }
            break;
        default:
            break
    }
    return nResult
}
function setBackgroundSize() {
    var getValueWidth;
    var getMaxValueWidth = [getValue("clientWidth"), getValue("scrollWidth")];
    getValueWidth = eval("Math.max(" + getMaxValueWidth.toString() + ")");
    $('#active_zone_bg').width(getValueWidth);
    var getValueHeight;
    var getMaxValueHeight = [getValue("clientHeight"), getValue("scrollHeight")];
    getValueHeight = eval("Math.max(" + getMaxValueHeight.toString() + ")");
    $('#active_zone_bg').height(getValueHeight);
}
function core_zone_bulid(type) {
    var editzone = '<div style="width:100%;height:100%;text-align:center;">' +
        '<div style="width:100%;height:70%;margin:0 0;">' +
        '<textarea id="guoxj_txt_area" contenteditable="true"  style="width:100%;height:100%;z-index: 999999999999;-webkit-touch-callout:none;-webkit-user-select: auto;touch-callout:none;" autofocus></textarea></div>' +
        '<div id="guoxj_text_edit_div" style="width:96%; height:5%;margin:2%;"></div>' +
        '<div class="mg_bot" style="width:100%; height:15%;display: table;">' +
        '<div style="width:50%; height:100%;display: table-cell;vertical-align: middle;"><input  id="guoxj_txt_setting_submit" class="valfont" type="button" data-locale="submit" value="提交"/></div>' +
        '<div style="width:50%; height:100%;display: table-cell;vertical-align: middle;"><input id="guoxj_txt_setting_cannel" class="valfont" type="button" data-locale="Close" value="关闭"/></div>' +
        '</div>' +
        '</div>';
    var browerzone = '<div style="width:100%;height:100%;text-align:center;">' +
        '<div style="width:100%;height:80%;margin:0 0;">' +
        '<textarea id="guoxj_txt_area" style="width:100%;height:100%;overflow:auto;"></textarea></div>' +
        '<div  style="width:100%; height:20%;display: table;">' +
        '<div style="width:100%; height:100%;display: table-cell;vertical-align: middle;"><input id="guoxj_txt_setting_cannel" type="button" class="valfont" data-locale="Close" value="关闭"/></div>' +
        '</div>' +
        '</div>';
    var slidezone = '<div style="width:' + main_slide_zone_width + 'px;height:' + main_slide_zone_height + 'px;background-color:#668B8B;position: relative;" id="main_slide_zone"><div id="slide_block" style="width:' + main_slide_block_width + 'px;height:' + main_slide_block_height + 'px;position: relative; cursor: pointer;background-color:#000000;"></div></div>' +
        '<div class="slidezone_list">' +
        '<div style="display: table-cell;vertical-align: middle;"><div class="input_div" id="scaling_horizontal_large_btn" >水平放大</div></div>' +
        '<div style="display: table-cell;vertical-align: middle;"><div class="input_div" id="scaling_vertical_large_btn">垂直放大</div></div>' +
        '<div style="display: table-cell;vertical-align: middle;"><div class="input_div" id="scaling_horizontal_reduce_btn">水平缩小</div></div>' +
        '<div style="display: table-cell;vertical-align: middle;"><div class="input_div"id="scaling_vertical_reduce_btn">垂直缩小</div></div>' +
        '<div style="display: table-cell;vertical-align: middle;"><div class="valfont guoxj_txt_setting_submit1"  id="guoxj_txt_setting_submit" data-locale="submit">提交</div></div>' +
        '<div style="display: table-cell;vertical-align: middle;"><div class="valfont guoxj_txt_setting_cannel1" id="guoxj_txt_setting_cannel" data-locale="Close">关闭</div></div>' +
        '</div>';
    var word_setting_zone = '<div class="font_title" id="font_color" data-locale="Font color">字体颜色:</div><input type="text" class="jscolor" id="guoxj_font_color" value="#FF0000" />' +
        '<div class="font_title title2" id="font_size" data-locale="Font size">字体大小:</div><select id="guoxj_font_size">' +
        '<option value="40">40</option>' +
        '<option value="45">45</option>' +
        '<option value="50">50</option>' +
        '<option value="55">55</option>' +
        '<option value="60">60</option>' +
        '<option value="65">65</option>' +
        '<option value="70">70</option>' +
        '<option value="75">75</option>' +
        '<option value="80">80</option></select>';
    /*存储设备*/
    var fs_exploer = '<div style="width:100%;height:100%;">' +
        '<div class="find_nav">' +
        '<div class="find_nav_left"><div class="find_nav_list">' +
        '<ul class="nav_item_list"><li class="find_nav_cur"  path="/media" ><a id="storage" href="javascript:void(0)">存储设备</a></li></ul>' +
        '</div></div></div>' +
        '<div class="file_list_box"><ul class="explore_file_list"></ul></div>' +
        '<div style="width:100%;display: table; margin:20 0 0 0;">' +
        '<div style="width:100%;height:40px;display: table-cell;vertical-align: middle;"><input class="ccsv_ipt" id="guoxj_txt_setting_cannel"  type="button" value="关闭"/></div>' +
        '</div></div>';
    var baseZIndex = 10001 + 0 * 10;
    var coverIfZIndex = baseZIndex + 4;
    if (type == 1) {//edit
        if (NaLanguage == "zh"){
            $("#active_zone").html(editzone);
            $("#guoxj_txt_setting_submit").val("提交");
            $("#guoxj_txt_setting_cannel").val("关闭");
        }else {
            $("#active_zone").html(editzone);
            $("#guoxj_txt_setting_submit").val("submit");
            $("#guoxj_txt_setting_cannel").val("Close");
        }
        $('#guoxj_txt_area').html(event_source.value);
        $("#guoxj_txt_setting_cannel").on("click", close);
        $("#guoxj_txt_setting_submit").on("click", submit_callback);
    } else if (type == 2) {//brower
        if (NaLanguage == "zh"){
            $("#active_zone").html(browerzone);
            $("#guoxj_txt_setting_cannel").val("关闭")
        }else {
            $("#active_zone").html(browerzone);
            $("#guoxj_txt_setting_cannel").val("Close")
        }

        $('#guoxj_txt_area').html(event_source.value);
        $("#guoxj_txt_setting_cannel").on("click", close);
    } else if (type == 3) {//slide
        if (NaLanguage == "zh"){
            $("#active_zone").html(slidezone);
            $("#scaling_horizontal_large_btn").text("水平放大");
            $("#scaling_vertical_large_btn").text("垂直放大");
            $("#scaling_horizontal_reduce_btn").text("水平缩小");
            $("#scaling_vertical_reduce_btn").text("垂直缩小");
            $("#guoxj_txt_setting_submit").text("提交");
            $("#guoxj_txt_setting_cannel").text("关闭");
        }else {
            $("#active_zone").html(slidezone);
            $("#scaling_horizontal_large_btn").text("Horizontal magnification");
            $("#scaling_vertical_large_btn").text("Vertical magnification");
            $("#scaling_horizontal_reduce_btn").text("Level reduction");
            $("#scaling_vertical_reduce_btn").text("Vertical reduction");
            $("#guoxj_txt_setting_submit").text("Submit");
            $("#guoxj_txt_setting_cannel").text("Close");

        }

        $("#slide_block").on("touchstart", slide_block_touchstart);
        $("#slide_block").on("touchmove", slide_block_touchmove);
        /*1-水平放大*/
        var timeOutEvent;
        document.querySelector("#scaling_horizontal_large_btn").ontouchstart = function (e) {
            e.preventDefault();
            $("#scaling_horizontal_large_btn").css("backgroundColor", "#F82E42");
            timeOutEvent = setInterval(function () {
                var scaling_hor_step = 2;
                slide_block_size($("#slide_block").width() + scaling_hor_step, $("#slide_block").height());
                slide_block_pos(startX, startY);
            }, 200);
        };
        /*水平点击放大放大*/
        document.querySelector("#scaling_horizontal_large_btn").ontouchend = function (e) {
            e.preventDefault();
            $("#scaling_horizontal_large_btn").css("backgroundColor", "#FA5969");
            var scaling_hor_step = 2;
            slide_block_size($("#slide_block").width() + scaling_hor_step, $("#slide_block").height());
            slide_block_pos(startX, startY);
            clearInterval(timeOutEvent)
        };
        /*2-垂直放大*/
        document.querySelector("#scaling_vertical_large_btn").ontouchstart = function (e) {
            e.preventDefault();
            $("#scaling_vertical_large_btn").css("backgroundColor", "#F82E42");
            timeOutEvent = setInterval(function () {
                var scaling_ver_step = 2;
                slide_block_size($("#slide_block").width(), $("#slide_block").height() + scaling_ver_step);
                slide_block_pos(startX, startY);
            }, 200);
        };
        document.querySelector("#scaling_vertical_large_btn").ontouchend = function (e) {
            e.preventDefault();
            $("#scaling_vertical_large_btn").css("backgroundColor", "#FA5969");
            var scaling_ver_step = 2;
            slide_block_size($("#slide_block").width(), $("#slide_block").height() + scaling_ver_step);
            slide_block_pos(startX, startY);
            clearInterval(timeOutEvent)
        };
        /* 3-水平缩小*/
        document.querySelector("#scaling_horizontal_reduce_btn").ontouchstart = function (e) {
            e.preventDefault();
            $("#scaling_horizontal_reduce_btn").css("backgroundColor", "#F82E42");
            timeOutEvent = setInterval(function () {
                var scaling_hor_step = 2;
                slide_block_size($("#slide_block").width() - scaling_hor_step, $("#slide_block").height());
                slide_block_pos(startX, startY);
            }, 200);
        };
        document.querySelector("#scaling_horizontal_reduce_btn").ontouchend = function (e) {
            e.preventDefault();
            $("#scaling_horizontal_reduce_btn").css("backgroundColor", "#FA5969");
            var scaling_hor_step = 2;
            slide_block_size($("#slide_block").width() - scaling_hor_step, $("#slide_block").height());
            slide_block_pos(startX, startY);
            clearInterval(timeOutEvent)
        };
        /*4-垂直缩小*/
        document.querySelector("#scaling_vertical_reduce_btn").ontouchstart = function (e) {
            e.preventDefault();
            $("#scaling_vertical_reduce_btn").css("backgroundColor", "#F82E42");
            timeOutEvent = setInterval(function () {
                var scaling_ver_step = 2;
                slide_block_size($("#slide_block").width(), $("#slide_block").height() - scaling_ver_step);
                slide_block_pos(startX, startY);
            }, 200);
        };
        document.querySelector("#scaling_vertical_reduce_btn").ontouchend = function (e) {
            e.preventDefault();
            $("#scaling_vertical_reduce_btn").css("backgroundColor", "#FA5969");
            var scaling_ver_step = 2;
            slide_block_size($("#slide_block").width(), $("#slide_block").height() - scaling_ver_step);
            slide_block_pos(startX, startY);
            clearInterval(timeOutEvent)
        };
        //   $("#scaling_horizontal_large_btn").on("click",slide_block_hor_large_scaling);
        // $("#scaling_vertical_large_btn").on("click",slide_block_ver_large_scaling);
        // $("#scaling_horizontal_reduce_btn").on("click",slide_block_hor_reduce_scaling);
        //	$("#scaling_vertical_reduce_btn").on("click",slide_block_ver_reduce_scaling);
        $("#guoxj_txt_setting_cannel").on("click", close);
        $("#guoxj_txt_setting_submit").on("click", submit_callback);
        set_slide_block_rect_2_local($(event_source).attr("posX"), $(event_source).attr("posY"), $(event_source).attr("posWidth"), $(event_source).attr("posHeight"));
    } else if (type == 4) {//edit
        if (NaLanguage == "zh"){
            $("#active_zone").html(editzone);
            $("#guoxj_txt_setting_submit").val("提交");
            $("#guoxj_txt_setting_cannel").val("关闭");
        }else {
            $("#active_zone").html(editzone);
            $("#guoxj_txt_setting_submit").val("submit");
            $("#guoxj_txt_setting_cannel").val("Close");
        }
        if (NaLanguage == "zh"){
            $("#guoxj_text_edit_div").html(word_setting_zone);
            $("#font_color").text("字体颜色");
            $("#font_size").text("字体大小");
        }else {
            $("#guoxj_text_edit_div").html(word_setting_zone);
            $("#font_color").text("Font color");
            $("#font_size").text("Font size");
        }



        $('#guoxj_txt_area').html($(event_source).val());
        var hexcolor = parseInt($(event_source).attr("klfontcolor")).toString(16).toUpperCase();
        var str = "000000";
        str = str.substring(0, 6 - hexcolor.length);
        hexcolor = str + hexcolor;
        $("#guoxj_font_color").val(hexcolor);
        $("#guoxj_font_size").val($(event_source).attr("klfontsize"));
        $("#guoxj_txt_setting_cannel").on("click", close);
        $("#guoxj_txt_setting_submit").on("click", submit_callback);
    } else if (type == 5) {
        if (NaLanguage == "zh"){
            $("#active_zone").html(fs_exploer);
            $("#storage").text("存储设备");
            $("#guoxj_txt_setting_cannel").val("关闭")
        }else {
            $("#active_zone").html(fs_exploer);
            $("#storage").text("storage device");
            $("#guoxj_txt_setting_cannel").val("Close")
        }

        nav_w = $(".find_nav_list li").first().width();
        $(".find_nav_list li").on('click', on_nav_item_click);
        fl_w = $(".find_nav_list").width();
        flb_w = $(".find_nav_left").width();
        $(".find_nav_list").on('touchstart', fs_nav_touchstart);
        $(".find_nav_list").on('touchmove', fs_nav_touchmove);
        $("#guoxj_txt_setting_cannel").on("click", close);
        get_file_list("/media");
    } else {
    }
}
function show() {
    $('#active_zone_bg').css('display', '');
    var active_zone = $("#active_zone");
    $("#active_zone").css("position", "absolute");
    $("#active_zone").css("display", "");
    var sClientWidth = getValue("clientWidth");
    var sClientHeight = getValue("clientHeight");
    var sScrollTop = getValue("scrollTop");
    var sleft = (sClientWidth / 2) - (active_zone[0].offsetWidth / 2);
    var iTop = (sClientHeight / 2 + sScrollTop) - (active_zone[0].offsetHeight / 2);
    var sTop = iTop > 0 ? iTop : (sClientHeight / 2 + sScrollTop) - (active_zone[0].offsetHeight / 2);
    if (sTop < 1) sTop = "20";
    if (sleft < 1) sleft = "20";
    $("#active_zone").css("left", sleft);
    $("#active_zone").css("top", sTop);
}
function close() {
    $('#active_zone').css('display', 'none');
    $('#active_zone_bg').css('display', 'none');
    $('#active_zone').html('')
}
function submit_callback() {
    if (showtype == 1) {
        event_source.value = $('#guoxj_txt_area').val();
    } else if (showtype == 3) {
        var blockpos = get_slide_block_rect_2_screen();
        $(event_source).val(blockpos[0] + "," + blockpos[1] + "," + blockpos[2] + "," + blockpos[3]);
        $(event_source).attr("posX", blockpos[0]);
        $(event_source).attr("posY", blockpos[1]);
        $(event_source).attr("posWidth", blockpos[2]);
        $(event_source).attr("posHeight", blockpos[3]);
    } else if (showtype == 4) {
        $(event_source).val($('#guoxj_txt_area').val());
        $(event_source).attr("klfontcolor", parseInt("0x" + $("#guoxj_font_color").val()));
        $(event_source).attr("klfontsize", $("#guoxj_font_size").val());
    }
    close();
}
function init_slide_block(startX, startY) {
    main_slide_zone_width = $("#main_slide_zone").width();
    main_slide_zone_height = $("#main_slide_zone").height();
    main_slide_block_width = $("#slide_block").width();
    main_slide_block_height = $("#slide_block").height();
    block_x = $("#slide_block").offset().left;
    block_y = $("#slide_block").offset().top;
    zone_x = $("#main_slide_zone").offset().left;
    zone_y = $("#main_slide_zone").offset().top;
    leftX = startX - (block_x - zone_x);
    rightX = startX + ((main_slide_zone_width + zone_x) - (main_slide_block_width + block_x));
    topY = startY - (block_y - zone_y);
    bottomY = startY + ((main_slide_zone_height + zone_y) - (main_slide_block_height + block_y));
}
function slide_block_touchstart(e) {
    e.preventDefault()
    bTouch = true;
    startX = e.originalEvent.targetTouches[0].pageX;
    startY = e.originalEvent.targetTouches[0].pageY;
    init_slide_block(startX, startY);
}
function slide_block_touchmove(e) {
    e.preventDefault();
    moveX = e.originalEvent.targetTouches[0].pageX;
    moveY = e.originalEvent.targetTouches[0].pageY;
    slide_block_pos(moveX, moveY);
}
function slide_block_hor_large_scaling() {
    var scaling_hor_step = 2;
    slide_block_size($("#slide_block").width() + scaling_hor_step, $("#slide_block").height());
    slide_block_pos(startX, startY);
}
function slide_block_ver_large_scaling() {
    var scaling_ver_step = 2;
    slide_block_size($("#slide_block").width(), $("#slide_block").height() + scaling_ver_step);
    slide_block_pos(startX, startY);
}
function slide_block_hor_reduce_scaling() {
    var scaling_hor_step = 2;
    slide_block_size($("#slide_block").width() - scaling_hor_step, $("#slide_block").height());
    slide_block_pos(startX, startY);
}
function slide_block_ver_reduce_scaling() {
    var scaling_ver_step = 2;
    slide_block_size($("#slide_block").width(), $("#slide_block").height() - scaling_ver_step);
    slide_block_pos(startX, startY);
}
function slide_block_pos(moveX, moveY) {
    if (bTouch == false) {
        startX = $("#slide_block").position().left;
        startY = $("#slide_block").position().top;
        init_slide_block(startX, startY);
    }
    if (moveX < leftX) {
        moveX = leftX;
    }
    if (moveX > rightX) {
        moveX = rightX;
    }
    if (moveY < topY) {
        moveY = topY;
    }
    if (moveY > bottomY) {
        moveY = bottomY;
    }
    var local_block_posx = moveX - zone_x - (startX - block_x);
    var local_block_posy = moveY - zone_y - (startY - block_y);
    if (local_block_posx < 0) {
        local_block_posx = 0;
    }
    if (local_block_posy < 0) {
        local_block_posy = 0;
    }
    $("#slide_block").css({
        "psotion": "relative",
        "left": local_block_posx,
        "top": local_block_posy,
    });
}
function slide_block_size(width, height) {
    if (width > $("#main_slide_zone").width()) {
        width = $("#main_slide_zone").width();
    }
    if (height > $("#main_slide_zone").height()) {
        height = $("#main_slide_zone").height();
    }
    if (width < 10) {
        width = 10;
    }
    if (height < 10) {
        height = 10;
    }
    $("#slide_block").css({
        "psotion": "relative",
        "width": width,
        "height": height,
    })
    startX = $("#slide_block").position().left;
    startY = $("#slide_block").position().top;
    init_slide_block(startX, startY);
}

function slide_block_rect_2_local(x, y, width, height) {
    return [parseInt(x * main_slide_zone_width / 1920), parseInt(y * main_slide_zone_height / 1080), parseInt(width * main_slide_zone_width / 1920), parseInt(height * main_slide_zone_height / 1080)]
}
function slide_block_rect_2_screen(x, y, width, height) {
    return [parseInt(x * 1920 / main_slide_zone_width), parseInt(y * 1080 / main_slide_zone_height), parseInt(width * 1920 / main_slide_zone_width), parseInt(height * 1080 / main_slide_zone_height)];
}
function get_slide_block_rect_2_screen() {
    return slide_block_rect_2_screen($("#slide_block").position().left, $("#slide_block").position().top, $("#slide_block").width(), $("#slide_block").height());
}
function set_slide_block_rect_2_local(x, y, width, height) {
    slide_block_size(parseInt(width * main_slide_zone_width / 1920), parseInt(height * main_slide_zone_height / 1080));
    slide_block_pos(parseInt(x * main_slide_zone_width / 1920), parseInt(y * main_slide_zone_height / 1080));
}
function show_slide_block_rect() {

}
function on_nav_item_click() {
    $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
    $(this).nextAll().remove();
    $(".explore_file_list").children().remove();
    get_file_list($(this).attr("path"));
    /*nav_w=$(this).width();
    var fn_w = ($(".find_nav").width() - nav_w) / 2;
    var fnl_l;
    var fnl_x = parseInt($(this).position().left);
    if (fnl_x <= fn_w) {
        fnl_l = 0;
    } else if (fn_w - fnl_x <= flb_w - fl_w) {
        fnl_l = flb_w - fl_w;
    } else {
        fnl_l = fn_w - fnl_x;
    }
    $(".find_nav_list").animate({"left" : fnl_l}, 300);*/
}

function fs_nav_touchstart(e) {
    var touch1 = e.originalEvent.targetTouches[0];
    x1 = touch1.pageX;
    y1 = touch1.pageY;
    ty_left = parseInt($(this).css("left"));
}

function fs_nav_touchmove(e) {
    var touch2 = e.originalEvent.targetTouches[0];
    var x2 = touch2.pageX;
    var y2 = touch2.pageY;
    if (ty_left + x2 - x1 >= 0) {
        $(this).css("left", 0);
    } else if (ty_left + x2 - x1 <= flb_w - fl_w) {
        $(this).css("left", flb_w - fl_w);
    } else {
        $(this).css("left", ty_left + x2 - x1);
    }
    if (Math.abs(y2 - y1) > 0) {
        e.preventDefault();
    }
}

function get_file_list(path) {
    var args = {
        "sessid" : $.cookie("sessid"),
        "Function" : "APPS_GET_FILE_LIST",
        "Arg1":path,
        "Arg2":namefilter
    };
    $.post(_json_service, JSON.stringify(args)
    ).done(function(data) {
        callback_get_file_list(data);
    }).fail(function(response, textStatus, errorThrown) {
    }).always(function(){
    });
}

function callback_get_file_list(data) {
    //var data="[{\"name\": \"20171009\",\"path\":\"H:/20171009\",\"type\":\"0\"},{\"name\": \"3\",\"path\":\"H:/3\",\"type\":\"0\"},{\"name\": \"consoleapp1\",\"path\":\"H:/consoleapp1\",\"type\":\"0\"},{\"name\": \"s1效果.png\",\"path\":\"H:/s1效果.png\",\"type\":\"1\"},{\"name\": \"s2效果.png\",\"path\":\"H:/s2效果.png\",\"type\":\"1\"}]";
    var recvdata = data["ResData"];
    console.log("get file list data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var parsedata = JSON.parse(recvdata);
        console.log("get file list data: ");
        console.log(parsedata);
        $.each(parsedata, function (index, node) {
            var file_obj_item = document.createElement('li');
            var filetype = node["type"];
            var filename = node["name"];
            if (filetype == "0") {
                $(file_obj_item).html("<span>" + filename + "</span>");
            } else {
                $(file_obj_item).html("<span>" + filename + "</span>");
            }
            $(file_obj_item).attr("name", filename);
            $(file_obj_item).attr("path", node["path"]);
            $(file_obj_item).attr("type", filetype);
            $(".explore_file_list").append(file_obj_item);
            $(file_obj_item).on("click", on_file_item_click);
        });
    }
}


function on_file_item_click() {
    var type = $(this).attr("type");
    var name = $(this).attr("name");
    var path = $(this).attr("path");
    if (type == "0") {
        //清除filelist
        $(".explore_file_list").children().remove();
        //添加到向导
        var nav_obj_item = document.createElement('li');
        $(nav_obj_item).html('<a href="javascript:void(0)">' + name + '</a>');
        $(nav_obj_item).attr("name", name);
        $(nav_obj_item).attr("path", path);
        $(nav_obj_item).attr("type", type);
        $(nav_obj_item).on("click", on_nav_item_click);
        $(".nav_item_list").append(nav_obj_item);
        $(nav_obj_item).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        //生成新的列表
        get_file_list(path);
    }
    if (type == "1" && null != event_source) {
        $(event_source).val(path);
        close();
    }
}
