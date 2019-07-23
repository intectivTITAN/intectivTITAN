// listen for auth status changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    window.location.href = "App/App.html";
  } else {
    console.log('user logged out');
    window.location.href = "Login/Login.html";
  }
});
