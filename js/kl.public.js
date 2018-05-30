var _json_service = "/kalonserver";
function get_login_json(callback, args) {
    $.post(_json_service, JSON.stringify(args)
    ).done(function (data) {
        if ("" != callback) {
            callback(data);
        }
    }).fail(function (response, textStatus, errorThrown) {
    }).always(function () {
    });
}

function get_json_data(callback, args) {
  // update_login_session();
    $.post(_json_service, JSON.stringify(args)
    ).done(function (data) {
        if ("" != callback) {
            callback(data);
        }
    }).fail(function (response, textStatus, errorThrown) {
    }).always(function () {
    });
}

function get_json_data_ex(callback, args, obj) {
  //  update_login_session();
    $.post(_json_service, JSON.stringify(args)
    ).done(function (data) {
        if ("" != callback) {
            callback(data, obj);
        }
    }).fail(function (response, textStatus, errorThrown) {
    }).always(function () {
    });
}

function update_login_session() {
    var sessid = $.cookie("sessid");
    if (sessid == null || sessid == -1 || sessid == "undefined") {
        window.location.href = "/login.html";
    } else {
        var date = new Date();
        date.setTime(date.getTime() + 10 * 60 * 1000);
        $.cookie("sessid", "", -1);
        $.cookie("sessid", sessid, {expires: date});
    }
}
