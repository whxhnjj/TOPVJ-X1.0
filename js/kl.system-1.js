//login
function login_onclick() {
    var realm = $('#username').val() + ":myrealm:"
    var login_token = realm + md5(realm + $('#password').val());
    var args = {
        "login": login_token
    };
    get_login_json(login_callback, args);
}
function login_callback(data) {
    var date = new Date();
    date.setTime(date.getTime() + 10 * 60 * 1000);
    $.cookie("sessid", "", -1);
    $.cookie("sessid", data.sessid, {expires: date});
    if (data["_error_"] == "ok") {
        window.location.href = "/index.html";
    } else {
        $("#loginmsg").html("Incorrect username or password!");
    }
}
//setting弹出
function fullPageShow() {
    $(".box_tab").show(500);
    tabindex(0);
}
function back() {
    $(".box_tab").hide(500);
}
/*tab切换*/
$(document).ready(function(){
    $(".ulmenu1 li").click(function(){
        $(".ulmenu1 li").eq($(this).index()).addClass("selected").siblings().removeClass('selected');
        $(".tab").hide().eq($(this).index()).show();
        tabindex($(this).index())
    });



	$("#uploadfile").fileupload({
        url:  _json_service + "?service_type=upload_binary&filename=topvjxfw.tar.gz",
        dataType: 'json',
        // 上传完成后的执行逻辑
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    $('<p/>').text(file.name).appendTo(document.body);
                });
            },
        // 上传过程中的回调函数
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('body').append(str_loading);
                setTimeout(function () {
                    $(".box_loading").fadeOut(1000);
                    $(".box_loading").remove();
                }, progress);
                $("#bar").text(progress + '%');
                if (progress == 100) {
                    $("#blueButton").removeClass("blueButton").addClass("blueButton01");
                }
        }
    });
});
/*tab点击调方法*/
function tabindex(clickIndex) {
    if (clickIndex == 0) {
        init_wifi_setting();
    } else if (clickIndex == 1) {
        net_work_access();
        init_net_work();
    } else if (clickIndex == 2) {


    } else if (clickIndex == 3) {
        //tab中英文切换
        if (NaLanguage == 'zh'){
            $(".seat_font01").attr('placeholder','请输入原密码');
            $(".seat_font02").attr('placeholder','请输入新密码');
            $(".seat_font03").attr('placeholder','确认新密码');
        }else {
            $(".seat_font01").attr('placeholder','Please enter the original password');
            $(".seat_font02").attr('placeholder','Please enter a new password');
            $(".seat_font03").attr('placeholder','Confirm the new password');
        }
    } else if (clickIndex == 4) {
        init_device_version();  
    } else if (clickIndex == 5) {
          
    }
}


//encoder
function encoder_page_init() {
    var type = $("div[name='encoder_page']").children().find("select[name='encoder_type']").val();
    var device = $("div[name='encoder_page']").children().find("select[name='device']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_ENCODER_ITEM",
        "Arg1": parseInt(type),
        "Arg2": parseInt(device)
    };
    get_json_data(show_encord_page_data, args);
}
function encoder_page_device_change(objval) {
    var type = $("div[name='encoder_page']").children().find("select[name='encoder_type']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_ENCODER_ITEM",
        "Arg1": parseInt(type),
        "Arg2": parseInt(objval)
    };
    get_json_data(show_encord_page_data, args);
}
function encoder_page_encoder_change(objval) {
    var device = $("div[name='encoder_page']").children().find("select[name='device']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_ENCODER_ITEM",
        "Arg1": parseInt(objval),
        "Arg2": parseInt(device)
    };
    get_json_data(show_encord_page_data, args);
}
function encoder_page_save_encoder() {
    var device = $("div[name='encoder_page']").children().find("select[name='device']").val();
    var encodertype = $("div[name='encoder_page']").children().find("select[name='encoder_type']").val();
    var resolution = $("div[name='encoder_page']").children().find("select[name='resolution']").val();
    var framerate = $("div[name='encoder_page']").children().find("select[name='framerate']").val();
    var profile = $("div[name='encoder_page']").children().find("select[name='profile']").val();
    var videobitrate = $("div[name='encoder_page']").children().find("select[name='videobitrate']").val();
    var mode = $("div[name='encoder_page']").children().find("select[name='mode']").val();
    //var entropy=$("div[name='encoder_page']").children().find("select[name='entropy']").val();
    //var audiobitrate=$("div[name='encoder_page']").children().find("select[name='audiobitrate']").val();
    //var gop=$("div[name='encoder_page']").children().find("select[name='gop']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SAVE_ENCODER_ITEM",
        "Arg0": parseInt(device),
        "Arg1": parseInt(encodertype),
        "Arg2": parseInt(resolution),
        "Arg3": parseFloat(framerate),
        "Arg4": parseInt(profile),
        "Arg5": parseInt(videobitrate),
        "Arg6": parseInt(mode)
        //"Arg6": parseInt(entropy),
        //"Arg7": parseInt(audiobitrate),
        //"Arg8": parseInt(gop)
    };
    get_json_data(save_encoder_callback, args);
}
function save_encoder_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dateitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dateitem);
        /*弹出框提示*/
        if (dateitem["result"] == "1") {
            if (NaLanguage == 'zh' ){
                show_toast("成功", "chenggong", 1500)
            }else {
                show_toast("Success", "chenggong", 1500)
            }
        }
    }
}
function show_encord_page_data(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dateitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dateitem);
        $("div[name='encoder_page']").children().find("select[name='resolution']").val(dateitem["resolution"]);
        $("div[name='encoder_page']").children().find("select[name='framerate']").val(dateitem["framerate"]);
        $("div[name='encoder_page']").children().find("select[name='profile']").val(dateitem["profile"]);
        $("div[name='encoder_page']").children().find("select[name='videobitrate']").val(dateitem["videobitrate"]);
        $("div[name='encoder_page']").children().find("select[name='mode']").val(dateitem["mode"]);
        //$("div[name='encoder_page']").children().find("select[name='entropy']").val(dateitem["entropy"]);
        //$("div[name='encoder_page']").children().find("select[name='audiobitrate']").val(dateitem["audiobitrate"]);
        //$("div[name='encoder_page']").children().find("select[name='gop']").val(dateitem["gop"]);
    }
}
//record

/*输出录制*/
function record_page_init_0() {
    var device = $("div[name='record_page']").children().find("select[name='device_0']").val();
    var level = 0;
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_RECORD_ITEM",
        "Arg1": parseInt(device),
        "Arg2": parseInt(level),
        "Arg3": parseInt(0)
    };
    get_json_data(show_record_page_data_0, args);
}
function record_page_device_change_0(objval) {
    var level = $("div[name='record_page']").children().find("select[name='record_level_0']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_RECORD_ITEM",
        "Arg1": parseInt(objval),
        "Arg2": parseInt(level)
    };
    get_json_data(show_record_page_data_0, args);
}
function record_page_level_change_0(objval) {
    var device = $("div[name='record_page']").children().find("select[name='device_0']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_RECORD_ITEM",
        "Arg1": parseInt(device),
        "Arg2": parseInt(objval)
    };
    get_json_data(show_record_page_data_0, args);
}
function record_page_operation() {
    var device = $("div[name='record_page']").children().find("select[name='device_0']").val();
    var level = $("div[name='record_page']").children().find("select[name='record_level_0']").val();
    var encodertype = $("div[name='record_page']").children().find("select[name='encoder_type_0']").val();
    var fmt = $("div[name='record_page']").children().find("select[name='record_fmt_0']").val();
    var name = $("div[name='record_page']").children().find("input[name='file_name_0']").val();
    var duration = $("div[name='record_page']").children().find("select[name='record_duration_0']").val();

    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_RECORD_ITEM",
        "Arg0": parseInt(device),
        "Arg1": parseInt(encodertype),
        "Arg2": parseInt(level),
        "Arg3": parseInt(fmt),
        "Arg4": name,
        "Arg5": parseInt(duration),
        "Arg6": parseInt(0)
    };
    get_json_data(record_page_operation_callback_0, args);
}
function record_page_operation_callback_0(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if ("1" == dataitem["result"]) {
			if(NaLanguage == "zh"){
				 show_toast("成功","chenggong","1500")
			}else {
				show_toast("Success","chenggong","1500")
		    }
            //update_record_event_src_status_0(dataitem["status"]);
        }
    }
}
function show_record_page_data_0(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        $("div[name='record_page']").children().find("select[name='encoder_type_0']").val(dataitem["encoder_type"]);
        $("div[name='record_page']").children().find("select[name='record_fmt_0']").val(dataitem["record_fmt"]);
        $("div[name='record_page']").children().find("input[name='file_name_0']").val(dataitem["filename"]);
        $("div[name='record_page']").children().find("select[name='record_duration_0']").val(dataitem["duration"]);
        //update_record_event_src_status_0(dataitem["status"]);
    }
}

function update_record_event_src_status_0(value) {
    var eventsource = $("div[name='record_page']").children().find("input[name='start_record_0']");
    if ("1" == value) {
        if(NaLanguage == "zh"){
            show_toast("成功","chenggong","1500")
        }else {
            show_toast("Success","chenggong","1500")
        }
    }
}
/*输入录制*/
function record_page_init_1() {
    var device = $("div[name='record_page']").children().find("select[name='device_1']").val();
    var level = 1;
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_RECORD_ITEM",
        "Arg1": parseInt(device),
        "Arg2": parseInt(level),
        "Arg3": parseInt(1)
    };
    get_json_data(show_record_page_data_1, args);
}
function record_page_device_change_1(objval) {
    var level = $("div[name='record_page']").children().find("select[name='record_level_1']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_RECORD_ITEM",
        "Arg1": parseInt(objval),
        "Arg2": parseInt(level)
    };
    get_json_data(show_record_page_data_1, args);
}
function record_page_level_change_1(objval) {
    var device = $("div[name='record_page']").children().find("select[name='device_1']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_RECORD_ITEM",
        "Arg1": parseInt(device),
        "Arg2": parseInt(objval)
    };
    get_json_data(show_record_page_data_1, args);
}
function record_page_operation_1() {
    var device = $("div[name='record_page']").children().find("select[name='device_1']").val();
    var level = $("div[name='record_page']").children().find("select[name='record_level_1']").val();
    var encodertype = $("div[name='record_page']").children().find("select[name='encoder_type_1']").val();
    var fmt = $("div[name='record_page']").children().find("select[name='record_fmt_1']").val();
    var name = $("div[name='record_page']").children().find("input[name='file_name_1']").val();
    var duration = $("div[name='record_page']").children().find("select[name='record_duration_1']").val();

    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_RECORD_ITEM",
        "Arg0": parseInt(device),
        "Arg1": parseInt(encodertype),
        "Arg2": parseInt(level),
        "Arg3": parseInt(fmt),
        "Arg4": name,
        "Arg5": parseInt(duration),
        "Arg6": parseInt(1)
    };
    get_json_data(record_page_operation_callback, args);
}
function record_page_operation_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if ("1" == dataitem["result"]) {
           // update_record_event_src_status_1(dataitem["status"]);
            if(NaLanguage == "zh"){
                show_toast("成功","chenggong","1500")
            }else {
                show_toast("Success","chenggong","1500")
            }
        }
    }
}
function show_record_page_data_1(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        $("div[name='record_page']").children().find("select[name='encoder_type_1']").val(dataitem["encoder_type"]);
        $("div[name='record_page']").children().find("select[name='record_fmt_1']").val(dataitem["record_fmt"]);
        $("div[name='record_page']").children().find("input[name='file_name_1']").val(dataitem["filename"]);
        $("div[name='record_page']").children().find("select[name='record_duration_1']").val(dataitem["duration"]);
        // update_record_event_src_status_1(dataitem["status"]);
    }
}

function update_record_event_src_status_1(value) {
    var eventsource = $("div[name='record_page']").children().find("input[name='start_record_0']");
    if ("1" == value) {
        if(NaLanguage == "zh"){
            $(eventsource).val("停止");
        }else {
            $(eventsource).val("Stop");
        }
    } else {
        if(NaLanguage == "zh") {
            $(eventsource).val("启用");
        }else {
            $(eventsource).val("Start");
        }
    }
}
//stream
function on_device_click(obj) {
    $(obj).addClass("active").siblings().removeClass("active");
    init_pushstream_status();
}

function init_pushstream_status() {
    var device = $("div[name='pushstream_page']").children().find(".active").attr("name");
    get_pushstream_item_status(device, 0);
    get_pushstream_item_status(device, 1);
}
function get_pushstream_item_status(device, level) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_PUSHSTREAM_ITEM",
        "Arg0": parseInt(device),
        "Arg1": parseInt(level)
    };
    get_json_data_ex(pushstream_page_queryitem_callback, args, level);
}
function pushstream_page_queryitem_callback(data, level) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (level == '0') {
            $("div[name='pushstream_page']").find("select[name='rtmp_encoder_type']").val(dataitem["encoder_type"]);
            $("div[name='pushstream_page']").find("input[name='rtmp_url']").val(dataitem["rtmp_url"]);
            if ("1" == dataitem["status"]) {
                $("div[name='pushstream_page']").find("input[name='rtmp_pushstream_operation']").val("暂停");
            } else {
                $("div[name='pushstream_page']").find("input[name='rtmp_pushstream_operation']").val("开始");
            }
        } else if (level == '1') {
            $("div[name='pushstream_page']").find("select[name='rtsp_encoder_type']").val(dataitem["encoder_type"]);
            $("div[name='pushstream_page']").find("input[name='rtsp_port']").val(dataitem["rtsp_port"]);
            $("div[name='pushstream_page']").find("input[name='rtsp_httpport']").val(dataitem["rtsp_httpport"]);
            $("div[name='pushstream_page']").find("input[name='username']").val(dataitem["username"]);
            $("div[name='pushstream_page']").find("input[name='password']").val(dataitem["password"]);
            $("div[name='pushstream_page']").find("input[name='rtsp_sdp']").val(dataitem["rtsp_sdp"]);
            $("div[name='pushstream_page']").find("input[name='rtsp_url']").val(dataitem["rtsp_url"]);

            if ("1" == dataitem["status"]) {
                $("div[name='pushstream_page']").find("input[name='rtsp_pushstream_operation']").val("暂停");
            } else {
                $("div[name='pushstream_page']").find("input[name='rtsp_pushstream_operation']").val("开始");
            }
        } else {

        }
    }
}
function start_rtmp_pushstream() {
    var rtmpzone = $("div[name='pushstream_page']");
    var device = $("div[name='pushstream_page']").children().find(".active").attr("name");
    var rtmpurl = $(rtmpzone).find("input[name='rtmp_url']").val();
    var encodertype = $(rtmpzone).find("select[name='rtmp_encoder_type']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_PUSH_STREAM",
        "Arg0": parseInt(device),
        "Arg1": parseInt(0),//level
        "Arg2": parseInt(1),//streamtype
        "Arg3": parseInt(encodertype),
        "Arg4": parseInt(0),
        "Arg5": parseInt(0),
        "Arg6": "",
        "Arg7": "",
        "Arg8": "",
        "Arg9": rtmpurl
    };
    get_json_data(pushstream_page_operation_callback, args);
}
function start_rtsp_pushstream() {
    var rtspzone = $("div[name='pushstream_page']");
    var device = $("div[name='pushstream_page']").children().find(".active").attr("name");
    var encodertype = $(rtspzone).find("select[name='rtsp_encoder_type']").val();
    var rtsphttpport = $(rtspzone).find("input[name='rtsp_httpport']").val();
    var rtspport = $(rtspzone).find("input[name='rtsp_port']").val();
    var username = $(rtspzone).find("input[name='username']").val();
    var password = $(rtspzone).find("input[name='password']").val();
    var sdp = $(rtspzone).find("input[name='rtsp_sdp']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_PUSH_STREAM",
        "Arg0": parseInt(device),
        "Arg1": parseInt(1),//level
        "Arg2": parseInt(0),//streamtype
        "Arg3": parseInt(encodertype),
        "Arg4": parseInt(rtsphttpport),
        "Arg5": parseInt(rtspport),
        "Arg6": username,
        "Arg7": password,
        "Arg8": sdp,
        "Arg9": ""
    };
    get_json_data(pushstream_page_operation_callback, args);
}
function pushstream_page_operation_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if ("1" == dataitem["level"] && "1" == dataitem["result"]) {
            $("div[name='pushstream_page']").find("input[name='rtsp_url']").val(dataitem["rtsp_url"]);
            if ("1" == dataitem["status"]) {
                $("div[name='pushstream_page']").find("input[name='rtsp_pushstream_operation']").val("暂停");
            } else {
                $("div[name='pushstream_page']").find("input[name='rtsp_pushstream_operation']").val("开始");
            }
        }

        if ("0" == dataitem["level"] && "1" == dataitem["result"]) {
            if ("1" == dataitem["status"]) {
                $("div[name='pushstream_page']").find("input[name='rtmp_pushstream_operation']").val("暂停");
            } else {
                $("div[name='pushstream_page']").find("input[name='rtmp_pushstream_operation']").val("开始");
            }
        }
    }
}
//pull stream
function pullstream_page_init() {
    var device = $("div[name='pullstream_page']").children().find("select[name='device']").val();
    pullstream_page_device_change(device);
}

function pullstream_page_device_change(objval) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_PULLSTREAM_ITEM",
        "Arg0": parseInt(objval)
    };
    get_json_data(pullstream_page_dev_change_callback, args);
}

function pullstream_page_dev_change_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        $("div[name='pullstream_page']").find("input[name='pullstream_url']").val(dataitem["url"]);
        pullstream_page_update_status(dataitem["status"]);
    }
}
function pullstream_operation() {
    var device = $("div[name='pullstream_page']").children().find("select[name='device']").val();
    var url = $("div[name='pullstream_page']").children().find("input[name='pullstream_url']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_PULL_STREAM",
        "Arg0": parseInt(device),
        "Arg1": url
    };
    get_json_data(pullstream_page_operation_callback, args);
}
function pullstream_page_operation_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            pullstream_page_update_status(dataitem["status"]);
        }
    }
}
function pullstream_page_update_status(objval) {
    if ("1" == objval) {
        if (NaLanguage == "zh"){
            $("div[name='pullstream_page']").children().find("input[name='pullstream_operation']").val("停用");
        }else {
            $("div[name='pullstream_page']").children().find("input[name='pullstream_operation']").val("Stop");
        }
    } else {
        if (NaLanguage == "zh") {
            $("div[name='pullstream_page']").children().find("input[name='pullstream_operation']").val("启用");
        }else {
            $("div[name='pullstream_page']").children().find("input[name='pullstream_operation']").val("Start");
        }
    }
}
//osd level
function init_osd_page() {
    var type = $("div[name='osd_page']").children().find("select[name='osd_level']").val();
    var device = 1048577;
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_OSD_ITEM",
        "Arg1": parseInt(type),
        "Arg2": parseInt(device)
    };
    get_json_data(show_osd_page_data, args);
}
function osd_page_device_change(objval) {
    var level = $("div[name='osd_page']").children().find("select[name='osd_level']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_OSD_ITEM",
        "Arg1": parseInt(level),
        "Arg2": parseInt(objval)
    };
    get_json_data(show_osd_page_data, args);
}
function osd_page_level_change(objval) {
    var device = $("div[name='osd_page']").children().find("select[name='device']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_OSD_ITEM",
        "Arg1": parseInt(objval),
        "Arg2": parseInt(device)
    };
    get_json_data(show_osd_page_data, args);
}
function show_osd_page_data(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dateitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dateitem);
        $("div[name='osd_page']").children().find("select[name='osd_type']").val(dateitem["osdtype"]);
        $("div[name='osd_page']").children().find("input[name='osd_contain']").val(dateitem["osdvalue"]);
        $("div[name='osd_page']").children().find("input[name='osd_contain']").attr("klfontcolor", dateitem["fontcolor"]);
        $("div[name='osd_page']").children().find("input[name='osd_contain']").attr("klfontsize", dateitem["fontsize"]);
        $("div[name='osd_page']").children().find("input[name='osd_position']").val(dateitem["osdx"] + "," + dateitem["osdy"] + "," + dateitem["osdwidth"] + "," + dateitem["osdheight"]);
        $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posX", dateitem["osdx"]);
        $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posY", dateitem["osdy"]);
        $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posWidth", dateitem["osdwidth"]);
        $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posHeight", dateitem["osdheight"]);
        //show_osd_setting_status(dateitem["osdstatus"]);
    }
}
function osd_operation() {
    var device = 1048577;
    var level = $("div[name='osd_page']").children().find("select[name='osd_level']").val();
    var type = $("div[name='osd_page']").children().find("select[name='osd_type']").val();
    var value = $("div[name='osd_page']").children().find("input[name='osd_contain']").val();
    var posX = $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posX");
    var posY = $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posY");
    var posWidth = $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posWidth");
    var posHeight = $("div[name='osd_page']").children().find("input[name='osd_position']").attr("posHeight");
    var fontsize = $("div[name='osd_page']").children().find("input[name='osd_contain']").attr("klfontsize");
    var fontcolor = $("div[name='osd_page']").children().find("input[name='osd_contain']").attr("klfontcolor");
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_OSD_PARAM",
        "Arg1": parseInt(device),
        "Arg2": parseInt(level),
        "Arg3": parseInt(type),
        "Arg4": value,
        "Arg5": parseInt(posX),
        "Arg6": parseInt(posY),
        "Arg7": parseInt(posWidth),
        "Arg8": parseInt(posHeight),
        "Arg9": parseInt(fontcolor),
        "Arg10": parseInt(fontsize)
    };
    get_json_data(osd_page_set_callback, args);
}
function osd_page_set_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dateitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dateitem);
        if (dateitem["result"] == "1") {
			if(NaLanguage == "zh"){
				 show_toast("成功","chenggong","1500")
			}else {
				show_toast("Success","chenggong","1500")
			}
            //show_osd_setting_status(dateitem["status"]);
        }
    }
}
function show_osd_setting_status(value) {
    if (value == "0") {
        if (NaLanguage == "zh"){
            $("div[name='osd_page']").children().find("input[name='osd_operation']").val("启用");
        }else {
            $("div[name='osd_page']").children().find("input[name='osd_operation']").val("Start");
        }
    } else if (value == "1") {
        if (NaLanguage == "zh") {
            $("div[name='osd_page']").children().find("input[name='osd_operation']").val("停止");
        }else {
            $("div[name='osd_page']").children().find("input[name='osd_operation']").val("Stop");
        }
    } else {

    }
}
function osd_page_content_setting(obj, type) {
    if (type == "0") {
        var newScript = document.createElement("script");
        newScript.type = "text/javascript";
        newScript.src = "js/jscolor.js";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(newScript);
        build(obj, 4);
    } else if (type == "1") {
        bulid_file_dialog(obj, "*.png");
    }
    if (type == "2") {
        var newScript = document.createElement("script");
        newScript.type = "text/javascript";
        newScript.src = "js/jscolor.js";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(newScript);
        build(obj, 4);
    }
}
//ptz
function setPan(nCmd, nSpeed) {
    var dev_ip = document.getElementById("dev_ip").value;
    var ptz_port = document.getElementById("ptz_port").value;
    var visca_addr = document.getElementById("visca_addr").value;
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_PTZ",
        "Arg1": dev_ip,
        "Arg2": parseInt(ptz_port),
        "Arg3": parseInt(visca_addr),
        "Arg4": parseInt(nSpeed),
        "Arg5": "pan",
        "Arg6": nCmd
    };
    get_json_data("", args);
}
function setZoom(nCmd, nSpeed) {
    var dev_ip = document.getElementById("dev_ip").value;
    var ptz_port = document.getElementById("ptz_port").value;
    var visca_addr = document.getElementById("visca_addr").value;
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_PTZ",
        "Arg1": dev_ip,
        "Arg2": parseInt(ptz_port),
        "Arg3": parseInt(visca_addr),
        "Arg4": parseInt(nSpeed),
        "Arg5": "zoom",
        "Arg6": nCmd
    };
    get_json_data("", args);
}
function setTitle(nCmd) {
    var dev_ip = document.getElementById("dev_ip").value;
    var ptz_port = document.getElementById("ptz_port").value;
    var visca_addr = document.getElementById("visca_addr").value;

    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_PTZ",
        "Arg1": dev_ip,
        "Arg2": parseInt(ptz_port),
        "Arg3": parseInt(visca_addr),
        "Arg4": 0,
        "Arg5": "title",
        "Arg6": nCmd
    };
    get_json_data("", args);
}
function ptz_apply() {
    var camera = $("div[name='ptz_page']").children().find("select[name='camera']").val();
    var ip = $("div[name='ptz_page']").children().find("input[name='camera_ip']").val();
    var port = $("div[name='ptz_page']").children().find("input[name='ptz_port']").val();
    var visca = $("div[name='ptz_page']").children().find("select[name='camera_visca']").val();
    var movespeed = $("div[name='ptz_page']").children().find("select[name='camera_movespeed']").val();

    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_PTZ_ITEM",
        "Arg0": parseInt(camera),
        "Arg1": ip,
        "Arg2": parseInt(port),
        "Arg3": parseInt(visca),
        "Arg4": parseInt(movespeed),
    };
    get_json_data(ptz_apply_callback, args);
}

function ptz_apply_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dateitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dateitem);
        if (dateitem["result"] == "1") {
            if (NaLanguage == "zh"){
                show_toast("成功", "chenggong", 1500);
            }else {
                show_toast("Success", "chenggong", 1500);
            }
        }
    }
}

function ptz_page_init() {
    var camera = $("div[name='ptz_page']").children().find("select[name='camera']").val();
    ptz_page_camera_change(camera);
}
function ptz_page_camera_change(objval) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_PTZ_ITEM",
        "Arg0": parseInt(objval),
    };
    get_json_data(ptz_page_camera_change_callback, args);
}
function ptz_page_camera_change_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dateitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dateitem);
        $("div[name='ptz_page']").children().find("input[name='camera_ip']").val(dateitem["ipaddress"]);
        $("div[name='ptz_page']").children().find("input[name='ptz_port']").val(dateitem["tcp_port"]);
        $("div[name='ptz_page']").children().find("select[name='camera_visca']").val(dateitem["visca_address"]);
        $("div[name='ptz_page']").children().find("select[name='camera_movespeed']").val(dateitem["horizon_speed"]);
    }
}
//device information
function init_device_page() {
    var device = $("div[name='device_page']").children().find("select[name='device']").val();
    device_page_device_change(device);
}

function device_page_device_change(objval) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_DEVICE_INFO_ITEM",
        "Arg1": parseInt(objval)
    };
    get_json_data(show_device_page_data, args);
}
function show_device_page_data(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dateitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dateitem);
        if ("1" == dateitem["iswork"]) {
            $("div[name='device_page']").children().find("input[name='vsrc']").val(dateitem["videoinput"]);
            $("div[name='device_page']").children().find("input[name='asrc']").val(dateitem["audioinput"]);
            $("div[name='device_page']").children().find("input[name='resolution']").val(dateitem["width"] + "*" + dateitem["height"]);
            $("div[name='device_page']").children().find("input[name='framerate']").val(dateitem["framerate"]);
            $("div[name='device_page']").children().find("input[name='audio_channel']").val(dateitem["channels"]);
            $("div[name='device_page']").children().find("input[name='audio_bits_persample']").val(dateitem["bitspersample"]);
            $("div[name='device_page']").children().find("input[name='audio_sample_freq']").val(dateitem["samplefrequency"]);
        } else {
            $("div[name='device_page']").children().find("input[name='vsrc']").val("-");
            $("div[name='device_page']").children().find("input[name='asrc']").val("-");
            $("div[name='device_page']").children().find("input[name='resolution']").val("-");
            $("div[name='device_page']").children().find("input[name='framerate']").val("-");
            $("div[name='device_page']").children().find("input[name='audio_channel']").val("-");
            $("div[name='device_page']").children().find("input[name='audio_bits_persample']").val("-");
            $("div[name='device_page']").children().find("input[name='audio_sample_freq']").val("-");
        }
    }
}
//回放
function fileplay_page_init() {
    var device = $("div[name='fileplay_page']").children().find("select[name='device']").val();
    fileplay_page_device_change(device);
}

function fileplay_page_device_change(objval) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_PLAYBACK_ITEM",
        "Arg0": parseInt(objval),
    };
    get_json_data(fileplay_page_dev_change_callback, args);
}

function fileplay_page_dev_change_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        $("div[name='fileplay_page']").find("input[name='fileplay_path']").val(dataitem["path"]);
        fileplay_page_update_status(dataitem["status"]);
    }
}
function fileplay_operation() {
    var device = $("div[name='fileplay_page']").children().find("select[name='device']").val();
    var path = $("div[name='fileplay_page']").children().find("input[name='fileplay_path']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_START_PLAYBACK",
        "Arg0": parseInt(device),
        "Arg1": path
    };
    get_json_data(fileplay_page_operation_callback, args);
}
function fileplay_page_operation_callback(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            fileplay_page_update_status(dataitem["status"]);
        }
    }
}
function fileplay_page_update_status(objval) {02

    if ("1" == objval) {
        if (NaLanguage == "zh"){
            $("div[name='fileplay_page']").children().find("input[name='fileplay_operation']").val("卸载");
        }else {
            $("div[name='fileplay_page']").children().find("input[name='fileplay_operation']").val("unload");
        }
    } else {
        if (NaLanguage == "zh") {
            $("div[name='fileplay_page']").children().find("input[name='fileplay_operation']").val("加载");
        }else {
            $("div[name='fileplay_page']").children().find("input[name='fileplay_operation']").val("Load");
        }
    }
}
/*配置-网络-状态input输入*/
function net_work_access(obj){
	 var p1 = $(obj).val();
        if (p1 == 0) {
            $(".tab_1").attr("disabled", false);
        }else{
            $(".tab_1").attr({"disabled": "disabled"});
        }
}

var str_loading = '<div class="box_loading"><div class="loading"><span></span></div><div id="bar"></div></div>';

/*轮播页面*/

function set_rotate_rules(rules) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_ROTATE_PLAYBACK",
        "Arg0": rules.toString()
    };
    get_json_data(set_rotate_callback, args);
}

function set_rotate_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            if(NaLanguage == "zh"){
                show_toast("成功", "chenggong", 1500);
            }else {
                show_toast("Success", "chenggong", 1500);
            }
        }
    }
   
}

function init_rotate_rules(){
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_ROTATE_PLAYBACK_LIST",
    };
    get_json_data(init_rotate_callback, args);
}

function init_rotate_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        $(".cast_title").children().not(":first").remove();
        dataitem.forEach(function(v,i){
            if(i<5){
                add_rotate_item(v.name,v.time);
            }
        });
    }
}

function rotate_operation() {
    var rotateitemarr = $(".cast_title").children(".cast_box").map(function(){
        var deviceval=$(this).find("select[name='device']").val();
        var minutes=$(this).find("select[name='time_fen']").val();
        var seconds=$(this).find("select[name='time_miao']").val();
        var time=parseInt(minutes)*60+parseInt(seconds);
        var name=parseInt(deviceval);
        return {name,time};
    }).toArray();

    var devicearr=$.map(rotateitemarr,function(value){
        return value["name"];
    });

    var uniquedevlist=$.unique(devicearr);
    if(uniquedevlist.length != rotateitemarr.length){
        if (NaLanguage == "zh"){
            show_toast("设备名重复", "shibai", 1500);
        }else {
            show_toast("Device name repetition", "shibai", 1500);
        }
        return;
    }

    var datafilterarray = $.grep(rotateitemarr,function(el,index){
        return el["time"] > 0;
    });

    if(datafilterarray.length != rotateitemarr.length){
        if (NaLanguage == "zh"){
            show_toast("提交不能为空", "shibai", 1500);
        }else {
            show_toast("Submission can not be empty", "shibai", 1500);
        }
        return;
    }
    set_rotate_rules(JSON.stringify(rotateitemarr));
}


function add_rotate_item(){
    var cast = '<div class="cast_box">'+
        '<div class="input_name">'+
        '<select  name="device" class="device_01 box_height active_cast"><option value="3" selected="selected">CH1</option><option value="2">CH2</option><option value="1">CH3</option><option value="0">CH4</option></select>'+
        '</div>'+
        '<div class="input_time"><select  class="time_fen"  name="time_fen"  value="" placeholder="00"></select><i class="fen_left"  data-locale="min" >分</i><select  class="time_miao" name="time_miao" value="" placeholder="00" ></select><i class="fen_left"  data-locale="sec" >秒</i></div><div class="del" data-locale="delete" onclick="del_rotate_item(this)">删除</div></div>';

    var cast_lenght = $(".cast_box").length;
    var options = $(".device_01 option:selected");  //获取选中的项
    var sels = $('.input_name .device_01');
    if (cast_lenght < 5) {
        $(".cast_title").append(cast);
        var newitem=$(".cast_title").children(":last-child");
        var secs=0;
        for (secs=0;secs<60;secs++){
            newitem.find("select[name='time_fen']").append("<option value='"+secs+"'>"+secs+"</option>");
            newitem.find("select[name='time_miao']").append("<option value='"+secs+"'>"+secs+"</option>");
        }
    } else {
        show_toast("最多添加5个", "shibai", 1500);
    }
}


function add_rotate_item(name,time){
    var cast_zh = '<div class="cast_box">'+
        '<div class="input_name">'+
        '<select  name="device" class="device_01 box_height active_cast"><option value="3" selected="selected">CH1</option><option value="2">CH2</option><option value="1">CH3</option><option value="0">CH4</option></select>'+
        '</div>'+
        '<div class="input_time"><select  class="time_fen"  name="time_fen"  value="" placeholder="00"></select><i class="fen_left"  data-locale="min" >分</i><select  class="time_miao" name="time_miao" value="" placeholder="00" ></select><i class="fen_left"  data-locale="sec" >秒</i></div><div class="del" data-locale="delete" onclick="del_rotate_item(this)">删除</div></div>';
    var cast_en = '<div class="cast_box">'+
        '<div class="input_name">'+
        '<select  name="device" class="device_01 box_height active_cast"><option value="3" selected="selected">CH1</option><option value="2">CH2</option><option value="1">CH3</option><option value="0">CH4</option></select>'+
        '</div>'+
        '<div class="input_time"><select  class="time_fen"  name="time_fen"  value="" placeholder="00"></select><i class="fen_left"  data-locale="min" >分</i><select  class="time_miao" name="time_miao" value="" placeholder="00" ></select><i class="fen_left"  data-locale="sec" >秒</i></div><div class="del" data-locale="删除" onclick="del_rotate_item(this)">delete</div></div>';

    var cast_lenght = $(".cast_box").length;
    var options = $(".device_01 option:selected");  //获取选中的项
    var sels = $('.input_name .device_01');
    if (cast_lenght < 5) {
        if (NaLanguage == "zh"){
            $(".cast_title").append(cast_zh);
        }else {
            $(".cast_title").append(cast_en);
        }
        var newitem=$(".cast_title").children(":last-child");
        var secs=0;
        for (secs=0;secs<60;secs++){
            newitem.find("select[name='time_fen']").append("<option value='"+secs+"'>"+secs+"</option>");
            newitem.find("select[name='time_miao']").append("<option value='"+secs+"'>"+secs+"</option>");
        }

        var timeval=parseInt(time);
        newitem.find("select[name='device']").val(parseInt(name));
        newitem.find("select[name='time_fen']").val(timeval / 60);
        newitem.find("select[name='time_miao']").val(timeval % 60);
    }
}

//删除添加的项
function del_rotate_item(obj){
    $(obj).parents('.cast_box').remove();
}


/*WIFI*/
function wifi_setting_apply(){
    var ssid=$("div[name='setting_page']").find("input[name='wifi_ssid']").val();
    var encrtmod=$("div[name='setting_page']").find("select[name='wifi_encryption_mode']").val();
    var pwd=$("div[name='setting_page']").find("input[name='wifi_password']").val();
    if(ssid.length == 0 || pwd.length < 8){
		show_toast("格式错误","shibai",1500)
        return;
    }
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_WIFI",
        "Arg0": ssid,
        "Arg1": pwd,
        "Arg2": parseInt(encrtmod)
    };
    get_json_data(set_wifi_callback, args);
}
function set_wifi_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            show_toast("成功","chenggong",1500)
        }
    }
}

function init_wifi_setting(){
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_WIFI",
    };
    get_json_data(init_wifi_setting_callback, args);
}

function init_wifi_setting_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            $("div[name='setting_page']").find("input[name='wifi_ssid']").val(dataitem["ssid"]);
            $("div[name='setting_page']").find("select[name='wifi_encryption_mode']").val(dataitem["authmode"]);
            $("div[name='setting_page']").find("input[name='wifi_password']").val(dataitem["password"]);
        }
    }
}



//network
function network_setting_apply(){
    var access=$("div[name='setting_page']").find("select[name='network_access']").val();
    var ipaddress=$("div[name='setting_page']").find("input[name='network_ip_address']").val();
    var mask=$("div[name='setting_page']").find("input[name='network_mask']").val();
    var deft=$("div[name='setting_page']").find("input[name='network_default']").val();
    var dns=$("div[name='setting_page']").find("input[name='network_dns']").val();
    var todns=$("div[name='setting_page']").find("input[name='network_to_dns']").val();
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_NETWORK",
        "Arg0": parseInt(access),
        "Arg1": ipaddress,
        "Arg2": mask,
        "Arg3": deft,
        "Arg4": dns,
        "Arg5": todns
    };
    get_json_data(network_setting_apply_callback, args);
}

function network_setting_apply_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1" ) {
            show_toast("成功","chenggong",1500)
        }
    }
}

function init_net_work(){
    //取 网络信息
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_NETWORK"
    };
    get_json_data(init_net_work_callback, args);
}

function init_net_work_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
		var net_dhcp=$("div[name='setting_page']").find("select[name='network_access']");
        net_dhcp.val(dataitem["dhcp"]);
        $("div[name='setting_page']").find("input[name='network_ip_address']").val(dataitem["ip"]);
        $("div[name='setting_page']").find("input[name='network_mask']").val(dataitem["submask"]);
        $("div[name='setting_page']").find("input[name='network_default']").val(dataitem["getway"]);
        $("div[name='setting_page']").find("input[name='network_dns']").val(dataitem["maindns"]);
        $("div[name='setting_page']").find("input[name='network_to_dns']").val(dataitem["subdns"]);
		net_work_access(net_dhcp);
    }
}
/*密码*/
function password_setting_apply(){
    var upad=$("div[name='setting_page']").find("input[name='used_password']").val();
    var npad=$("div[name='setting_page']").find("input[name='new_password']").val();
    var pwd=$("div[name='setting_page']").find("input[name='confirm_password']").val();
    if (upad ==''){
        if (NaLanguage == "zh"){
            show_toast("原密码不能为空","shibai",1500)
        }else {
            show_toast("Old ciphers can't be empty","shibai",1500)
        }
        return
    }
    if (npad ==''){
        if (NaLanguage == "zh"){
            show_toast("新密码不能为空","shibai",1500)
        }else {
            show_toast("New password can not be empty","shibai",1500)
        }
        return
    }
    if (pwd == ''){
        if (NaLanguage == "zh"){
            show_toast("确认新密码","shibai",1500)
        }else {
            show_toast("Confirm the new password","shibai",1500)
        }
        return
    }
    if (npad != pwd){
        if (NaLanguage == "zh"){
            show_toast("新密码输入不一致","shibai",1500)
        }else {
            show_toast("New password inconsistencies","shibai",1500)
        }
        return
    }
    if (upad.length < 4 && npad.length < 4 && pwd.length < 4){
        if (NaLanguage == "zh"){
            show_toast("长度不能小于4位","shibai",1500)
        }else {
            show_toast("The length can not be less than 4 bits","shibai",1500)
        }
        return
    }

    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_MODIFY_PASSWORD",
        "Arg1": upad,
        "Arg2": npad
    };
    get_json_data(set_password__callback, args);


}
function set_password__callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            if (NaLanguage == "zh"){
                show_toast("修改成功","chenggong",1500)
            }else {
                show_toast("Amend the success","chenggong",1500)
            }
        }
    }
}


//系统版本号
function init_device_version(){
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_DEVICE_VERSION"
    };
    get_json_data(int_device_version_callback, args);
}

function int_device_version_callback(data){
    //{\"result\":\"%1\",\"version\":\"%2\"}
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
             $("div[name='setting_page']").find("input[name='version']").val(dataitem["version"]);
        }
    }
}

function file_upload_change(obj){
	$("#blueButton").val($(obj).val().substr($(obj).val().lastIndexOf('\\')+1));
}

function device_upgrade(){
	
	/*if($("#upfile").val()){
	    $.post("/_dev_update", JSON.stringify({
	    	'qcapid'    : "53434352514B4352",
		    'Function'  : 'SYSTEM_FIRMWARE_UPDATE',
    	})
	    ).done(function(data) {
    	    // console.log("data = " + data);
			$.unblockUI();
			window.location.href = "/wait.html";
    	}).fail(function(response, textStatus, errorThrown) {
	        if(response.status == 401) {
    	        console.log("unauthorized!!");
        	    window.location.href = "/logout.html";
            	return;
	        }

	        // setTimeout(on_reboot, 500);
    	}).always(function(){
        	// console.log("on_reboot: always");
		});
	}else{
			setTimeout($.unblockUI, 500);
	}*/
	
	/*	
	$('#fileupload').fileupload({
        url: '',
        dataType: 'json',
// 上传完成后的执行逻辑
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('<p/>').text(file.name).appendTo(document.body);
            });
        },
// 上传过程中的回调函数
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('body').append(str_loading);
            setTimeout(function () {
                $(".box_loading").fadeOut(1000);
                $(".box_loading").remove();
            }, progress);
            $("#bar").text(progress + '%');
            if (progress == 100) {
                $("#blueButton").removeClass("blueButton").addClass("blueButton01");
            }

        }
    });*/
}

//重置
function reset_device(){
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SYSTEM_RESTORE"
    };
    get_json_data(reset_device_callback, args);
}

function reset_device_callback(data){
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            $(".show_model_0").hide(500);
            show_toast("成功","chenggong",1500)
        }
    }
}

/*重启系统*/
function restart_device(){
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SYSTEM_REBOOT"
    };
    get_json_data(restart_device_callback, args);
}

function restart_device_callback(data){

    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var dataitem = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(dataitem);
        if (dataitem["result"] == "1") {
            $(".show_model_1").hide(500);
            show_toast("成功","chenggong",1500)
        }
    }
}
function restart_device_1() {
    $(".show_model_1").show(500);
}
function reset_device_0() {
    $(".show_model_0").show(500);
}
function div_show_cancel(){
    $(".show_model_0").hide(500);
    $(".show_model_1").hide(500);
}
/*弹出提示框*/
function show_toast(text, imgsrc, time) {
    var str = '<div class="toast">\
            <img src="./image/' + imgsrc + '.png">\
            <h3>' + text + '</h3>\
        </div>';

    $('body').append(str);
    if (!time) {
        time = 2000;
    }
    setTimeout(function () {
        $(".toast").fadeOut(500);
        $(".toast").remove();
    }, time);
}
