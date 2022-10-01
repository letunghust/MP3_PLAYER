const song    = document.querySelector('#song');
const playBtn = document.querySelector('.player-inner');
const nextBtn = document.querySelector('.play-forward');
const backBtn = document.querySelector('.play-back');
const musicName = document.querySelector('.music-name');
const musicImg  = document.querySelector('.music-thumb img');
const playRepeat= document.querySelector('.play-repeat');
const playInfinite = document.querySelector('.infinite');  
/*
const musics  = ["HearMeNow.webm","Unstoppable.mp3",
"ForeverYoung.mp3","Salting.mp3","Thunder.mp3"];
*/
const musics = [
    {
        id:1,
        title:'Hear Me Now',
        file:'HearMeNow.webm'
    },
    {
        id:2,
        title:'Unstoppable',
        file:'Unstoppable.mp3'
    },
    {
        id:3,
        title:'Forever Young',
        file:'ForeverYoung.mp3'
    },
    {
        id:4,
        title:'Salting',
        file:'Salting.mp3'
    },
    {
        id:5,
        title:'Thunder',
        file:'Thunder.mp3'
    }
]
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const rangeBar = document.querySelector('#range');

var isPlaying = true;
var indexSong = 0;
var isRepeat  = false;
var isInfinite = false;
var repeatCount= 0;

displayTimer();
var timer = setInterval(displayTimer,500);

//chèn chức năng cho nút infinite
playInfinite.addEventListener('click',function(){
    if(isInfinite) isInfinite = false;
    else isInfinite = true;
});

//chèn chức năng cho nút repeat
playRepeat.addEventListener('click',function(){
    if(isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute('style');
    }
    else {
        isRepeat = true; 
        playRepeat.setAttribute('style','color:red');
    }  
});

//chèn chức năng cho nút back và forward  
nextBtn.addEventListener('click',function(){
    changeSong(1);
});
backBtn.addEventListener('click',function(){
    changeSong(-1);
});
song.addEventListener('ended', handleSong);
function handleSong(){
    repeatCount++;
    if(isRepeat && repeatCount ===1) {
        //hadle repeat song
        isPlaying = true;
        playPause();
    }
    else
    changeSong(1);
};

function changeSong(dir){
    if(dir==1){
        //nextSong
        indexSong++;
        if(indexSong>= musics.length) indexSong = 0; 
        isPlaying = true ;
    }
    else if(dir ==-1){
        //prevSong
        indexSong--;
        if(indexSong<0) indexSong =musics.length -1;
        isPlaying = true;
    }
    init(indexSong);
    playPause();    
};

//chèn chức năng cho nút play và pause
playBtn.addEventListener('click', playPause);
function playPause(){
    if(isPlaying==true){
        song.play();
        playBtn.innerHTML= `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
    }
    else{
        song.pause();
        playBtn.innerHTML=`<ion-icon name="play" ></ion-icon>`;
        isPlaying = true; 
    }
};

//hiển thị thời gian khi nhạc chạy
function displayTimer(){
    const {duration, currentTime } =song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;

    remainingTime.textContent = formatTimer(currentTime);
    if( !duration) {
        durationTime.textContent =' 00:00';
    }
    else{
        durationTime.textContent= formatTimer(duration); 
    }
};

function formatTimer(number){
    const minutes = Math.floor(number /60);
    const seconds = Math.floor(number -minutes*60);
    return `${minutes}:${seconds}`; 
};

//xử lý thanh thay đổi thời gian (range)
rangeBar.addEventListener('change', handleChange);
function handleChange(){
    song.currentTime = rangeBar.value;
};

function init(indexSong){
    displayTimer();
    song.setAttribute('src', `./music/${musics[indexSong].file}`);
    musicName.textContent = musics[indexSong].title;
};
init(indexSong);

