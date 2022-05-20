
//* --------------------------------Login screen---------------------------------------- 


const submitBtn = document.getElementById('submitButton');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');


//On click get data and pass to back end 
submitBtn.addEventListener('click', () => {

      //cCheck user is not blank
      if(inputUsername.value === "" || inputPassword.value === ""){

            
            alert('Please enter username and password!');

            throw new Error('No username or password detected');


      }

      console.log('button was clicked');

      const userInput = {inputUsername: inputUsername.value, inputPassword: inputPassword.value};

      console.log(userInput);

});


