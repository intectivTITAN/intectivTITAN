//-----------First off show the status---------
ShowStatus();
//----------------------------------------------

const pageContent = document.querySelector("#content");

//Scale buttons
const sb_1 = document.querySelector('#SB_1');//.25
const sb_2 = document.querySelector('#SB_2');//.5
const sb_3 = document.querySelector('#SB_3');//.75
const sb_4 = document.querySelector('#SB_4');//1

//event listners
sb_1.addEventListener('click', (e)=>{
  e.preventDefault();
  ChangeUIScale(1);
});

sb_2.addEventListener('click', (e)=>{
  e.preventDefault();
  ChangeUIScale(2);
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
  db.collection('m_test').get().then((snapshot) => {
    console.log(snapshot.docs);
    snapshot.docs.forEach(doc => {
      CreateMachineHTML(doc);
    });
  });
}

// listen for auth status changes
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    ShowEmail(user);

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
    case 1:
     /* Array.prototype.forEach.call(allElements, item =>{
        item.className = "m_container scale1";
    });*/
     allElements.className= "scale1";
      break;

    case 2:
      /*Array.prototype.forEach.call(allElements, item =>{
        item.className = "m_container scale2";
      });*/
      allElements.className= "scale2";
      break;

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
