
const player = document.querySelector('.player')
const video = document.getElementById('video-js')
const showControls = document.querySelector('.show-controls')
const controlsContainer = document.querySelector('.controls-container')
const progressRange = document.querySelector('.progress-range')
const progressBar = document.querySelector('.progress-bar')
const playBtn = document.getElementById('play-btn')
const playBtnResponsive = document.getElementById('play-btn-responsive')
const volumeIcon = document.getElementById('volume-icon')
const volumeRange = document.querySelector('.volume-range')
const volumeBar = document.querySelector('.volume-bar')
const playerSpeed = document.querySelector('.player-speed')
const timeElapsed = document.querySelector('.time-elapsed')
const timeDuration = document.querySelector('.time-duration')
const fullscreen = document.querySelector('.fullscreen')

//EVENT ICONS
const playIcon = document.querySelector('.play-js')
const pauseIcon = document.querySelector('.pause-js')
const volumeUpIcon = document.querySelector('.volume-up-js')
const volumeValue = document.querySelector('.volume-js')
const volumeDownIcon = document.querySelector('.volume-down-js')
const forwardIcon = document.querySelector('.forward-js')
const backwardIcon = document.querySelector('.backward-js')
const fastForwardIcon = document.querySelector('.fast-forward-js')
const fastBackwardIcon = document.querySelector('.fast-backward-js')


const search = document.querySelector('.search-input-js')

//FUNCTIONS

//key event icon opacity--------------------------------//

function animateIcon(icon, volume){

    if(icon.classList.contains('volume-js')){
        volumevalue(Math.floor(volume * 100))
    }

    if(icon.classList.contains('fast-forward-js')){
        fastForwardIcon.innerText = `${playerSpeed.value}x`
    }

    if(icon.classList.contains('fast-backward-js')){
        fastBackwardIcon.innerText = `${playerSpeed.value}x`
    }

    icon.classList.replace('animate', 'animate-js')
 
    setTimeout(()=>{
        icon.classList.replace('animate-js', 'animate')
    }, 200)
}

function volumevalue(volume){
    volumeValue.innerText = `${volume}%`
}

// play / pause video------------------------------------//

function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtnResponsive.classList.replace('fa-pause', 'fa-play')
}
function hidePlayIcon(){
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtnResponsive.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'pause')
}

function togglePlay(){
    if(video.paused){
        video.play()
        hidePlayIcon();
        animateIcon(playIcon)
    }else{
        video.pause()
        showPlayIcon();
        animateIcon(pauseIcon)
    }
}
video.addEventListener('ended', showPlayIcon)

// progress bar-------------------------------------------//

// display time as well as update the progress bar according to the video surpassing
function displayTime(time){
    hour = Math.floor(time / 3600);
    hour = hour > 9 ? hour : `0${hour}`

    minute = Math.floor((time % 3600)/ 60)
    minute = minute > 9 ? minute : `0${minute}`; 
    
    second = Math.floor((time % 3600) % 60);
    second = second > 9 ? second : `0${second}` 

    display = video.duration > 3599 ? `${hour}:${minute}:${second}` : `${minute}:${second}`
    return display;
}

function updateTimeAndProgress(){

    progressBar.style.width = `${(video.currentTime/ video.duration) * 100}%`
    timeElapsed.textContent = `${displayTime(video.currentTime)} / `
    timeDuration.textContent = displayTime(video.duration)
}

// skip video by clicking the progress range

newTime = 0;

function skipVideo(e){

    newTime = e.offsetX/ progressRange.offsetWidth;

    progressBar.style.width = `${newTime * 100}%`
    video.currentTime = newTime * video.duration;
}

//volume functionalities---------------------------------------//

lastVolume = 1;

function volumeIconChange(volume){
    volumeIcon.className = '';
    if(volume > 0.7){
        volumeIcon.classList.add('fa', 'fa-volume-up')
    }
    else if(volume <= 0.7 && volume > 0){
        volumeIcon.classList.add('fa', 'fa-volume-down')
    }
    else if(volume === 0){
        volumeIcon.classList.add('fa', 'fa-volume-off')
    }
}

function changeVolume(e){
    volume = e.offsetX/ volumeRange.offsetWidth

    if(volume < 0.1){
        volume = 0;
    }else if(volume > 0.9){
        volume = 1
    }
    volumeBar.style.width = `${volume * 100}%`
    video.volume = volume;
    volumeIconChange(volume)
    animateIcon(volumeValue)

    lastVolume = volume
}
volumeBar.style.width = `${video.volume * 100}%`

// mute toggle
function toggleMute(){
    
    if(video.volume != 0){
        video.volume  = 0
        volumeIconChange(video.volume)
        volumeBar.style.width = '0'
    }else{
        video.volume = lastVolume
        volumeIconChange(lastVolume)
        volumeBar.style.width = `${lastVolume * 100}%`
    }
    
}


//SPEED CONTROLS--------------------------------------------//

function changeSpeed(){
    video.playbackRate = playerSpeed.value
}

//FULLSCREEN

let isFullscreen = false;

// open fullscreen
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
}

// close fullscreen
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
}

function toggleFullScreen(){

    if(!isFullscreen){
        openFullscreen(player)
        isFullscreen = true;
        video.classList.add('video-fullscreen')
    }else{
        closeFullscreen()
        isFullscreen = false;
        video.classList.remove('video-fullscreen')
    }

}



// FOR RESPONSIVE SCREENS
function toggleOpacity(){
        if(controlsContainer.style.opacity == '1'){
            console.log(showControls.style.opacity);
            controlsContainer.style.opacity = '0'
            playBtnResponsive.style.opacity = '0'
        }else{
            console.log(showControls.style.opacity);
            controlsContainer.style.opacity = '1'
            playBtnResponsive.style.opacity = '1'
            setTimeout(()=>{
                controlsContainer.style.opacity = '0'
                playBtnResponsive.style.opacity = '0'
            }, 10000)
        }
         
}





//EVENT LISTNERS

// play/ pause video
playBtn.addEventListener('click', togglePlay)
playBtnResponsive.addEventListener('click', togglePlay)
if(window.innerWidth > 1000){
    video.addEventListener('click', togglePlay)
}

// progress bar 
video.addEventListener('timeupdate', updateTimeAndProgress)
progressRange.addEventListener('click', skipVideo)

//Volume controls
volumeRange.addEventListener('click', changeVolume)
volumeIcon.addEventListener('click', toggleMute)

//Speed Controls
playerSpeed.addEventListener('change', changeSpeed)

//Fullscreen
fullscreen.addEventListener('click', toggleFullScreen)


if(window.innerWidth <= 1000){
    video.addEventListener('click', toggleOpacity)
  
}
console.log(window.innerWidth);


//KEY EVENTS - SHORTCUT

// if(comment)


// console.log(comment.value);
document.addEventListener('keypress',(e)=>{
    // play/ pause video

    if (comment != document.activeElement && search != document.activeElement) {
        console.log('Element has focus!');
        if(e.key == ' '){
            e.preventDefault()
            togglePlay()
         }
    
        //mute
        if(e.key == 'm'){
            toggleMute()
        }
    
        //fullscreen
        if(e.key == 'f'){
            toggleFullScreen()
            animateIcon()
        }
    } 
})


//KEY DOWN EVENTS FOR VOLUME UP AND DOWN AND VIDEO SKIP BY 5 and adding / reducing the speed 
// console.log(search == document.activeElement)
document.addEventListener('input', (e)=>{
    console.log(getEventListeners(search))
})

document.addEventListener('keydown', (e)=>{
     // console.log(e.key);

     if(comment != document.activeElement && search != document.activeElement){
        //change volume up and down by 5
    
    if(e.key == 'ArrowUp' || e.key == 'ArrowDown'){

        e.preventDefault()
        if(e.key == 'ArrowUp'){
            lastVolume = lastVolume < .95 ? lastVolume + .05 : 1
        }
        
        if(e.key == 'ArrowDown'){
            lastVolume = lastVolume > .05 ? lastVolume - .05 : 0;
        }
        
        volumeBar.style.width = `${lastVolume * 100}%`
        volumeIconChange(lastVolume)
        animateIcon(volumeValue, lastVolume)
        video.volume = lastVolume
    }

    //skip video forward/ backward by 5s

    if(e.key == 'ArrowLeft' || e.key == 'ArrowRight'){

        e.preventDefault()
        currentTime = video.currentTime;

        if(e.key == 'ArrowRight'){
            currentTime = currentTime < video.duration - 5 ? currentTime + 5 : video.duration         
            animateIcon(forwardIcon)
        }
        
        if(e.key == 'ArrowLeft'){
            currentTime = currentTime > 5 ? currentTime - 5 : 0          
            animateIcon(backwardIcon)
        }
        
        video.currentTime = currentTime;

    }

    //adding and reducing speed by 0.5x

    if(e.key == '[' || e.key == ']'){

        e.preventDefault()
        speed = video.playbackRate 

        if(e.key == ']'){
            speed = speed < 2 ? speed + 0.25 : 2
        }

        if(e.key == '['){
            speed = speed > 0.25 ? speed - 0.25 : 0.25
        }
        
        playerSpeed.value = speed;
        video.playbackRate = speed
        if(e.key == '['){
            animateIcon(fastBackwardIcon)
        }
        if(e.key == ']'){
            animateIcon(fastForwardIcon)
        }

    }

     }
    

    
})



function keyVolumeChange(e){
   
}

//FORWARD AND BACKWARD SKIP BY 5S KEY EVENTS

