//-----------First off show the status---------
ShowStatus();
GetLastUpdate();
//----------------------------------------------


//----Containers and tables for history----
let t_container = document.createElement('div');
let Wholetable = document.createElement('table');
let table = document.createElement('tbody');
let tHead = document.createElement('thead');

table.id = "table";
table.className = "tg";
//They stop here

let isHistory = false;
let isStatus = true;

const pageContent = document.querySelector("#content");

const adminButton = document.querySelector('#adminButton');

google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(ShowChart);

//----------------------------------------------------
const machName = {
  a2: "ATG5",
  a5b: "ATG6",
  a6b: "ATG2",
  a3: "ATG3",
  a6a: "ATG4",
  a5a: "ATG1",
  LDI: "LDI",
  MDI: "MDI",
  LMB2_2: "CNC7",
  E6: "CNC",
  SPEEDM: "CNC4",
  MXR_1: "CNC8",
  MXR_2: "CNC3",
  MXR_3: "CNC1",
  MXR_4: "CNC2",
  Modul_1: "CNC9",
  Modul_2: "CNC10",
  Modul_3: "CNC11",
  PPC1: "PPC1",
  PPC2: "PPC2"

};

//Scale buttons
const sb_5 = document.querySelector('#SB_5');//1.25
const sb_3 = document.querySelector('#SB_3');//.75
const sb_4 = document.querySelector('#SB_4');//1

var currFFZoom = 1;
var currIEZoom = 100;


document.getElementById("SB_5").addEventListener('click', function() {
  document.body.style.transform = "scale(1.02)";
});



//event listners
adminButton.addEventListener(('click'), (e)=>{
  e.preventDefault();
  window.location.href = "../Settings/Settings.html";
});

/*sb_5.addEventListener('click', (e)=>{
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
});*/


// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  console.log("We clicked the logout button");
  e.preventDefault();
  firebase.auth().signOut();
});

const CurrentButtton = document.querySelector("#statusButton");
CurrentButtton.addEventListener('click',(e)=>{
  e.preventDefault();
  ClearPage();
  ShowStatus();
  isHistory = false;
  isStatus = true;
  HistoryButton.className = "";
  pieChartButton.className = "";
  CurrentButtton.className ="active";
});

function LoadHistoryData(type, name){
  let newRow = document.createElement('tr');
  let col0 = document.createElement('th');
  let col1 = document.createElement('th');
  let col2 = document.createElement('th');
  let col3 = document.createElement('th');
  let col4 = document.createElement('th');
  let col5 = document.createElement('th');
  let col6 = document.createElement('th');


  col0.innerText ="Time Taken"
  col1.innerText = "PDN"
  col2.innerText = "Swap Time"
  col3.innerText = "Ident"
  col4.innerText = "Name"
  col5.innerText = "Time Stamp"
  col6.innerText = "Spec"


  col0.className = "tg-0lax";
  col1.className = "tg-0lax";
  col2.className = "tg-0lax";
  col3.className = "tg-0lax";
  col4.className = "tg-0lax";
  col5.className = "tg-0lax";
  col6.className = "tg-0lax";

  newRow.appendChild(col4);
  newRow.appendChild(col5);
  newRow.appendChild(col0);
  newRow.appendChild(col1);
  newRow.appendChild(col2);
  newRow.appendChild(col3);
  newRow.appendChild(col6);

  tHead.appendChild(newRow);

  db.collection(type + "History").where("name", "==", name).get()
      .then(function(querySnapshot) {
        ClearTable();
        querySnapshot.forEach(function(doc) {
          let newRow = document.createElement('tr');
          let col0 = document.createElement('th');
          let col1 = document.createElement('th');
          let col2 = document.createElement('th');
          let col3 = document.createElement('th');
          let col4 = document.createElement('th');
          let col5 = document.createElement('th');
          let col6 = document.createElement('th');
          let col7 = document.createElement('th')


          col0.innerText = doc.data().TimeTaken;
          col1.innerText = doc.data().data.toString().split("|")[1];
          col2.innerText = doc.data().SwapTime;
          col3.innerText = doc.data().data.toString().split("|")[2];
          col4.innerText = doc.data().name;
          col5.innerText = doc.data().TimeStamp;
          col6.innerText = doc.data().run;
          col7.innerText = doc.data().date;


          col0.className = "tg-0lax";
          col1.className = "tg-0lax";
          col2.className = "tg-0lax";
          col3.className = "tg-0lax";
          col4.className = "tg-0lax";
          col5.className = "tg-0lax";
          col6.className = "tg-0lax";
          col7.className = "tg-0lax";

          newRow.appendChild(col4);
          newRow.appendChild(col5);
          newRow.appendChild(col0);
          newRow.appendChild(col1);
          newRow.appendChild(col2);
          newRow.appendChild(col3);
          newRow.appendChild(col6);
          newRow.appendChild(col7);

          table.appendChild(newRow);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

  Wholetable.appendChild(tHead);
  Wholetable.appendChild(table);
  t_container.setAttribute("style","box-shadow: inset 0px 0px 17px -6px rgba(54,43,54,1);overflow:auto;height:700px;width:800px;margin-top:20px");
  t_container.appendChild(Wholetable);
  document.getElementById("whole_container").appendChild(t_container);
}

function ClearTable() {
  var allElements = document.getElementById("table");
  while(allElements.hasChildNodes()){
    allElements.removeChild(allElements.firstChild);
    console.log("We deleted all the rows");
  }
}

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
    if(isStatus){
      ClearPage();
      GetLastUpdate();

      var isATG = document.querySelector('#cs_s_ATG').checked;
      var isCNC = document.querySelector('#cs_s_CNC').checked;

      console.log(snapshot.docs);
      snapshot.docs.forEach(doc => {
        if(isATG && doc.data().name[0] == "a"){
          CreateMachineHTML(doc);
        }
        else if(isCNC && doc.data().name[0] != "a" && doc.data().name[1] != "D"){
          CreateMachineHTML(doc);
        }
        else if(!isCNC && !isATG){
          CreateMachineHTML(doc);
        }
      });
    }
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

  const read = doc.data();

  //img and color
  if(read.data.toString().split("|")[0] == "running"){
    colorSpace.className = "m_inner m_inner-green";
  }
  else if(read.data.toString().split("|")[0] == "idle"){
    colorSpace.className = "m_inner m_inner-yellow";
  }
  else if(read.data.toString().split("|")[0] == "error"){
    colorSpace.className = "m_inner m_inner-red";
  }
  else if(read.data.toString().split("|")[0] == "off"){
    colorSpace.className = "m_inner m_inner-black"
  }

  img.src = read.img;
  img.className = "m_img";

  colorSpace.appendChild(img);

  //PDN and status text
  text.className = "m_text";
  let pdnText = document.createElement('span');
  let breakPoint = document.createElement('br');
  let identText = document.createElement('span');
  let breakPoint2 = document.createElement('br');
  let errorText = document.createElement('span');
  let breakPoint3 = document.createElement('br');
  let machineStuff = document.createElement('span');

  pdnText.textContent = "PDN: " + doc.data().data.toString().split("|")[1];
  errorText.textContent = "Error: " + doc.data().data.toString().split("|")[4];

  if(doc.data().name == "MDI"){
    var number =  doc.data().data.toString().split("|")[3];
    machineStuff.textContent = "Spec: " + number / 2;
  }
  else{
    var number =  doc.data().data.toString().split("|")[3];
    machineStuff.textContent = "Spec: " + number;
  }



  if(doc.data().name[0] == "a"){
    identText.textContent = "Ident: " + doc.data().data.toString().split("|")[2];
  }
  else if(doc.data().name[0] != "a" && doc.data().name[1] != "D"){
    identText.textContent = "End time: " + doc.data().data.toString().split("|")[2];
  }
  else if(doc.data().name[0] != "a" && doc.data().name[1] == "D"){
    identText.textContent = "None: " + doc.data().data.toString().split("|")[2];
  }


  text.appendChild(pdnText);
  text.appendChild(breakPoint);
  text.appendChild(identText);
  text.appendChild(breakPoint2);
  text.appendChild(errorText);
  text.appendChild(breakPoint3);
  text.appendChild(machineStuff);



  //the whole container
  container.className = "m_container scale4";
  container.appendChild(H_name);

  center.appendChild(colorSpace);

  container.appendChild(center);
  container.appendChild(text);

  pageContent.appendChild(container);

  //get the table
  container.setAttribute("data-toggle", "modal")
  container.setAttribute("data-target", "#exampleModalCenter")
  container.setAttribute("type", "button")

  //modify the table when opened
  container.onclick = function () {
    table = document.getElementById("table-body");
    table.innerHTML = null;

    //all " " and "-" are replaced with "_" and used as keys to get the right document
    var key = (doc.data().name.replace(" ", "_")).replace("-", "_");
    if(key.startsWith("A")) {
      key = key.toLocaleLowerCase();
    }
    console.log(key);
    var DF = db.collection('DFpS').doc(key).get().then(function (doc) {
      //prepare variable names
      var vrstica
      var stolp1
      var stolp2
      var stolp3

      var data = [];
      for(y in doc.data()) {
          data.push(y);
      }
      data.reverse();

      var x;
      for(i in data) {
        if(i == 9) break;
          x = data[i];
          if(key == "MDI") {
            
          }
          console.log(x);

        vrstica = document.createElement("tr");
        stolp1 = document.createElement("th");
        stolp1.innerText = x.substr(0, 10);
        stolp2 = document.createElement("th");
        stolp2.innerText = x.substr(11);
        stolp3 = document.createElement("th");
        stolp3.innerText = doc.data()[x];

        vrstica.appendChild(stolp1);
        vrstica.appendChild(stolp2);
        vrstica.appendChild(stolp3);

        table.appendChild(vrstica);
      }
    });

    document.getElementById("exampleModalCenter").style.opacity = "1";
  };
}

// modal manipulation
$(document).on('shown.bs.modal', function () {
  $('#exampleModalCenter').modal('show');
  $('#exampleModalCenter')[0].setAttribute("aria-hidden", true)
  console.log("modal show")
});

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


function extractData(str) {

}
