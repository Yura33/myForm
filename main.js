'use strict'

document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('.form'),
        login = document.getElementById('login'),
        email = document.getElementById('email'),
        password = document.getElementById('password'),
        btn = document.getElementById('submit'),
        inputs = document.querySelectorAll('.form__input');
  

    btn.addEventListener('click', submit);

    async function submit(event) {
        event.preventDefault();
        if ( isValid() ) {
            const str = document.createElement('div');
            const data = {
                login: login.value,
                email: email.value,
                password: password.value
            };
            const res = await sendData('https://jsonplaceholder.typicode.com/posts', data);
            
            try {
                form.style = 'display: none';
                str.innerText = `Hi ${res.login}!!!`;
                str.classList.add('greeting');
                document.body.append(str);
    
                setTimeout(() => {
                    str.innerText = 'Login completed';
                    document.body.style.background = 'radial-gradient(rgb(101, 115, 255), rgb(122, 113, 238), rgb(143, 112, 220), rgb(164, 110, 203), rgb(185, 109, 185), rgb(206, 107, 168), rgb(178, 125, 175), rgb(149, 143, 181), rgb(121, 162, 188), rgb(92, 180, 194), rgb(64, 198, 201), rgb(35, 216, 207))';
                }, 3000)
            }
            catch(error) {
                console.log(error);
            }
        }
    }

    function isValid() {
        const regExp = {
            login: /^\S*$/,
            email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,4}$/i,
            password: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/
        };
        
        let isValid = false;

        inputs.forEach(item => {
            if (!item.value.trim()) {
                item.nextElementSibling.innerText = 'This field is required';
                item.classList.add('_error');
            } else {
                item.nextElementSibling.innerText = '';
                item.classList.remove('_error');
            }            
        });

        if (login.value.trim() && !regExp.login.test(login.value)) {
            login.nextElementSibling.innerText = 'The field must not contain spaces';
            login.classList.add('_error');
        } 
        if (login.value.trim() && login.value.length < 4) {
            login.nextElementSibling.innerText = 'The field must contain at least 4 characters';
            login.classList.add('_error');
        } 
        if (login.value.trim() && login.value.length > 10) {
            login.nextElementSibling.innerText = 'The field must contain less than 11 characters';
            login.classList.add('_error');
        }
        if (email.value.trim() && !regExp.email.test(email.value)) {
            email.nextElementSibling.innerText = 'Enter a valid email address';
            email.classList.add('_error');
        } 
        if (password.value.trim() && !regExp.password.test(password.value)) {
            password.nextElementSibling.innerText = 'The password must contain at least 1 digit';
            password.classList.add('_error');
        } 
        if (login.value.trim().length > 3 && login.value.trim().length < 11 && regExp.login.test(login.value) && regExp.email.test(email.value) && regExp.password.test(password.value)) {
            isValid = true;
        }
        return isValid;
    }

    const sendData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        });

        if (!response.ok) {
            throw new Error(`Error at the address ${url}, error status ${response}`);
        }

        return response.json();
    }
})

