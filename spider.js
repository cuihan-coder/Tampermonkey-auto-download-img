// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.zedge.net/wallpapers
// @grant        none
// ==/UserScript==

(function() {
    var timer;
    var currentpos = 0;
    var img = '';
    var rowinsidecolnum = 5;
     var newrownum = 0;
    window.onload = function(){
        //每一行元素出现几个 都作为一次元素添加处理

        window.addEventListener("DOMNodeInserted", function (event) {
            --rowinsidecolnum;
            if(rowinsidecolnum == 0){
                rowinsidecolnum = 5
                ++newrownum;
            }

            if( newrownum == 15){
                var imgs = document.querySelectorAll('img');
                var length = imgs.length;

                for(var i = 0;i < length; i++){
                    img+= (imgs[i].src + '|');
                }

                newrownum = 0
                //调用方法
                if(length >= 15 ){
                    var xmlhttp= new XMLHttpRequest();
                    var url = 'http://localhost:8888/wallpapers/index/getdata';
                    xmlhttp.onreadystatechange=state_Change;
                    xmlhttp.open("POST",url,true);
                    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xmlhttp.send("data="+img);
                    //download("wallpapers.txt",img);
                    img = '';
                }
            }
           

            function state_Change()
            {
                if (xmlhttp.readyState==4)
                {// 4 = "loaded"
                    if (xmlhttp.status==200)
                    {// 200 = OK
                    }
                    else
                    {
                    }
                }
            }

        }, false);

        function initialize()
        {
            var timer=setInterval(function(){
                window.scrollTo(0,++currentpos);
               // console.log(currentpos + '_' + document.body.scrollTop)
                if (currentpos == document.body.scrollTop){ clearInterval(timer);}

            },1); //设置滚动速度，数值越大，滚动越慢
        }

        document.ondblclick=initialize
    }

// console.log(length)
            /*function download(name, data) {
                var urlObject = window.URL || window.webkitURL || window;

                var downloadData = new Blob([data]);

                var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                save_link.href = urlObject.createObjectURL(downloadData);
                save_link.download = name;
                fake_click(save_link);
            }
           function fake_click(obj) {
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
                );
                obj.dispatchEvent(ev);
            }*/

})();
