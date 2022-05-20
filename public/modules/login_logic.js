
//* --------------------------------Login screen---------------------------------------- 


const submitBtn = document.getElementById('submitButton');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');


//On click get data and pass to back end 
submitBtn.addEventListener('click', () => {

      //Check user is not blank
      if(inputUsername.value === "" || inputPassword.value === ""){

            
            alert('Please enter username and password!');

            throw new Error('No username or password detected');


      }

      //Check input is not longer than 20 chracters
      if(inputUsername.value.length > 20){

            alert('User name exceeds 20 characters');

            throw new Error('Username exceeds 20 characters');

      }

      if(inputPassword.value.length > 20){

            alert('Password exceeds 20 characters');

            throw new Error('Password exceeds 20 characters');

      }


      console.log('button was clicked');

      const userInput = {inputUsername: inputUsername.value, inputPassword: inputPassword.value};

      console.log(userInput);

});


