
//* --------------------------------Login screen---------------------------------------- 


const submitBtn = document.getElementById('submitButton');
const newUserBtn = document.getElementById('newUserButton');
const messageAlert = document.getElementById('messageAlerts');
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');


//On click get data and pass to back end 
submitBtn.addEventListener('click', () => {

      //Check user is not blank
      if(inputUsername.value === "" || inputPassword.value === ""){

            
            //alert('Please enter username and password!');
            messageAlert.innerHTML = 'Please enter username and password!';

            // throw new Error('No username or password detected');


      }

      // //Check input is not longer than 20 chracters
      // if(inputUsername.value.length > 20 || inputUsername.value.length < 3){

      //       //alert('User name must be between 0 - 20 characters');
      //       messageAlert.innerHTML = 'User name must be between 3 - 20 characters';

      //       // throw new Error('User name must be between 0 - 20 characters');

      // }

      // if(inputPassword.value.length > 20 || inputPassword.value.length < 3){

      //       //alert('Password must be between 6 - 20 characters');
      //       messageAlert.innerHTML = 'Password must be between 3 - 20 characters';
      //       // throw new Error('Password must be between 6 - 20 characters');

      // }


      console.log('button was clicked');

      const userInput = {inputUsername: inputUsername.value, inputPassword: inputPassword.value};

      console.log(userInput);


      //Fetch user information from server - log them in if correct 
      fetch('/userLogin', {

            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
          
      })
      .then(response => response.json())
      .then(data => {
            console.log(data);

            if(data === 1){

                  //Log user in
                  // alert('User loging in');
                  userPromt(1);
                  console.log('Going to chat page');


                  localStorage.setItem('userName', inputUsername.value);
                  window.location.href = './chatPage.html';
                  //setUserName(inputUsername.value); //This does not work as we call the new page
                  return;

            } else {

                  //Display message to user
                  userPromt(data);

            }


      });
});

newUserBtn.addEventListener('click', () => {

      const userInput = {inputUsername: inputUsername.value, inputPassword: inputPassword.value};

      //Send create user request to server
      fetch('/newUser', {

            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInput)
      
      })
      .then(response => response.json())
      .then(data => {

            console.log(data);

            userPromt(data);

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
            return 'login';

      }
      if(accessCode === 2){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'User does not exist'
            return;

      }
      if(accessCode === 3){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'User name already used'
            return;

      }
      if(accessCode === 4){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'User created - please log in'
            return;

      }
      if(accessCode === 5){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'Username/password cannot contain non letter/number/underscore characters.'
            return;

      }
      if(accessCode === 6){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'Username is too long. Max 20 char.'
            return;

      }
      if(accessCode === 7){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'Username is too short. Min 3 char.'
            return;

      }
      if(accessCode === 8){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'Password is too long. Max 20 char.'
            return;

      }
      if(accessCode === 9){
            
            //Set message to user does not exist
            messageAlert.innerHTML = 'Password is too short. Min 6 char.'
            return;

      }


}




