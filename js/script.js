const form = document.querySelector('#form');
const nameInput = document.querySelector('.name__input');
const phoneInput = document.querySelector('.phone__input');
const positionInput = document.querySelector('.position__input');
const exprienceInput = document.querySelector('.exprience__input');
const fileInput = document.querySelector('.file-real');
const emailInput = document.querySelector('.email__input');
const btnSubmit = document.querySelector('.btn-submit');

// const formAPI = 'https://freemind-test.netlify.app/.netlify/functions/test';
const formAPI = 'http://localhost:3000/body';




btnSubmit.addEventListener('click', (e) => {

    validateForm();

    // Kiểm tra form trước khi gửi
    if(isFormValid()==true) {
        submitForm();
    }
    else {
        e.preventDefault();
    }
    
});

///////////////////////////// Send Form //////////////////////////////////

function submitForm() {
    const formData = {
        body: {
            name: nameInput.value,
            phone: phoneInput.value,
            position: positionInput.value,
            exp: exprienceInput.value,
            picture: fileInput.value.replace(/^.*[\\\/]/, ''),
            email: emailInput.value
        }
    };
    
    fetchData(formData);
}

function fetchData(data,callback) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    fetch(formAPI,options)
    .then((response) => {
        response.json();
    })
    .then(callback)
}


///////////////////////////// Xử lí Form //////////////////////////////////

function isFormValid() {
    const inputContainers = form.querySelectorAll('.input-groups');
    let result = true;
    inputContainers.forEach((container) => {
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

function validateForm() {
    
    // Name
    if(nameInput.value.trim() == ''){
        setError(nameInput, 'Tên không được để trống');
    } else if(nameInput.value.trim().length < 3 || nameInput.value.trim().length > 15) {
        setError(nameInput, 'Tên phải lớn hơn 3 kí tự và nhỏ hơn 15 kí tự');
    }
    else {
        setSuccess(nameInput);
    }
    
    
    // Phone
    if(phoneInput.value.trim() == ''){
        setError(phoneInput, 'Số điện thoại không được để trống');
    } else if(!isPhoneNumber(phoneInput.value) || phoneInput.value.trim().length <10 || phoneInput.value.trim().length >12 ) {
        setError(phoneInput, 'Error: 10 < Phone < 12 numbers');
    }
    else {
        setSuccess(phoneInput);
    }
    
    
    // Position
    if(positionInput.value.trim() == ''){
        setError(positionInput, 'Vui lòng chọn vị trí ứng tuyển');
    }
    else {
        setSuccess(positionInput);
    }
    
    
    // exprience
    if(exprienceInput.value.trim() == ''){
        setError(exprienceInput, 'Kinh nghiệm không được để trống');
    }
    else {
        setSuccess(exprienceInput);
    }
    
    
    //email
    if(emailInput.value.trim() == ''){
        setError(emailInput, 'Email không được để trống');
    } else if(!isEmailValid(emailInput.value)) {
        setError(emailInput, 'Email không hợp lệ');
    }
    else {
        setSuccess(emailInput);
    }
    
}

// Hàm set khi nhập lỗi
function setError(element, errorMessage) {
    const parent = element.parentElement;
    
    if(parent.classList.contains('success')) {
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const errorInput = parent.querySelector('.input-err');
    errorInput.textContent = errorMessage;
}

// Hàm set khi nhập đúng
function setSuccess(element) {
    const parent = element.parentElement;
    if(parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

// Hàm kiểm tra số điện thoại
function isPhoneNumber(phoneNumber) {
    const reg = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return reg.test(phoneNumber);
}
// Hàm kiểm tra email hợp lệ
function isEmailValid(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
}
// function showNotify() {
//     const notifyCheck = document.querySelector('.notify');

//     notifyCheck.classList.add('hide')
//     console.log(notifyCheck);
// };