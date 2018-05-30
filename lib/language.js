var NaLanguage = 'zh';
$(function () {
    $('#shezhi2').change(function () {
        NaLanguage = $('#shezhi2 option:selected').val();
       // console.log(NaLanguage);
        $.i18n.properties({
            name : 'strings',  //配置文件名部分
            path : 'i18n/',    //排位置文件坐在文件位置
            mode : 'map',
            language : NaLanguage,  //对应选择的配置文件
            callback : function () {
                $('[data-locale]').each(function () {
                    if ($(this).hasClass('valfont')) {
                        $(this).val($.i18n.prop($(this).data('locale')));
                    } else {
                        $(this).html($.i18n.prop($(this).data('locale')));
                    }
                });
                if (NaLanguage == "zh"){
                    $(".toggle-ctrl").addClass("toggle-hunyin").removeClass("toggle-hunyin-en")
                }else {
                    $(".toggle-ctrl").addClass("toggle-hunyin-en").removeClass("toggle-hunyin")
                }
            }
        });
    })
});