
const key="fOCc1KYy2B7RryxuPYbTTbtC799Ftrq0uMbu0H7w7dA"
const input=document.querySelector(".input_wrapper")
const img=document.querySelector(".image_gallery")
const gallery=document.querySelector(".gallery")
const searchValue=document.querySelector(".search_value")

 let searchparam=location.search

const api=`https://api.unsplash.com/photos/random?client_id=${key}&count=30`

const searchapi=`https://api.unsplash.com/search/photos?client_id=${key}&query=${searchparam}&per_page=50`

let allimages;
let currentimage;
 
const menubar=document.querySelector("#menubar")
const  allmenu=document.querySelector(".allmenu")
const menuitem=document.querySelectorAll(".menuitem")
const menuactive=document.querySelectorAll(".menuitems")
const buttn=document.querySelectorAll(".menu_down")
 

const getimage=async()=>{
  const data=await fetch(api)
  const alldata=await data.json()
    allimages=alldata
    getsimages(alldata)
}
 
const searchimage=async()=>{
  const search= searchparam.split("=")[1].replaceAll("+","")
  const data=await fetch(searchapi)
  const alldata=await data.json()
  const getdata=alldata.results
    allimages=getdata
    getsimages(getdata)
    searchValue.textContent=search
}
 const getsimages=(data)=>{
  data.map((data,index)=>{
    
   
    gallery.innerHTML+=`
      <div class="image_wrapper">
      <img src="${data?.urls?.regular}" class="image_gallery" alt="${data.id}">
      <div class="hover_image">
       <div class="hover_image_header">
       <i class="fa-solid fa-heart"></i>
       <i class="fa-solid fa-plus"></i>
       </div>
       <div class="hover_down">
           <div class="hover_down_left">
            <img src="${data.user.profile_image.small}"/>
            <div class="hover_details">
             <div class="deatils_items">
             <p>${data?.user?.first_name}</p>
             <span>Avaliable for hire <i class="fa-solid fa-check"></i></span>
             </div>
            </div>
           </div>
           <div class="hover_down_right">
           <i class="fa-solid fa-arrow-down"></i>
            </div>
       </div>
      </div>
      <div class="image_hidden">
           <span class="first_name">${data?.user?.first_name}</span>
          <P class="views">${data.views}</P>
          <img src="${data?.urls?.regular}" class="authorimage"/>
          <span class="download">${data.downloads}</span>
          <img src="${data.user?.profile_image?.small}" class="profimage"/>
      </div>
      </div>
    `  
   
})}
 let allfetchingdata;
 
  function gettingimage(){
      allfetchingdata=document.querySelectorAll(".image_wrapper")
      allfetchingdata.forEach((e,index)=>{
        e.addEventListener("click",()=>{
          currentimage=index
          showpopup(currentimage,allfetchingdata)
       })
      })
  }
   setTimeout(()=>{
       gettingimage()
   },500)


  function showpopup(number,alldata){
    const close=document.querySelector('.close_btn')
    const popup=document.querySelector(".popup")
    const popup_footer=document.querySelector(".popup_footer")

     let  currentdata=alldata[number]

     let currentimage=currentdata.querySelector(".image_gallery")
     let views=currentdata.querySelector(".views")
     let authorimage=currentdata.querySelector(".profimage")
     let download=currentdata.querySelector(".download")
     let first_name=currentdata.querySelector(".first_name")

      const profile_image=document.querySelector(".profileimage")
      const profile_name=document.querySelector(".profile_name")
      const main_image=document.querySelector(".main_image")
      
      popup.classList.remove("hide")

      profile_image.setAttribute("src", authorimage.src);
      profile_name.innerHTML=first_name.textContent
      console.log(profile_name,first_name,alldata[number])
      main_image.setAttribute("src", currentimage.src);
   
        popup_footer.innerHTML=`
        <div class="popup_view">
        <P>views</P>
        <span>${views.textContent=="undefined"?"3207":views.textContent}</span>
     </div>
     <div class="popupd_download">
      <p>downloads</p>
      <span>${download.textContent=="undefined"?"1219":download.textContent}</span>
     </div>
      <div class="popup_footer_btn">
        <span class="popup_btn_icon"><i class="fa-solid fa-share"></i>share</span>
        <span class="popup_btn_icon"><i class="fa-solid fa-circle-info"></i>info</span>
        <span class="popup_btn_icon"><i class="fa-solid fa-ellipsis"></i></span>
      </div>
        `
    
    close.addEventListener("click",()=>{
      popup.classList.add("hide")
    })
  }

if(searchparam=="")getimage()
else searchimage()

// active class

buttn.forEach(e=>{
  e.addEventListener("click",(e)=>{
     e.target.submit()
  })
})


const prevbtn=document.querySelector(".prev_btn")
const nextbtn=document.querySelector(".next_btn")

prevbtn.addEventListener("click",()=>{
  if(currentimage>0){
    currentimage--
    showpopup(currentimage,allfetchingdata)
  }
})
 nextbtn.addEventListener("click",()=>{
  if(currentimage<allimages.length-1){
    currentimage++
    showpopup(currentimage,allfetchingdata)
  }
   
})


menubar.addEventListener("click",()=>{
  allmenu.classList.toggle("active")
})

menuitem.forEach(e=>{
e.addEventListener("click",()=>{
   menuitem.forEach(e=>e.classList.remove("active"))
   e.classList.add("active")
})
})

