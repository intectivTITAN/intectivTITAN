//-----------First off show the status---------
ShowStatus();
GetLastUpdate();
//----------------------------------------------

const pageContent = document.querySelector("#content");

const adminButton = document.querySelector('#adminButton');

//Scale buttons
const sb_5 = document.querySelector('#SB_5');//1.25
const sb_3 = document.querySelector('#SB_3');//.75
const sb_4 = document.querySelector('#SB_4');//1

//event listners
adminButton.addEventListener(('click'), (e)=>{
  e.preventDefault();
  window.location.href = "../Settings/Settings.html";
});

sb_5.addEventListener('click', (e)=>{
  e.preventDefault();
  ChangeUIScale(5);
});

sb_3.addEventListener('click', (e)=>{
  e.preventDefault();
  ChangeUIScale(3);
});

sb_4.addEventListener('click', (e)=>{
  e.preventDefault();
  ChangeUIScale(4);
});


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  console.log("We clicked the logout button");
  e.preventDefault();
  firebase.auth().signOut();
});

//History
const HistoryButton = document.querySelector('#histroyButton');
HistoryButton.addEventListener('click', (e)=>{
  e.preventDefault();
  ClearPage();
  //ShowHistory();
  HistoryButton.className = "active";
  CurrentButtton.className ="";
});

const CurrentButtton = document.querySelector("#statusButton");
CurrentButtton.addEventListener('click',(e)=>{
  e.preventDefault();
  ClearPage();
  ShowStatus();
  HistoryButton.className = "";
  CurrentButtton.className ="active";
});


//Clear page
function ClearPage(){
  var allElements = document.getElementById("content");
  while(allElements.hasChildNodes()){
    allElements.removeChild(allElements.firstChild);
  }
}

function ShowStatus(){
  //download machines
  db.collection('m_test').onSnapshot((snapshot) => {
    ClearPage();
    GetLastUpdate();
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
      CreateMachineHTML(doc);
    });
  });
}

function GetLastUpdate(){
  db.collection('lastUpdate').doc('lastUpdate').onSnapshot(function(doc){
    console.log("Last update: " + doc.data().datetime.toDate());
  });
}

// listen for auth status changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    ShowEmail(user);
    CheckifAdmin(user);
  } else {
    console.log('user logged out');
    window.location.href = "../Login/Login.html";
  }
});

//-------Storage bucket------------


//------------END FIREBASE ------------------
$(document).ready(function () {

  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

});

$(document).ready(function () {

  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function () {
    // open or close navbar
    $('#sidebar').toggleClass('active');
    // close dropdowns
    $('.collapse.in').toggleClass('in');
    // and also adjust aria-expanded attributes we use for the open/closed arrows
    // in our CSS
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

});

function CreateMachineHTML(doc){
  let img = document.createElement('img');
  let container = document.createElement('div');
  let center = document.createElement('center');
  let colorSpace = document.createElement('div');
  let text = document.createElement('div');

  //name at the top
  let H_name = document.createElement('p');
  H_name.style.textAlign = "center";
  H_name.textContent = doc.data().name;

  //img and color
  if(doc.data().status.toString() == "running"){
    colorSpace.className = "m_inner m_inner-green";
  }
  else if(doc.data().status.toString() == "idle"){
    colorSpace.className = "m_inner m_inner-yellow";
  }
  else if(doc.data().status.toString() == "error"){
    colorSpace.className = "m_inner m_inner-red";
  }

  img.src = doc.data().img;
  img.className = "m_img";

  colorSpace.appendChild(img);

  //PDN and status text
  text.className = "m_text";
  let pdnText = document.createElement('span');
  let breakPoint = document.createElement('br');
  pdnText.textContent = "PDN: " + doc.data().pdn;
  text.appendChild(pdnText);
  text.appendChild(breakPoint);

  //the whole container
  container.className = "m_container scale4";
  container.appendChild(H_name);

  center.appendChild(colorSpace);

  container.appendChild(center);
  container.appendChild(text);

  pageContent.appendChild(container);

}

function ChangeUIScale(size){
  var allElements = document.getElementById("content");

  switch (size) {

    case 3:
      /*Array.prototype.forEach.call(allElements, item =>{
        item.className = "m_container scale3";
      });*/
      allElements.className= "scale3";
      break;

    case 4:
      /*Array.prototype.forEach.call(allElements, item =>{
        item.className = "m_container scale4";
      });*/
      allElements.className= "";
      break;
    case 5:
      allElements.className="scale5";
      break;

    default:
      /*Array.prototype.forEach.call(allElements, item =>{
        item.className = "m_container scale4";
      });*/
      allElements.className= "";
      break;
  }
}


//------------------Show Email part-------------------
const emailPlace = document.getElementById("emailPlace");
const ShowEmail = (user) =>{
  emailPlace.innerText = user.email;
};

//Check if user is admin
function CheckifAdmin(user){
  var DBuser = db.collection('users').doc(user.uid);
  DBuser.get().then(function(doc){
    if(doc.data().isAdmin != true){
      button = document.getElementById("adminButton");
      button.parentNode.removeChild(button);
    }
  });

}



