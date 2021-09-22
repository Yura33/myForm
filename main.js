'use strict'

document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.form'),
        login = document.getElementById('login'),
        email = document.getElementById('email'),
        password = document.getElementById('password'),
        errors = document.querySelectorAll('.error'),
        btn = document.getElementById('submit'),
        inputs = document.querySelectorAll('.form__input');
  

    btn.addEventListener('click', submit);

    function submit(event) {
        event.preventDefault();
        if(isValid()) {
            const str = document.createElement('div');
            
            form.style = 'display: none';
            str.innerText = `Привет ${login.value}!!!`;
            str.classList.add('greeting');
            document.body.append(str);

            setTimeout(() => {
                str.innerText = 'Вход выполнен';
                document.body.style.background = 'radial-gradient(rgb(101, 115, 255), rgb(122, 113, 238), rgb(143, 112, 220), rgb(164, 110, 203), rgb(185, 109, 185), rgb(206, 107, 168), rgb(178, 125, 175), rgb(149, 143, 181), rgb(121, 162, 188), rgb(92, 180, 194), rgb(64, 198, 201), rgb(35, 216, 207))';
            }, 3000)
        }
    }

    function isValid() {
        const regExp = {
            email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/
        }
        
        let isValid = true;

        inputs.forEach(item => {
            if(!item.value.trim()) {
                isValid = false;
                item.nextElementSibling.innerText = 'Это поле обязательно для заполнения';
                item.classList.add('_error');
            } else {
                item.nextElementSibling.innerText = '';
                item.classList.remove('_error');
                isValid = true;
            }            
        });

        if(login.value.trim() && login.value.length < 4) {
            isValid = false;
            login.nextElementSibling.innerText = 'Поле должно содержать не менее 4 символов';
            login.classList.add('_error');
        } 
        if(login.value.trim() && login.value.length > 10) {
            isValid = false;
            login.nextElementSibling.innerText = 'Поле должно содержать не более 10 символов';
            login.classList.add('_error');
        }
        
        if(email.value.trim() && !regExp.email.test(email.value)) {
            isValid = false;
            email.nextElementSibling.innerText = 'Введите действительный адрес электронной почты';
            email.classList.add('_error');
        } 
        
        return isValid;
    }
    
})

