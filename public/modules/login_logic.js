
//* --------------------------------Login screen---------------------------------------- 

const submitBtn = document.getElementById('submitButton');
const newUser = document.getElementById('newUserButton');
const messageAlert = document.getElementById('messageAlerts');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');


//On click get data and pass to back end 
submitBtn.addEventListener('click', () => {

      //Check user is not blank
      if(inputUsername.value === "" || inputPassword.value === ""){

            
            //alert('Please enter username and password!');
            messageAlert.innerHTML = 'Please enter username and password!';

            throw new Error('No username or password detected');


      }

      //Check input is not longer than 20 chracters
      if(inputUsername.value.length > 20 || inputUsername.value.length < 3){

            //alert('User name must be between 0 - 20 characters');
            messageAlert.innerHTML = 'User name must be between 0 - 20 characters';

            throw new Error('User name must be between 0 - 20 characters');

      }

      if(inputPassword.value.length > 20 || inputPassword.value.length < 6){

            //alert('Password must be between 6 - 20 characters');
            messageAlert.innerHTML = 'Password must be between 6 - 20 characters';
            throw new Error('Password must be between 6 - 20 characters');

      }


      console.log('button was clicked');

      const userInput = {inputUsername: inputUsername.value, inputPassword: inputPassword.value};

      console.log(userInput);

      fetch('/userInfo', {

            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
          
      })
      .then(response => response.json())
      .then(data => {
            console.log(data);

            if(data === 0){

                  alert('Password is incorrect');
                  userPromt(0);
                  return;

            }
            if(data === 1){

                  //Log user in
                  alert('User loging in');
                  userPromt(1);
                  return;
            }
            if(data === 2){

                  alert('User does not exist');
                  userPromt(2);
                  return;

            }
            

      });

});

function userPromt(accessCode){

      if(accessCode === 0){

            //Set message to Password incorrect
            messageAlert.innerHTML = 'Password is incorrect'
            return;
      }
      if(accessCode === 1){

            //Set message to logged in
            messageAlert.innerHTML = 'Logging in'
            return;

      }
      if(accessCode === 2){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'User does not exist'
            return;

      }


}




