(function () {
  function ieVersion() {
    var userAgent = navigator.userAgent;
    var isLessIE11 =
      userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isLessIE11;
    var isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isLessIE11) {
      var IEReg = new RegExp("MSIE (\\d+\\.\\d+);");
      IEReg.test(userAgent);
      var IEVersionNum = parseFloat(RegExp["$1"]);
      if (IEVersionNum === 7) {
        return 7;
      } else {
        if (IEVersionNum === 8) {
          return 8;
        } else {
          if (IEVersionNum === 9) {
            return 9;
          } else {
            if (IEVersionNum === 10) {
              return 10;
            } else {
              return 6;
            }
          }
        }
      }
    } else {
      if (isEdge) {
        return "edge";
      } else {
        if (isIE11) {
          return 11;
        } else {
          return -1;
        }
      }
    }
  }
  var recommendBowser = {
    render: function () {
      var temp =
        '<div class="explorer-com-bg"></div>' +
        '<div class="unuse-explorer-pop1">' +
        '<i class="close-pop"></i>' +
        '<div class="pop-text-box"></div>' +
        '<div class="pop-top-bgimg">' +
        '<p class="ex-t1">您使用的浏览器版本过低！</p>' +
        '<p class="ex-t2">可能无法正常浏览，您可以选择</p></div>' +
        '<div class="guide-down-btn"><a class="down-ex2345" href="http://ie.2345.cc/" target="_blank">2345加速浏览器&nbsp;&gt;</a>' +
        '<a class="down-exie" href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank">直接下载更新IE浏览器&nbsp;&gt;</a>' +
        "</div></div>";
      $("body").append(temp);
    },
    init: function () {
      if (ieVersion() != "-1" && ieVersion() <= 9) {
        this.render();
      }
    },
  };
  recommendBowser.init();
})();
