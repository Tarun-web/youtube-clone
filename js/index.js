//SLIDING CARDS OF CATEGORIES MENU
const rightBtn = document.querySelector('.right-btn-js')
const leftBtn = document.querySelector('.left-btn-js')
const categoriesMenu = document.querySelector('.categories-menu-js')
categoriesMenu.style.transform = 'translateX(0%)'
leftcount = 0;
leftBtn.addEventListener('click', ()=>{
    leftcount += 5;
    if(categoriesMenu.style.transform == 'translateX(0%)'){
        leftcount = 0;
    }
    categoriesMenu.style.transform = `translateX(${leftcount}%)`
})

rightBtn.addEventListener('click', ()=>{
    leftcount -= 5
    if(categoriesMenu.style.transform == 'translateX(-60%)'){
        leftcount = 0
    }
    categoriesMenu.style.transform = `translateX(${leftcount}%)`
})