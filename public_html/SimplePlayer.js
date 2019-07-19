
function SimplePlayer() {
    var ulTabs = null;
    var tabCount = null;
    var self = this;
    var playBtn = null;
    var repeatBtn = null;
    var video = null;
    var seekbar = null;
    var upload = null;
    var repeatStatus = false;
    var randomBtn = null;
    var randomStatus = false;
    this.init = function ()
    {
        document.body.style.backgroundImage = "url('background.gif')";
        document.body.style.backgroundSize = "100% 100%";
        var shell = document.createElement("div");
        shell.setAttribute("id", "shell");
        shell.style.width = "900px";
        shell.style.height = "500px";

        var content = document.createElement("div");
        content.setAttribute("id", "content");
        //右版
        var contentRight = document.createElement("div");
        contentRight.setAttribute("id", "content-right");
        //左版
        var contentLeft = document.createElement("div");
        contentLeft.setAttribute("id", "content-left");


        content.appendChild(contentLeft);
        content.appendChild(contentRight);
        shell.appendChild(content);
        document.body.appendChild(shell);
        //播放按鈕
        video = document.createElement("video");
        video.setAttribute("id", "video");
        video.autoplay = true;
        video.poster = "music.gif";
        playBtn = document.createElement("input");
        playBtn.setAttribute("type", "button");
        playBtn.setAttribute("id", "play");
        playBtn.setAttribute("onClick", "playVideo()");
        playBtn.setAttribute("class", "controls");
        playBtn.style.backgroundImage = "url('play-button.png')";
        //video.controls = true;
        //音量上昇
        var volumeup = document.createElement("input");
        volumeup.setAttribute("type", "button");
        volumeup.setAttribute("class", "controls");
        volumeup.setAttribute("id", "volumeup");
        volumeup.setAttribute("onClick", "volumeUp()");
        volumeup.style.backgroundImage = "url('volumeup.png')";
        //音量下降
        var volumedown = document.createElement("input");
        volumedown.setAttribute("type", "button");
        volumedown.setAttribute("class", "controls");
        volumedown.setAttribute("id", "volumedown");
        volumedown.setAttribute("onClick", "volumeDown()");
        volumedown.style.backgroundImage = "url('volumedown.png')";
        //全螢幕
        var fullscreen =document.createElement("input");
        fullscreen.setAttribute("type","button");
        fullscreen.setAttribute("id","fullScreenBtn");
        fullscreen.setAttribute("onClick","changeScreen()");
         fullscreen.style.backgroundImage = "url('pixel-full-screen.png')";
        //音樂時間bar
        seekbar = document.createElement("input");
        seekbar.setAttribute("type", "range");
        seekbar.setAttribute("step", "any");
        seekbar.setAttribute("id", "seekbar");
        seekbar.setAttribute("value", "0");
        var time = document.createElement("label");
        time.setAttribute("id", "time");
        time.innerHTML = "0:00:00";
        seekbar.setAttribute("onChange", "changeTime()");
        video.setAttribute("onTimeupdate", "updateTime()");
        //  當媒介長度改變時執行指令碼
        video.setAttribute("onDurationchange", "initSeekbar()");

        contentLeft.appendChild(video);
        contentLeft.appendChild(playBtn);
        contentLeft.appendChild(volumeup);
        contentLeft.appendChild(volumedown);
        contentLeft.appendChild(seekbar);
        contentLeft.appendChild(time);

        contentLeft.appendChild(fullscreen);
        //開啟檔案按鈕
        var a = document.createElement("a");
        a.setAttribute("href", "javacscript:");
        a.setAttribute("class", "file");
        a.innerHTML = "Open File";
        var input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("multiple", "multiple");
        input.setAttribute("id", "uploadBtn");
        input.setAttribute("onChange", "upLoad(event)");
        a.appendChild(input);

        //重複播放
        repeatBtn = document.createElement("input");
        repeatBtn.setAttribute("type", "button");
        repeatBtn.setAttribute("id", "repeatBtn");
        repeatBtn.setAttribute("onClick", "changeRepeatStatus()");
        
        //隨機播放
        randomBtn =document.createElement("input");
        randomBtn.setAttribute("type", "button");
        randomBtn.setAttribute("id", "randomBtn");
        randomBtn.setAttribute("onClick", "changeRandomStatus()");

        ulTabs = document.createElement("ul");
        ulTabs.setAttribute("class", "tab");

        var h3 = document.createElement("h3");
        h3.innerHTML = "播放清單";

        contentRight.appendChild(a);
        contentRight.appendChild(h3);
        
        contentRight.appendChild(repeatBtn);
        contentRight.appendChild(randomBtn);
        contentRight.appendChild(ulTabs);
    };

    this.addTab = function (i)
    {
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.setAttribute("item", i);
        a.setAttribute("href", "javascript: void(0)");
        a.innerHTML = (i + 1) + "." + upload.files[i].name;
        li.appendChild(a);

        playBtn.style.backgroundImage = "url('pause.png')";
        //第一首先預設
        if (i == 0) {
            li.style.background = "#999";
            //讀路徑
            this.fileReader(i);
        }
        //點擊要的歌單
        a.addEventListener('click', function () {
            console.log(i);
            self.showVideo(i);
        });
        ulTabs.appendChild(li);
    };

    this.showVideo = function (nowI)
    {
        var item = ulTabs.getElementsByTagName("li");
        for (var i = 0; i < tabCount; i++) {
            var tab = item[i];
            //判斷點擊的歌名
            if (tab.textContent == item[nowI].textContent)
            {
                var selectTab = tab;
                selectTab.style.background = "#999";
                playBtn.style.backgroundImage = "url('pause.png')";
            } else
            {
                tab.style.background = "";
            }
            ;
        }
        //讀路徑
        this.fileReader(nowI);
    };

    this.fileReader = function (i)
    {
        var fReader = new FileReader();
        fReader.readAsDataURL(upload.files[i]);
        fReader.onload = function (event) {
            playBtn.style.backgroundImage = "url('pause.png')";
            video = document.getElementById("video");
            //給影片目標位子
            video.src = event.target.result;
        };

        //結束時動作
        video.onended = function () {
            if(repeatStatus)
            {
                repeatMusic(i);
            }
            else if(randomStatus)
            {
                //把亂數之前的一首歌底色a標籤先用掉
                ulTabs.getElementsByTagName("li")[i].style.background = "";
                var randomI = Math.ceil(Math.random()*tabCount-1);
                console.log(randomI);
                randomMusic(randomI);
            }else if(!repeatStatus&&!randomStatus)
            {
                //自動播下一首
                repeatMusic(i);
            }
        };
    };
    randomMusic = function(i)
    {
        console.log("123456789")
         var item = ulTabs.getElementsByTagName("li");
            playBtn.style.backgroundImage = "url('play-button.png')";
            //
            if (i < tabCount ) {
                item[i].style.background = "#999";
                self.fileReader(i);
            }
    };
    repeatMusic = function (i)
    {
        var item = ulTabs.getElementsByTagName("li");
        //判斷是否按下
        if (repeatStatus) {
            playBtn.style.backgroundImage = "url('play-button.png')";
            self.fileReader(i);
        } else
        {
            //自動下一首的
            playBtn.style.backgroundImage = "url('play-button.png')";
            //已跑到最後一首不進這個if
            if (i < (tabCount - 1)) {
                item[i].style.background = "";
                item[i + 1].style.background = "#999";
                self.fileReader(i + 1);
            }
        }


    };
    //全螢幕
    changeScreen =function()
    {
        
         if (video.requestFullscreen) {
          video.requestFullscreen();
        }
        else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
        else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();     //Gecko 
        }
        else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();  // WebKit 
        }
    };
    
    playVideo = function ()
    {
        video = document.getElementById("video");
        //video是否已停止
        if (video.paused) {
            playBtn.style.backgroundImage = "url('pause.png')";
            video.play();
        } else
        {
            playBtn.style.backgroundImage = "url('play-button.png')";
            video.pause();
        }
    };
    volumeUp = function ()
    {
        video = document.getElementById("video");
        if (video.volume >= 0 && video.volume < 1)
        {
            video.volume += 0.2;
        } else
        {
            video.volume = 1;
        }
    };
    volumeDown = function ()
    {
        video = document.getElementById("video");
        if (video.volume > 0.25 && video.volume <= 1) {
            video.volume -= 0.2;
        } else
        {
            video.volume = 0;
        }
    };
    upLoad = function (e)
    {
        //開啟檔案
        upload = document.getElementById("uploadBtn");
        //判斷是否已按過上傳檔案
        if (tabCount == null) {
            //檔案數量
            tabCount = e.target.files.length;
        } else
        {
            //移除列表
            document.getElementById("content-right").removeChild(ulTabs);
            //創一個新的
            ulTabs = document.createElement("ul");
            document.getElementById("content-right").appendChild(ulTabs);
            tabCount = e.target.files.length;
        }
        ;
        for (var i = 0; i < tabCount; i++) {
            self.addTab(i);
        }
        ;
    };

    //時間更新
    updateTime = function ()
    {
        var sec = video.currentTime;
        var h = Math.floor(sec / 3600);
        sec = sec % 3600;
        var min = Math.floor(sec / 60);
        sec = Math.floor(sec % 60);

        if (sec.toString().length < 2) {
            sec = "0" + sec;
        }
        if (min.toString().length < 2) {
            min = "0" + min;
        }

        document.getElementById('time').innerHTML = h + ":" + min + ":" + sec;
        //緩衝時間長度
        if (video.buffered.length > 0) {
            var bufferPostion = video.buffered.end(video.buffered.length - 1);
            seekbar.min = video.startTime;
            seekbar.max = bufferPostion;
            seekbar.value = video.currentTime;
        }
    };
    //初始化開始與結束的時間
    initSeekbar = function ()
    {
        seekbar.min = video.startTime;
        seekbar.max = video.startTime + video.duration;
    };
    //取得現在按下的seekbar位置
    changeTime = function ()
    {
        video.currentTime = seekbar.value;
    };
    //改變重複播放狀態
    changeRepeatStatus = function ()
    {
        if (repeatStatus) {
            repeatStatus = false;
            repeatBtn.style.backgroundColor = "#99ff00";
              randomBtn.disabled ="";
        } else
        {
            randomBtn.disabled ="disabled";
            repeatBtn.style.backgroundColor = "#ff0800";
            repeatStatus = true;
        }
        ;
    };
    //隨機播的狀態
        changeRandomStatus = function ()
    {
        console.log("123")
        if (randomStatus) {
            randomStatus = false;
            randomBtn.style.backgroundColor = "#99ff00";
              repeatBtn.disabled ="";
        } else
        {
            repeatBtn.disabled ="disabled";
            randomBtn.style.backgroundColor = "#ff0800";
            randomStatus = true;
        }
        ;
    };
    this.init();
}
;


  