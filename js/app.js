


    let signupBTN = document.getElementById("signupBtn");
    let signinBTN = document.getElementById("signinBtn");
    let nameField = document.getElementById("nameField");
    let title = document.getElementById("title");

    signinBTN.onclick = function(){
        nameField.style.maxHeight = "0";
        title.innerHTML = "Sign In";
        signupBTN.classList.add("disable");
        signinBTN.classList.remove("disable")
        
        const loginForm = document.getElementById('form')
        loginForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            const mail = document.querySelector('#mail').value
            const pass = document.querySelector('#pass').value
            
            const Users = JSON.parse(localStorage.getItem('users')) || []
            
            const validUser = Users.find(user => user.mail === mail && user.pass === pass)
            if(!validUser){
                return alert('Usuario y/o password invalidos.')
            }
            alert(`Bienvenido ${validUser.name}`)
            window.location.href = '../index.html'
        })
    }

    signupBTN.onclick = function(){
        nameField.style.maxHeight = "63.75rem";
        title.innerHTML = "Sign Up";
        signinBTN.classList.add("disable");
        signupBTN.classList.remove("disable")
        
        const signupForm = document.getElementById('form')
        
        signupForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            const name = document.querySelector('#name').value
            const mail = document.querySelector('#mail').value
            const pass = document.querySelector('#pass').value

            const users = JSON.parse(localStorage.getItem('users')) || []
            const isUserRegistred = users.find(user => user.mail === mail)
            if(isUserRegistred){
                return alert('El usuario ya esta registrado!')
            }else{
                users.push({name: name, mail: mail, pass: pass})
                localStorage.setItem('users', JSON.stringify(users))
                alert('Registro exitoso!')
            }
        })
    }
