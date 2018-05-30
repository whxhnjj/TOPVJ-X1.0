function toggleCtrl(toggle) {
    if ($(toggle).attr("name") == 'out') {
        $(toggle).toggleClass('toggle-on').toggleClass('toggle-off').addClass('toggle-moving');
        set_audio_channel(10);
    } else if ($(toggle).attr("name") == 'toggle') {
        if (NaLanguage == "zh"){
            $(toggle).toggleClass('toggle-hunyin').toggleClass('toggle-gensui').addClass('toggle-moving');
            var isHunYin = $(toggle).hasClass('toggle-hunyin');
            set_output_audio_type(isHunYin);
        }else {
            $(toggle).toggleClass('toggle-hunyin-en').toggleClass('toggle-gensui-en').addClass('toggle-moving');
            var isHunYin = $(toggle).hasClass('toggle-hunyin-en');
            set_output_audio_type(isHunYin);
        }
    } else {
        $(toggle).toggleClass('toggle-lineln').toggleClass('toggle-sdi').addClass('toggle-moving');
        if ($(toggle).attr("name") == 'toggle_button_1') {
            set_audio_channel(0);
        } else if ($(toggle).attr("name") == 'toggle_button_2') {
            set_audio_channel(1);
        } else if ($(toggle).attr("name") == 'toggle_button_3') {
            set_audio_channel(2);
        } else if ($(toggle).attr("name") == 'toggle_button_4') {
            set_audio_channel(3);
        }
    }
    setTimeout(function () {
        $(toggle).removeClass('toggle-moving');
    }, 200);
    audio_page_init();
}

var isLineln = false;
function isChecked(toggle) {
    if ($(toggle).hasClass("toggle-sdi")) {
        isLineln = true;
    } else {
        isLineln = false;
    }
    return isLineln;
}


function set_volume_progress(btn, bar, text, moveleft) {
    var progress_btn = $("div[name='" + btn + "']");
    var progress_bar = $("div[name ='" + bar + "']");
    var content = $("div[name ='" + text + "']");
    if (moveleft <= 0) {
        moveleft = 0;
    } else if (moveleft > 255) {
        moveleft = 255;
    }
    progress_btn.css('left', moveleft);
    progress_bar.width(moveleft);
    content.html(parseInt((moveleft / 255) * 100) + '%');
}


function volumeProgress(btn, audio, bg, bar, text) {
    var width = 0;
    var moveleft = 0;
    var progress_bgleft = 0;
    var tag = false;
    var progress_btn = $("div[name='" + btn + "']");
    var audio_progress = $("div[name='" + audio + "']");
    var progress_bg = $("div[name='" + bg + "']");
    var progress_bar = $("div[name ='" + bar + "']");
    var content = $("div[name ='" + text + "']");

    progress_btn.on('touchstart', function (e) {
        e.preventDefault();
        var startX = e.originalEvent.targetTouches[0].pageX;
        width = startX - moveleft;
        tag = true;
        console.log('width:' + width);
    });

    progress_btn.on('touchend', function () {
        console.log(progress_btn);
        tag = false;
        if (btn == "audio_channel_out") {
            console.log("audio_channel_out");
            set_audio_volume(10, moveleft);
        } else if (btn == "audio_channel_1") {
            set_audio_volume(0, moveleft);
        } else if (btn == "audio_channel_2") {
            set_audio_volume(1, moveleft);
        } else if (btn == "audio_channel_3") {
            set_audio_volume(2, moveleft);
        } else if (btn == "audio_channel_4") {
            set_audio_volume(3, moveleft);
        }
    });

    audio_progress.on('touchmove', function (e) {
        e.preventDefault();
        var moveX = e.originalEvent.targetTouches[0].pageX;
        if (tag) {
            moveleft = moveX - width;
            if (moveleft <= 0) {
                moveleft = 0;
            } else if (moveleft > 255) {
                moveleft = 255;
            }
            progress_btn.css('left', moveleft);
            progress_bar.width(moveleft);
            content.html(parseInt((moveleft / 255) * 100) + '%');
        }
    });


    progress_bg.on('touchstart', function (e) {
        e.preventDefault();
        var startX = e.originalEvent.targetTouches[0].pageX;
        if (!tag) {
            progress_bgleft = progress_bg.offset().left;
            moveleft = startX - progress_bgleft;
            if (moveleft <= 0) {
                moveleft = 0;
            } else if (moveleft > 255) {
                moveleft = 255;
            }
            progress_btn.css('left', moveleft);
            progress_bar.width(moveleft);
            content.html(parseInt((moveleft / 255) * 100) + '%');
        }
    });
}


$(function () {
    volumeProgress('audio_channel_out', 'audio_progress_out', 'access_bg_out', 'progress_bar_out', 'text_out');
    volumeProgress('audio_channel_1', 'audio_progress_1', 'access_bg_1', 'progress_bar_1', 'text_1');
    volumeProgress('audio_channel_2', 'audio_progress_2', 'access_bg_2', 'progress_bar_2', 'text_2');
    volumeProgress('audio_channel_3', 'audio_progress_3', 'access_bg_3', 'progress_bar_3', 'text_3');
    volumeProgress('audio_channel_4', 'audio_progress_4', 'access_bg_4', 'progress_bar_4', 'text_4');
});


function set_output_audio_type(isMixer) {
    var type = 1;
    if (isMixer) {
        type = 0;
    }
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_AUDIO_OUTPUT_TYPE",
        "Arg1": parseInt(type)
    };
    get_json_data("", args);
}


function audio_page_init() {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_GET_AUDIO_LIST"
    };
    get_json_data(show_audio_page_data, args);
}

function show_audio_page_data(data) {
    var recvdata = data["ResData"];
    console.log("get response data: " + recvdata);
    if (typeof(recvdata) != "undefined") {
        var parsedata = JSON.parse(recvdata);
        console.log("parse response data:");
        console.log(parsedata);
        $.each(parsedata, function (index, node) {
            var audionum = node["audionum"];
            var volume = node["volume"];
            var enable = node["enable"];
            if (audionum == "0") {
                if (enable == "1") {
                    $("#audio-page").find("[name='toggle_button_1']").addClass('toggle-lineln').removeClass('toggle-sdi');
                } else {
                    $("#audio-page").find("[name='toggle_button_1']").addClass('toggle-sdi').removeClass('toggle-lineln');
                }
                set_volume_progress("audio_channel_1", "progress_bar_1", "text_1", parseInt(volume));
            } else if (audionum == "1") {
                if (enable == "1") {
                    $("#audio-page").find("[name='toggle_button_2']").addClass('toggle-lineln').removeClass('toggle-sdi');
                } else {
                    $("#audio-page").find("[name='toggle_button_2']").addClass('toggle-sdi').removeClass('toggle-lineln');
                }
                set_volume_progress("audio_channel_2", "progress_bar_2", "text_2", parseInt(volume));
            } else if (audionum == "2") {
                if (enable == "1") {
                    $("#audio-page").find("[name='toggle_button_3']").addClass('toggle-lineln').removeClass('toggle-sdi');
                } else {
                    $("#audio-page").find("[name='toggle_button_3']").addClass('toggle-sdi').removeClass('toggle-lineln');
                }
                set_volume_progress("audio_channel_3", "progress_bar_3", "text_3", parseInt(volume));
            } else if (audionum == "3") {
                if (enable == "1") {
                    $("#audio-page").find("[name='toggle_button_4']").addClass('toggle-lineln').removeClass('toggle-sdi');
                } else {
                    $("#audio-page").find("[name='toggle_button_4']").addClass('toggle-sdi').removeClass('toggle-lineln');
                }
                set_volume_progress("audio_channel_4", "progress_bar_4", "text_4", parseInt(volume));
            } else if (audionum == "10") {
                if (enable == "1") {
                    $("#audio-page").find("[name='out']").addClass('toggle-on').removeClass('toggle-off');
                } else {
                    $("#audio-page").find("[name='out']").addClass('toggle-off').removeClass('toggle-on');
                }
                set_volume_progress("audio_channel_out", "progress_bar_out", "text_out", parseInt(volume));
            } else if (audionum == "11") {
                if (enable == "1") {
                    if (NaLanguage == "zh"){
                        $("#audio-page").find("[name='toggle']").addClass('toggle-hunyin').removeClass('toggle-gensui');
                    }else {
                        $("#audio-page").find("[name='toggle']").addClass('toggle-hunyin-en').removeClass('toggle-gensui-en');
                    }
                } else {
                    if (NaLanguage == "zh") {
                        $("#audio-page").find("[name='toggle']").addClass('toggle-gensui').removeClass('toggle-hunyin');
                    }else {
                        $("#audio-page").find("[name='toggle']").addClass('toggle-gensui-en').removeClass('toggle-hunyin-en');
                    }
                }
            } else {

            }
        });

    }
}


function set_audio_channel(audionum) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_AUDIO_CHANNEL",
        "Arg1": parseInt(audionum)
    };
    get_json_data("", args);
}

function set_audio_volume(audionum, value) {
    var args = {
        "sessid": $.cookie("sessid"),
        "Function": "APPS_SET_AUDIO_VOLUME",
        "Arg1": parseInt(audionum),
        "Arg2": parseInt(value)
    };
    get_json_data("", args);
}





