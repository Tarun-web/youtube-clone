// SEARCH BAR DISPLAY
const header = document.querySelector('header');
const searchBtn = document.querySelector('.search .search-input')
const resSearch = document.querySelector('.responsive-search')
const resSearchBar = document.querySelector('.responsive-search input')
const searchCloseBtn = document.querySelector('.close-btn-js')

searchBtn.addEventListener('click', ()=>{
    resSearch.style.display = "block";
    resSearchBar.focus();
})
searchCloseBtn.addEventListener('click', ()=>{
    resSearch.style.display = "none";
})


// SEE MORE SEE LESS
const seeMore1 = document.querySelector('.see-more-js-1');
const seeMore2 = document.querySelector('.see-more-js-2');
const seeLess1 = document.querySelector('.see-less-js-1');
const seeLess2 = document.querySelector('.see-less-js-2');
const menu3 = document.querySelector('.menu-3')
const menu5 = document.querySelector('.menu-5')


seeMore1.addEventListener('click', ()=>{
    menu3.style.display = 'block'
})
seeMore2.addEventListener('click', ()=>{
    menu5.style.display = 'block'
})
seeLess1.addEventListener('click', ()=>{
    menu3.style.display = "none";
})
seeLess2.addEventListener('click', ()=>{
    menu5.style.display = "none";
})


// SIDE NAVBARS DISPLAY TOGGLE
const burgerBtn = document.querySelector('.burger-nav');
const navBar1 = document.querySelector('.left-div-wrapper');
const navBar2 = document.querySelector('.left-div-wrapper-2');



burgerBtn.addEventListener('click', ()=>{
    navBar1.classList.toggle('hide')
    navBar1.classList.toggle('res-hide')
    navBar2.classList.toggle('hide2')
})


// PAUSE PLAY VIDEO ON HOVER
const hoverVideo = document.querySelectorAll('.hoverVideo')
const videoDuration = document.querySelectorAll('.video .time')

hoverVideo.forEach((video, index)=>{
    video.addEventListener('mouseover', ()=>{
        video.play();
    })
    video.addEventListener('mouseout', ()=>{
        video.pause();
    })
})

for(let i=0; i<hoverVideo.length; i++){
    console.log(hoverVideo[i]);
    hoverVideo[i].onloadedmetadata = function(){

        let hour = Math.floor(hoverVideo[i].duration/3600);
        let minute = Math.floor(hoverVideo[i].duration/60);
        let second = Math.floor(hoverVideo[i].duration % 60)

        if(hour < 9){
            hour = `0${hour}`
        }
        if(minute < 9){
            minute = `0${minute}`
        }
        if(second < 9){
            second = `0${second}`
        }

        if(hoverVideo[i].duration/60 > 60){
            videoDuration[i].innerHTML = `${hour} : ${minute - (60 * hour)} : ${second}`    
        }else{
            videoDuration[i].innerHTML = `${minute} : ${second}`
        }
        
    }
}






// BUTTON ENABLE ON INPUT CHANGE
const commentBtn = document.getElementById('comment-btn-js');
const comment = document.getElementById('comment-input-js');
const commentHr = document.querySelector('.comment-hr')
const cancelBtn = document.querySelector('.cancel-btn')

function toggleDisableBtn(){
    if(comment.value != ''){
        commentBtn.classList.replace('btn-disabled', 'btn-blue')
        commentBtn.setAttribute('disabled', 'false')
    }else{
        commentBtn.classList.replace('btn-blue', 'btn-disabled')
        commentBtn.setAttribute('disabled', 'true')
    }
}

comment.addEventListener('input', toggleDisableBtn)
comment.addEventListener('click', ()=>{
    // console.log(comment.addEventListener);
    commentHr.style.height = "2px";
    commentHr.style.background = "var(--white)"
    comment.style.padding = '10px'
    cancelBtn.style.display = "inline-block"

})

cancelBtn.addEventListener('click', ()=>{
    commentHr.style.height = "1px";
    commentHr.style.background = "var(--quarternary-grey)"
    comment.style.padding = '0px'
    cancelBtn.style.display = 'none'
    comment.value = '';
    toggleDisableBtn()
})


// SHOW LIMITED TEXT IN VIDEO TITLE
const texts = document.querySelectorAll('.video-title-js');

texts.forEach(text=>{
    console.log(text.innerText);
    if(text.innerText.length > 50){
        newText = text.innerText.substr(0, 49);
        text.innerText = `${newText}...`
    }
})


//SUBSCRIBED EVENT
const subscribeBtn = document.querySelector('.subscribe-btn-js')

subscribeBtn.addEventListener('click', ()=>{

    if(subscribeBtn.innerText === 'SUBSCRIBE'){
        localStorage.setItem("subscribeStatus", "SUBSCRIBED")
    }else{
        localStorage.setItem("subscribeStatus", "SUBSCRIBE")
    }

    subscribeBtn.classList.toggle('subscribed')

    subscribeBtn.innerText = localStorage.getItem("subscribeStatus")
})
subscribeBtn.innerText = localStorage.getItem('subscribeStatus')
if(localStorage.getItem('subscribeStatus') === 'SUBSCRIBED'){
    subscribeBtn.classList.add('subscribed')
}else{
    subscribeBtn.classList.remove('subscribed')
}







