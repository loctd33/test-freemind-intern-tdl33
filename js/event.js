// Xử lí Custom choose file
const fileReal = document.querySelector(".file-real");
const fileContainer = document.querySelector(".file-container");
const fileName = document.querySelector(".file-name");

fileContainer.addEventListener("click",(e) => {
    fileReal.click();
});

fileReal.addEventListener("change", (e) => {
    if(fileReal.value) {
        fileName.innerHTML = fileReal.value.replace(/^.*[\\\/]/, '');
    }
    else {
        fileName.innerHTML = "Đính kèm hình ảnh";
    }
})


// Xử lí Drowdown position
const items = document.querySelectorAll(".dropdown-list__item");
const posInput = document.querySelector(".position__input");

for(let item of items) {
    item.onclick = function() {
        posInput.value = this.textContent;
    }
}