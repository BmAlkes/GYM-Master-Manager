const currentPage = location.pathname
console.log(currentPage)


const menuItems = document.querySelectorAll("header .menu a")
console.log(menuItems)


for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

