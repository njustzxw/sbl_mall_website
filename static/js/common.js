function modal_msg_top(id1, id2) {
    var H = $(window).height()
    var h = $("#" + id2).height();
    $("#" + id1).modal('show')
    $("#" + id2).css("margin-top", (H - h) / 2) //设置弹框top使其居中

    $("#header").css('padding-right', getScrollbarWidth() + 'px')
    $("#" + id1).on('hidden.bs.modal', function(e) {
        $("#header").css('padding-right', '')
    })
}

//提醒弹框
function ti_xing(Main) {
    $("#tx_text").html(Main)
    $("#ti_xing").modal("show")
        // modal_msg_top("ti_xing", "ti_xing_msg")
}
//计算滚动条的宽度
function getScrollbarWidth() {
    var scrollbarWidth = '';
    var oP = $('<p></p>')[0] //document.createElement('p');
    var styles = {
        width: '100px',
        height: '100px',
        overflowY: 'scroll'
    };
    var i;
    for (i in styles) oP.style[i] = styles[i];
    document.body.appendChild(oP);
    scrollbarWidth = oP.offsetWidth - oP.clientWidth;
    oP.parentNode.removeChild(oP);
    return scrollbarWidth;
}