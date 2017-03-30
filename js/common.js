/**
 * Created by chaoqin on 16/8/18.
 */

'use strict';

;(function($,global){
    var fmm = {
        //网站基础字体大小
        baseSize: function(){
            document.documentElement.style.cssText = 'font-size:' + (document.body.offsetWidth / 1920) * 100 + 'px';
            $(window).resize(function(){
                document.documentElement.style.cssText = 'font-size:' + (document.body.offsetWidth / 1920) * 100 + 'px';
            });
        },
        showDialog: function(pop){
            if(!$(".mask").length){
                $("body").append("<div class='mask'></div>");
            }

            var _wHeight = $(window).height(), _popHeight = $(pop).height(), _popTop = (_wHeight - _popHeight) / 2;

            $(pop).css({"top": _popTop}).show();
            $(".mask").fadeIn();
        },
        closeDialog: function(pop){
            $(pop + ", .mask").fadeOut();
        },
        getData: function(url,cb){
            var _index = url.indexOf("?");
            if(_index == -1){
                url = url + "?ran=" + Math.ceil(Math.random()*1000000);
            }else{
                url = url + "&ran=" + Math.ceil(Math.random()*1000000);
            }
            $.ajax({
                url: url,
                type: "get",
                dataType: "json",
                success: function(d){
                    if(cb){
                        cb(d);
                    }
                }
            })
        },
        setLocalArrayItem: function(k, v){
            var _array = window.localStorage[k] ? window.localStorage[k].split(",") : [];
            for(var i = 0; i < _array.length; i++){
                if(v == _array[i] || v == ""){
                    return;
                }
            }
            _array.unshift(v);

            window.localStorage.setItem(k, _array.toLocaleString());
        },
        getLocalArrayItem: function(k){
            return window.localStorage[k] ? window.localStorage[k].split(",") : [];
        },
        countdown: function(){
            var _timer, _number = 60, _str = "";

            _str += "<div class='timer'>";
            _str += "   <div class='timer-main'>";
            _str += "       <div class='timer-line'>";
            _str += "           <div class='line-time' id='timeNum'>"+_number+"''</div>";
            _str += "           <div class='line-wrap'><div class='cur-line' id='timeLine'></div></div>";
            _str += "       </div>";
            _str += "       <a href='javascript:;' id='goHome'>返回首页</a>";
            _str += "    </div>";
            _str += "</div>";

            $("body").append(_str);

            var _move = function(){
                _number-= 1/60;

                $("#timeNum").text(Math.ceil(_number)+"''");
                $("#timeLine").css({"width": _number*(100/60)+"%"});

                if(_number <= 0){
                    window.location.href="/";
                    return false;
                }else{
                    requestAnimationFrame(_move);
                }
            };

            requestAnimationFrame(_move);

            $("#goHome").click(function(){
                window.location.href="/";
            });
        },
        count: function(opt){
            var _input = opt.input || ".inputs input",
                _val = parseInt($(_input).val()),
                _addBtn = opt.addBtn || ".plus",
                _minusBtn = opt.minusBtn || ".minus",
                _maxNum = opt.maxNum ? opt.maxNum : "";

            $(_addBtn).click(function(){
                _val++;

                if(_maxNum != "" && _val>_maxNum){
                    alert("最多只能选择"+_maxNum+"份!");
                    return false;
                }
                $(_input).val(_val);
            });

            $(_minusBtn).click(function(){
                _val--;

                if(_val < 1){
                    alert("最少选择1份!");
                    _val = 1;
                }

                $(_input).val(_val);
            });
        }
    };

    fmm.baseSize();

    global.fmm = fmm;
})(jQuery,window);