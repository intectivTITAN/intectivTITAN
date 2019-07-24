// listen for auth status changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    window.location.href = "../App/App.html";
  } else {
    console.log('user logged out');
  }
});

var currentCode;

db.collection('codes').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    currentCode = doc.data().code;
  });
});

var Loginbtn = document.getElementById("LoginClick");
var Registerbtn = document.getElementById("RegisterClick");

var Loginmodal = document.getElementById("leftside");
Loginmodal.style.display = "none";

var Registermodal = document.getElementById("rightside");
Registermodal.style.display = "none";


Loginbtn.onclick = function() {
  Loginmodal.style.display = "block";
  Registermodal.style.display = "none";
};

Registerbtn.onclick = function() {
  Loginmodal.style.display = "none";
  Registermodal.style.display = "block";
};


//-------------------------Register && login with email part of this damed script

// signup
const signupForm = document.querySelector('#register-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const code = signupForm['signup-code'].value;

  if(currentCode == code){
    // sign up the user
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        isAdmin: false,
        email: email
      }).then(()=>{
        // close the signup modal & reset form
        signupForm.reset();
      })
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      document.getElementById("RegisterErrorText").innerText = errorMessage;
    });
  }
  else{
    document.getElementById("RegisterErrorText").innerText = "Invalid code";
  }

});

// login
const loginForm = document.querySelector('#LoginEmail-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    loginForm.reset();

  }).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    document.getElementById("LoginEmailErrorText").innerText = errorMessage;
  });

});



