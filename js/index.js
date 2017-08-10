window.onload = function() {
    // 导航栏下拉菜单
    var menu = document.getElementsByClassName("nav")[0].getElementsByTagName("li");
    var childmenu = document.getElementsByClassName('child-menu');
    for (var i = 0; i < menu.length; i++) {
        (function(i) {
            menu[i].onmouseover = function() {
                menu[i].style.backgroundColor = "#303030";
                childmenu[i].style.display = "block";

            }
            menu[i].onmouseout = function() {
                menu[i].style.backgroundColor = "#000000";
                childmenu[i].style.display = "none";
            }

        })(i)

    }
    // 轮播图
    var piccontainer = document.getElementsByClassName("pic-container")[0];
    var allpic = document.getElementsByClassName("allpic")[0];
    var picwidth = parseInt(piccontainer.offsetWidth);
    var tabbtn = document.getElementsByClassName("tab-btn")[0];
    var btn = tabbtn.getElementsByTagName("span");
    var index = 1; //控制当前处于第几张图片
    var isplay = false; //控制是否处于滑动状态，false时是未出于
    var picnum = document.getElementsByClassName("tab-pic").length - 2; //图片数量

    var timer = setInterval(function() {
        next.onclick();
    }, 3000);

    piccontainer.onmouseout = function() { //鼠标移除时自动播放
        timer = setInterval(function() {
            next.onclick();
        }, 3000);
    }
    piccontainer.onmouseover = function() { //鼠标移入时清除自动播放
            clearInterval(timer);
        }
        //给按钮也做了一个移入清除移除自动播放功能，如果按钮在图片上就不需要了;
    tabbtn.onmouseout = function() {
        timer = setInterval(function() {
            next.onclick();
        }, 3000);
    }
    tabbtn.onmouseover = function() {
        console.log(12);
        clearInterval(timer);
    }
    var pre = document.getElementsByClassName('pre')[0];
    var next = document.getElementsByClassName('next')[0];
    pre.onclick = function() {
        if (isplay == true) { //如果正在滑动播放按钮就不起作用，放置点击过快造成混乱
            return;
        }
        index--;
        slider();
        showbutton(index);
    }
    next.onclick = function() {
        if (isplay == true) {
            return;
        }
        index++;
        slider();
        showbutton(index);

    }

    function slider() {
        isplay = true;
        setTimeout(function() {
                isplay = false;
            }, 500) //500s后使滑动处于非播放状态，按钮生效；
        allpic.style.transitionDuration = 0.5 + 's'; //滑动时间间隔是.5s
        //改变transform的值来控制移动的位移；
        allpic.style.transform = 'translateX(' + (index * picwidth) * (-1) + "px)"; 
        if (index > picnum) {
            setTimeout(function() {
                    allpic.style.transitionDuration = 0 + 's';
                    allpic.style.transform = 'translateX(' + (1 * picwidth) * (-1) + 'px)';
                    index = 1;
                }, 500) //由于setTimeout异步，所以等500ms滑动到最后一张（第一张）之后再把他用0ms过渡到实际意义上的第一张。
        }
        if (index < 1) {
            setTimeout(function() {
                allpic.style.transitionDuration = 0 + 's';
                allpic.style.transform = 'translateX(' + (picnum * picwidth) * (-1) + 'px)';
                index = picnum;
            }, 500)
        }

    }

    for (var i = 0; i < btn.length; i++) {
        (function(i) {
            btn[i].onmouseover = function() {
                index = i + 1;
                slider();
                showbutton(index);
            }
        })(i)
    }

    function showbutton(btnindex) {
        for (var i = 0; i < btn.length; i++) {
            btn[i].className = "";
        }
        if (btnindex > picnum) {
            btn[0].className = "on";
            return;
        }
        if (btnindex < 1) {
            btn[picnum - 1].className = "on";
            return;
        }
        btn[btnindex - 1].className = "on";
    }


    var tabtitle = document.getElementsByClassName('tab-con-title')[0].getElementsByTagName('li');
    var tabbody = document.getElementsByClassName('tab-con-body')[0].getElementsByTagName('ul')[0];
    var tabbodylist = tabbody.getElementsByTagName('li');
    var conwidth = parseInt(tabbodylist.offsetWidth);

    for (var i = 0; i < tabtitle.length; i++) {
        (function(i) {
            tabtitle[i].onclick = function() {
                for (var j = 0; j < tabtitle.length; j++) {
                    tabtitle[j].className = "";
                }
                tabtitle[i].className = "active";
                tabbody.style.transitionDuration = 0 + 's';
                tabbody.style.transform = 'translateX(' + (i * picwidth) * (-1) + "px)";
            }
        })(i)
    }

    var country = document.getElementById('country');
    var city = document.getElementById('city');
    var cities = [
            ["无"],
            ["北京", "上海", "广州"],
            ["洛杉矶", "纽约", "旧金山"],
            ["伦敦", "利物浦", "曼彻斯特"]
        ]
        // 获得国家对应的城市数组
    country.onchange = function() {
        var countrycity = cities[country.selectedIndex - 1];
        city.length = 1; //清除城市下拉框
        for (var i = 0; i < countrycity.length; i++) {
            city[i + 1] = new Option(countrycity[i], countrycity[i])

        }

    }

}