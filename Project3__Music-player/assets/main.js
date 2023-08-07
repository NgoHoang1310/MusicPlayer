const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var getMusicLists = $('.music-name-list');
var getMusicName = $('.player-music-name');
var getCdThumb = $('.player-cd__thumb');
var getAudio = $('.audioSrc');
var getPlayBtn = $('.player-control__function.play');
var getPauseBtn = $('.player-control__function.pause');
var getInputRange = $('.player-control__range');
var getNextBtn = $('.player-control__function.next');
var getPreviousBtn = $('.player-control__function.previous');
var getRandomBtn = $('.player-control__function.random');
var getReplayBtn = $('.player-control__function.replay')
var songDefaultIndex = 0;
var isRandom = false;
var isReplay = false;
var isDownLoad = false;
// var songRandomIndex = Math.floor(Math.random()*10);

const app = {
    songs: [
        {
            name: 'Anh chưa thương em đến vậy đâu',
            singer: 'Myra Trần',
            path: './assets/audio/Anh-Chua-Thuong-Em-Den-Vay-Dau-Lady-May.mp3',
            image: './assets/img/Anh chưa thương em đến vậy đâu.jpg'
        },

        {
            name: 'Chưa quên người yêu cũ',
            singer: 'Hà Nhi',
            path: './assets/audio/ChuaQuenNguoiYeuCuLiveVersion-HaNhi-10119677.mp3',
            image: './assets/img/chưa quên người yêu cũ.jpg'
        },
        {
            name: 'Dẫu có lỗi lầm',
            singer: 'Bùi Anh Tuấn ',
            path: './assets/audio/DauCoLoiLam-BuiAnhTuan_46k5v.mp3',
            image: './assets/img/Dẫu có lỗi lầm.jpg'
        },

        {
            name: 'Yêu người có ước mơ',
            singer: 'Bùi Trường Linh',
            path: './assets/audio/YeuNguoiCoUocMo-buitruonglinh-8396692.mp3',
            image: './assets/img/yêu người có ước mơ.jpg'
        },
        {
            name: 'Monster',
            singer: 'Katie Sky',
            path: './assets/audio/I See Your Monsters - Katie Sky.mp3',
            image: './assets/img/103567654_300x300.jpg'
        },
        {
            name: 'Không cần phải hứa đâu em',
            singer: 'Khải Đăng',
            path: './assets/audio/KhongCanPhaiHuaDauEm-KhaiDang-7129808.mp3',
            image: './assets/img/không cần phải hứa đâu em.jpg'
        },
        {
            name: 'At my worst',
            singer: 'Pink Sweet',
            path: './assets/audio/At My Worst - Pink Sweat$.mp3',
            image: './assets/img/At my Worst.jpg'
        },
        {
            name: 'Chiều nay không có mưa bay',
            singer: 'Trung Quân',
            path: './assets/audio/ChieuNayKhongCoMuaBay-TrungQuanIdol-3314229.mp3',
            image: './assets/img/Chiều nay không có mưa bay.jpg'
        },
        {
            name: 'Có em chờ',
            singer: 'Min',
            path: './assets/audio/CoEmCho-MINMrA-4928332.mp3',
            image: './assets/img/Có em chờ.jpg'
        },
        {
            name: 'Để em rời xa',
            singer: 'Hoàng Tôn',
            path: './assets/audio/DeEmRoiXa-HoangTon-2759506.mp3',
            image: './assets/img/Để em rời xa.jpg'
        },
        {
            name: 'Có không giữ mất đừng tìm',
            singer: 'Trúc Nhân',
            path: './assets/audio/CoKhongGiuMatDungTimCukakRemix-TrucNhan-7334066.mp3',
            image: './assets/img/Có không giữ mất đừng tìm.jpg'
        },
    ],
    renderSongPlayer: function () {
        getMusicName.innerText = this.songs[songDefaultIndex].name;
        getCdThumb.style.backgroundImage = `url("${this.songs[songDefaultIndex].image}")`;
        getAudio.src = this.songs[songDefaultIndex].path;
    },

    renderListSong: function () {
        var html = this.songs.map(function (song, index) {
            return ` <li class="music-item ${songDefaultIndex === index ? 'song-active' : ''}" data-index="${index}">
            <div class="music-item__image">
                <img src="${song.image}" alt="" class="music-item__img">
            </div>
        
            <div class="music-item__content">
                 <p class="music-item__name">${song.name}</p>
                 <p class="music-item__singer">${song.singer}</p>
            </div>
        
            <div class="music-item__more"> <i class="fas fa-ellipsis-h"></i>
            <a href="" class="music-item__download">Download</a>
        </div>
            
        </li>`
        })
        getMusicLists.innerHTML = html.join('');
    },
    
    handleSrollTop: function () {
        var heightTop = $('.player-cd__thumb').offsetWidth;

        document.onscroll = function () {
            var heightScroll = window.scrollY;

            var newHeightTop = heightTop - heightScroll;
            $('.player-cd').style.width = newHeightTop > 0 ? newHeightTop + 'px' : 0;
        }
    },

    nextSong: function () {
        if (isRandom) {
            this.playRandom();
            this.renderListSong();
        }
        else {
            songDefaultIndex++;
            if (songDefaultIndex >= app.songs.length) {
                songDefaultIndex = 0;
            }
            this.renderSongPlayer();
            this.renderListSong();
        }

    },

    prevSong: function () {
        if (isRandom) {
            this.playRandom();
        }
        else {
            songDefaultIndex--;
            if (songDefaultIndex < 0) {
                songDefaultIndex = app.songs.length - 1;
            }
            this.renderSongPlayer();
            this.renderListSong();
        }
    },

    playRandom: function () {
        var randomSong;
        do {
            randomSong = Math.floor(Math.random() * this.songs.length);
        } while (randomSong == songDefaultIndex);
        songDefaultIndex = randomSong;
        this.renderSongPlayer();
    },
    replaySong: function () {
        getAudio.play();
    },
    downloadSong: function (index) {
        var getDownloadBtn = $$('.music-item__download');
        if (getDownloadBtn[index].classList.toggle('enable')) {
            getDownloadBtn[index].href = `${app.songs[index].path}`;
            getDownloadBtn[index].download = "";
        }

    },

    handleEvents: function () {
        // var selectSong = $$('.music-item')
        var getMore = $$('.music-item__more');

        //xử lí cd quay / dừng
        var cdThumbAnimate = getCdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause();

        //xử lý nút next bài
        getNextBtn.onclick = function () {
            app.nextSong();
            getAudio.play();

        }
        //xử lý nút previous bài
        getPreviousBtn.onclick = function (e) {
            app.prevSong();
            getAudio.play();
        }
        //xử lý nút play
        getPlayBtn.onclick = function () {

            getAudio.play();

        }
        //xử lí nút pause

        getPauseBtn.onclick = function () {
            getAudio.pause();

        }

        //xử lí khi bài hát được chạy
        getAudio.onplay = function () {
            getPauseBtn.classList.remove('disable');
            getPlayBtn.classList.add('disable');
            cdThumbAnimate.play();
            getAudio.ontimeupdate = function () {
                getInputRange.value = this.currentTime;
                getInputRange.max = this.duration;
            }
            //xử lí tua bài hát
            getInputRange.onchange = function () {
                getAudio.currentTime = this.value;
            }

        }

        //xử lí khi bài hát đang dừng

        getAudio.onpause = function () {
            getPlayBtn.classList.remove('disable');
            getPauseBtn.classList.add('disable');
            cdThumbAnimate.pause();

            getInputRange.onchange = function () {
                getAudio.currentTime = this.value;
            }
        }
        //xử lý tự động next bài
        getAudio.onended = function () {
            if (isReplay) {
                app.replaySong();
            } else {
                setTimeout(function () {
                    app.nextSong();
                    getAudio.play();
                }, 2000)
            }
        }

        //xử lí nút random
        getRandomBtn.onclick = function () {
            if (this.classList.toggle('active')) {
                isRandom = true;
            } else {
                isRandom = false;
            }
        }

        //xử lí chọn bài hát 
        //  selectSong.forEach(function(song,index) {
        //     song.onclick = function() {
        //         songDefaultIndex = index;
        //         app.renderSongPlayer();
        //         // app.renderListSong();
        //         // songDefaultIndex = index;
        //         // getAudio.play();
        //     }
        //  } )
        getMusicLists.onclick = function (e) {
            var songNode = e.target.closest('.music-item');
            if (songNode && !e.target.closest('.music-item__more')) {
                songDefaultIndex = Number(songNode.getAttribute('data-index'));
                app.renderListSong();
                app.renderSongPlayer();
                getAudio.play();
            }



        }
        //xử lí nút tải nhạc
        getMore.forEach(function (song, index) {
            song.onclick = function () {
                app.downloadSong(index);
            }
        })
        //xử nút phát lại
        getReplayBtn.onclick = function () {
            if (this.classList.toggle('active')) {
                isReplay = true;
            } else {
                isReplay = false;
            }
        }

    },

    run: function () {
        this.renderSongPlayer();
        this.renderListSong();
        this.handleSrollTop();
        this.handleEvents();

    }
}

app.run();



