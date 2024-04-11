function checklogin(){
  let i = 0;
  let html = '';

  const header = document.querySelector('#header');

  html = `
    <button class="btnLogin-popup" id="login">Login</button>
  `;

  if(i === 0){
    header.innerHTML = header.innerHTML + html;
  }

}

checklogin();



const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close')

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});