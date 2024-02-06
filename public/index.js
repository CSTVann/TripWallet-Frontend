window.onscroll = function () {
    dynamicNav = document.getElementById('dynamic-nav')
    if (window.scrollY > 1) {
        var scrollingSize = window.scrollY >= 32 ? 16 : window.scrollY/2;
        var size = 16 - scrollingSize;
        dynamicNav.style.margin = '16px ' + size +'px'
        
        if (window.scrollY > 32) {
            dynamicNav.style.borderRadius = '0'
        }
        else {
            dynamicNav.style.borderRadius = '10px'
        }
    }
};

/*=============== SHOW HIDDEN - PASSWORD ===============*/

const showHiddenPass = (loginPass, loginEye) =>{
    const input = document.getElementById(loginPass),
          iconEye = document.getElementById(loginEye)
 
    iconEye.addEventListener('click', () =>{
       // Change password to text
       if(input.type === 'password'){
          // Switch to text
          input.type = 'text'
 
          // Icon change
          iconEye.classList.add('ri-eye-line')
          iconEye.classList.remove('ri-eye-off-line')
       } else{
          // Change to password
          input.type = 'password'
 
          // Icon change
          iconEye.classList.remove('ri-eye-line')
          iconEye.classList.add('ri-eye-off-line')
       }
    })
 }
 
showHiddenPass('login-pass','login-eye')