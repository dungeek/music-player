/**
 * 1.Render song  DONE
 * 2. Scroll top   DONe
 * 3. COntrol( play , pause , seek)
 * 4. CD rotate
 * 5. Next /prev
 * 6. Random
 * 7. Next/ Repeat when song ends
 * 8. Active song
 * 9. Scroll actively song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading =$('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');


const app = {
  songs: [
    {
      name: "Hiding In The Blue",
      singer: "The Fat Rat",
      path: "./songs/Hiding In The Blue.flac",
      image: "./img/hiding.jpg",
    },

    {
      name: "Try",
      singer: "Pink",
      path: "./songs/Try.mp3",
      image: "./img/try.jpg",
    },

    {
      name: "Intention",
      singer: "Justin Bieber",
      path: "./songs/Intentions.flac",
      image: "./img/intentions.png",
    },

    {
      name: "Stitches",
      singer: "Shawn Mendes",
      path: "./songs/Stitches.mp3",
      image: "./img/stitches.jpg",
    },

    {
      name: "Shiver",
      singer: "Ed Sheeren",
      path: "./songs/Shivers.mp3",
      image: "./img/shiver.jpg",
    },

    {
      name: "Wolves",
      singer: "Selena Gomez",
      path: "./songs/Wolves.mp3",
      image: "./img/wolves.jpg",
    },

    {
      name: "Holy",
      singer: "Justin Bieber",
      path: "./songs/Holy.mp3",
      image: "./img/holy.png",
    },

    {
      name: "I Don't Think That I Like Her",
      singer: "Charlie Puth",
      path: "./songs/.mp3",
      image: "./img/wolves.jpg",
    },

    {
      name: "Love Yourself",
      singer: "Justin Bieber",
      path: "./songs/LoveYourself.mp3",
      image: "./img/love_yourself.jpg",
    },

    {
      name: "That's Hilarious",
      singer: "Charlie Puth",
      path: "./songs/Hilarious.mp3",
      image: "./img/hilarious.jpg",
    },

    {
      name: "We Don't Talk Anymore",
      singer: "Charlie Puth & Selena Gomez",
      path: "./songs/TalkAnymore.mp3",
      image: "./img/talk_anymore.jpg",
    },

    {
      name: "As Long As You Love Me",
      singer: "Justin Bieber",
      path: "./songs/As Long As You Love Me.mp3",
      image: "./img/as_long_as.jpg",
    },

    {
      name: "Attention",
      singer: "Charlie Puth",
      path: "./songs/Attention.mp3",
      image: "./img/attention.png",
    },
  ],

  currentIndex : 2,

  isPlaying: false,

  isRandom: false,

  render: function () {

    const htmls = this.songs.map((song) => {
      return `
                <div class="song">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
    });
    console.log(htmls);
    //Take an array and be converted to html cards
    $('.playlist').innerHTML = htmls.join(' ');
  },
  
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex]; 
      }
    })
  },

  loadCurrentSong: function () {

    console.log(heading, cdThumb, audio);
    
    heading.innerText = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
    audio.src = this.currentSong.path;
  },

  nextSong: function () {
    this.currentIndex += 1;

    //When ending the last song, return first song
    if (this.currentIndex > this.songs.length) {
      this.currentIndex = 0;
    };
    
    this.loadCurrentSong();
  },
  
  prevSong: function () {
    this.currentIndex -= 1;

    //When ending the last song, return first song
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length -1;
    };
    
    this.loadCurrentSong();
  },

  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length); 
    } while (newIndex === app.currentIndex);
    
    console.log(newIndex);  
   
    app.currentIndex = newIndex;
    app.loadCurrentSong();
    audio.play();
  },

  handleEvents: function () {

    //Minimize and change opacity of the CD thumbnail while scrolling
    document.onscroll = function () {
      console.log(cd.offsetWidth);   
      const cdWidth = cd.offsetWidth;
      
      document.onscroll = function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        let newCdWidth = cdWidth - scrollTop;
        console.log(newCdWidth);
 
        cd.style.width = cdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth / cdWidth;      
      }
    };
    
    //CD rotating
    const cdRotating = cdThumb.animate([
      {transform: 'rotate(360deg)'}
    ], {
      duration: 10000,
      iterations: Infinity,
    });
    cdRotating.pause();

    //Playing song , pause song and change button , seek song
    playBtn.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
        cdRotating.pause();
      } else {
        audio.play();
        cdRotating.play();
      };

      //While song is playing 
    audio.onplay = function () {
      app.isPlaying = true;
      player.classList.add('playing');
    };
    
    //While song is pausing
    audio.onpause = function () {
      app.isPlaying = false;
      player.classList.remove('playing');
    };

    //Track the progress playing song
    audio.ontimeupdate = function () {
      console.log(audio.currentTime / audio.duration * 100 +' %');
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent;
      };

        //Automatically move to next song when it ends
      if(audio.currentTime === audio.duration)
      {
        app.nextSong();
        audio.play();
      };
      
    };
    
    //Seeking the song playing
    progress.onchange = function(event) {
      const seekTime = (audio.duration/100)* event.target.value;
      audio.currentTime = seekTime;
    }

    };
    
    //Next or previous song , repat song
    nextBtn.onclick = function (){
        app.nextSong();
        audio.play();
    };
    prevBtn.onclick = function () {
      app.prevSong();
      audio.play();
    };
    repeatBtn.onclick = function () {
      audio.currentTime = 0;
      audio.play();
    };
    
    //Random song
    randomBtn.onclick = function () {
      app.songs.some
      app.randomSong();
    };
    
    //Opt song to play
    const song = $('.playlist .song');
    console.log(song);
    song.onclick = function () {
      audio.play()
    }
  },

  start: function () {
    this.defineProperties()
    this.render();
    this.loadCurrentSong();
    this.handleEvents();
  },
};

app.start();
