const song = document.querySelector('.song');
const artist = document.querySelector('.artist');
const cover = document.querySelector('.cover');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('.play-button');

const app = {
    currentIndex : 0,
    isPlaying : false,
    songs: [
        {
            name: 'Để quên',
            singer: 'Ngọt',
            path: './assets/music/de-quen-Ngot.mp3',
            image: './assets/img/dequen.jpg',
        },
        {
            name: 'Cho',
            singer: 'Ngọt',
            path: './assets/music/Cho-Ngot.mp3',
            image: './assets/img/bth.jpg',
        },
        {
            name: 'Em Dạo Này',
            singer: 'Ngọt',
            path: './assets/music/Em-Dao-Nay-Ngot.mp3',
            image: './assets/img/ngbth.jpg',
        },
        {
            name: 'Ai',
            singer: 'DSK ft Nhạc của Trang',
            path: './assets/music/Ai-DSK-x-Nhac-cua-Trang-DSK-Mixtape-2018-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Anh thanh niên trẻ',
            singer: 'DSK',
            path: './assets/music/ANH-THANH-NIEN-TRE-LIVE-AT-KONG-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Chưa bao giờ',
            singer: 'DSK',
            path: './assets/music/Chua-Bao-Gio-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Đôi bờ',
            singer: 'DSK ft KraziNoyze ft BlakRay',
            path: './assets/music/Doi-bo-KraziNoyze-ft-BlakRay-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Biết rõ vẫn khó đi',
            singer: 'DSK',
            path: './assets/music/DSK-x-Thien-Biet-Ro-Van-Kho-Di-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Học',
            singer: 'DSK',
            path: './assets/music/Hoc-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Lãng mạn của anh',
            singer: 'DSK',
            path: './assets/music/Lang-Man-Cua-Anh-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Ngày tàn',
            singer: 'DSK',
            path: './assets/music/Ngay-Tan-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        },
        {
            name: 'Thấy vui toàn là mây và...',
            singer: 'DSK',
            path: './assets/music/THAY-MA-VUI-TOAN-LA-MAY-VA-NUI-LIVE-AT-KONG-DSK.mp3',
            image: './assets/img/dsk-2.jpg',
        }
        
    ],
    render: function() {
        const _this = this;
        const htmls = this.songs.map(function(song, index) {
            return `
            <div id="song-list" index="${index}">
                <i class="fa-solid fa-play" id="play-choosen" index="${index}"></i>
                <img id="picture" src="${song.image}" index="${index}"></img>
                <div id="singer">
                    <div id="name-song" index="${index}">${song.name}</div>
                    <div id="name-singer" index="${index}">${song.singer}</div>           
                </div>
            </div>
            `
        })
        document.querySelector('.midder').innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function() {
        const _this = this;
        const coverAnimation = cover.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 30000,
            interations: Infinity,
        })
        coverAnimation.pause();
        document.querySelector('#button-back-song').onclick = function() {
            document.querySelector('.inner').style.display = 'none';
            document.querySelector('.playlist').style.display = 'block';
        }
        
        document.querySelector('#button-more-playlist').onclick = function() {
            document.querySelector('.inner').style.display = 'block';
            document.querySelector('.playlist').style.display = 'none';
        }

        document.querySelector('.play-button').onclick = function() {

            if(_this.isPlaying) {
                audio.pause();
            }
            else {             
                audio.play();
            }   
            
            audio.onplay = function() {
                _this.isPlaying = true;
                coverAnimation.play();
                document.querySelector('#play').style.display = 'none';
                document.querySelector('#pause').style.display = 'block';
            }
            
            audio.onpause = function() {
                _this.isPlaying = false;
                coverAnimation.pause();
                document.querySelector('#play').style.display = 'block';
                document.querySelector('#pause').style.display = 'none';
            }

            audio.ontimeupdate = function() {
                var time = (audio.currentTime * 100/ audio.duration);
                document.querySelector('.bar').style.width = time + '%';
            }
        }

        document.querySelector('.button-next').onclick = function() {
           _this.nextSong();
           audio.play();
        }

        document.querySelector('.button-prev').onclick = function() {
            _this.prevSong();
            audio.play();
        }
        
        // Xử lý khi click vào bài hát
        document.querySelector('.midder').onclick = function(e) {
            _this.currentIndex = e.target.getAttribute('index');
            document.querySelector('.inner').style.display = 'block';
            document.querySelector('.playlist').style.display = 'none';
            _this.loadCurrentSong();
            if(_this.isPlaying = true) {
                document.querySelector('#play').style.display = 'none';
                document.querySelector('#pause').style.display = 'block';
                audio.play();
            }
        }
    },
    loadCurrentSong: function() {

        song.textContent = this.currentSong.name;
        artist.textContent = this.currentSong.singer;
        cover.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;

    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex === this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    start: function() {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Tải bài hát đầu tiên
        this.loadCurrentSong();

        //render playlist
        this.render();
        
        // Xử lý sự kiện DOM
        this.handleEvents();
    }
};
app.start();
