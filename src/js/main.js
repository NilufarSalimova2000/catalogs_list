import { getPhones, getNotebook, infoPhones, infoNotebook } from "./service.js";

const phonesList = document.querySelector(".phones_list");
const phoneInfo = document.querySelector(".phone_info");
const catalog = document.querySelector(".catalog")
const notebookList = document.querySelector(".notebook_list");
const btns = document.getElementsByClassName("btns");
const closeButton = document.querySelector(".close_btn");
const phoneDetails = document.querySelector(".phone_details");
const modalBg = document.querySelector('.modal_bg');
const openDrawerBtn = document.querySelector('.open-drawer-btn');
const closeDrawerBtn = document.querySelector('.close-drawer-btn');
const drawer = document.querySelector('.drawer');
const drawerItems = document.querySelector('.drawer-items');

const phonesrender = async () => {
    const data = await getPhones();
    const limitedData = data.slice(0, 4);
    phonesList.innerHTML = limitedData?.map((item) => (
        `<li class="w-[250px] rounded-[4px] text-center shadow-md px-[20px] py-[20px] bg-[#fff]">
        <img src=${item.img}>
        <h3 class="font-bold mb-[10px]">${item.title}</h3>
        <button data-id="${item.id}" class="bg-pink-500 w-[70px] py-[5px] btns">Show</button>
        </li>`
    )).join("");
};

phonesrender();


const notebookrender = async () => {
    const data = await getNotebook();
    const newdata = data.slice(0, 4)
    notebookList.innerHTML = newdata?.map((item) => (
        `<li class="w-[250px] rounded-[4px] text-center shadow-md px-[20px] py-[20px] bg-[#fff]">
        <img src=${item.img}>
        <h3 class="font-bold mb-[10px]">${item.title}</h3>
        <button data-id="${item.id}" class="bg-pink-500 w-[70px] py-[5px] btns">Show</button>
        </li>`
    )).join("");
};

notebookrender();

const save = (data) => {
    const oldData = JSON.parse(localStorage.getItem("numbers")) || [];
    localStorage.setItem("numbers", JSON.stringify([data, ...oldData]))
}

const openModal = (data) => {
    phoneInfo.style.display = "block";
    modalBg.style.display = "block";
    phoneDetails.innerHTML = `
        <div class="w-[250px] rounded-[4px] text-center shadow-md px-[20px] py-[20px] bg-[#fff] mx-auto">
            <img src=${data.img}>
            <h3 class="font-bold mb-[10px]">${data.title}</h3>
            <p>${data.rame}</p>
            <p>${data.brand}</p>
            <p>${data.price}</p>
            <p>${data.color}</p>
            <button class="btn bg-pink-500 w-[70px] py-[5px] mt-[10px]">Add</button>
        </div>`;

        const btn = document.querySelector(".btn");
        btn.addEventListener("click", () => {
            save(data);
        })
};

closeButton.addEventListener("click", () => {
    phoneInfo.style.display = "none";
    modalBg.style.display = "none";
});

catalog.addEventListener("click", async (e) => {
    const dataId = e.target.dataset.id;
    
    if (dataId) {
        let data;
        if (e.target.closest('.phones_list')) {
            data = await infoPhones(dataId);
        } else if (e.target.closest('.notebook_list')) {
            data = await infoNotebook(dataId);
        }

        if (data) {
            openModal(data);
        }
    }
});



openDrawerBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    displayDrawerItems(); 
});


closeDrawerBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
});

const displayDrawerItems = () => {
    const savedData = JSON.parse(localStorage.getItem("numbers")) || [];
    drawerItems.innerHTML = savedData.map(item => `
        <li>
            <img src=${item.img} width="50">
            <h3>${item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Color: ${item.color}</p>
        </li>
    `).join('');
};