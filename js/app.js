/* CARRITO */


let signupBTN = document.getElementById("signupBtn");
let signinBTN = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signinBTN.onclick = function(){
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBTN.classList.add("disable");
    signinBTN.classList.remove("disable")
}

signupBTN.onclick = function(){
    nameField.style.maxHeight = "63.75rem";
    title.innerHTML = "Sign Up";
    signinBTN.classList.add("disable");
    signupBTN.classList.remove("disable")
}
