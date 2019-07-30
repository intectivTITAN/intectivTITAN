// listen for auth status changes
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    } else {
        console.log('user logged out');
        window.location.href = "../Login/Login.html";
    }
});


const red = document.querySelector('#RedList');
const black = document.querySelector('#BlackList');
const white = document.querySelector('#WhiteList');


const addRed = document.querySelector('#RedButton');
const addBlack = document.querySelector('#BlackButton');
const addWhite = document.querySelector('#WhiteButton');

// Get the modal
const redModal= document.getElementById("redModal");
const whiteModal = document.getElementById("whiteModal");
const blackModal = document.getElementById("blackModal");

const redSubmit = document.querySelector('#SubmitRed');
const blackSubmit = document.querySelector('#SubmitBlack');
const whiteSubmit = document.querySelector('#SubmitWhite');

redModal.style.display = "none";
whiteModal.style.display = "none";
blackModal.style.display = "none";

addRed.addEventListener('click', (e)=>{
    e.preventDefault();
    redModal.style.display = "block";
});

addBlack.addEventListener('click',(e) =>{
    e.preventDefault();
    blackModal.style.display = "block";
});

addWhite.addEventListener('click', (e)=>{
    e.preventDefault();
    whiteModal.style.display = "block";
});

redSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    let name = document.getElementById("nameOfmachineRed").value;
    let code = document.getElementById("errorCodeRed").value;
     SubmitError('red', name, code);
    redModal.style.display = "none";
});

blackSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    let name = document.getElementById("nameOfmachineBlack").value;
    let code = document.getElementById("errorCodeBlack").value;
    SubmitError('black', name, code);
    blackModal.style.display = "none";
});

whiteSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    let name = document.getElementById("nameOfmachineWhite").value;
    let code = document.getElementById("errorCodeWhite").value;
    SubmitError('white', name, code);
    whiteModal.style.display = "none";
});

LoadErrors();

function LoadErrors() {
    //First we need to clear the area
    var allElements = document.getElementById("RedList");
    while(allElements.hasChildNodes()){
        allElements.removeChild(allElements.firstChild);
    }

    var allElements = document.getElementById("BlackList");
    while(allElements.hasChildNodes()){
        allElements.removeChild(allElements.firstChild);
    }

    var allElements = document.getElementById("WhiteList");
    while(allElements.hasChildNodes()){
        allElements.removeChild(allElements.firstChild);
    }

    db.collection('error-black').get().then((snapshot) =>{
        snapshot.docs.forEach(doc=>{
            AddToBlackList(doc);
        })
    });

    db.collection('error-red').get().then((snapshot) =>{
        snapshot.docs.forEach(doc=>{
            AddToRedList(doc);
        })
    });

    db.collection('error-white').get().then((snapshot) =>{
        snapshot.docs.forEach(doc=>{
            AddToWhiteList(doc);
        })
    });
}

function AddToBlackList(doc){
    let err = document.createElement('li');
    err.className = "s_li";
    err.innerText = doc.data().m_name + " " +doc.data().value;
    err.id = "B "+doc.data().m_name + " " +doc.data().value;
    err.setAttribute("onclick", "deleteThis(this.id)");
    black.appendChild(err);
}

function AddToRedList(doc){
    let err = document.createElement('li');
    err.className = "s_li";
    err.innerText = doc.data().m_name + " " +doc.data().value;
    err.id = "R "+doc.data().m_name + " " +doc.data().value;
    err.setAttribute("onclick", "deleteThis(this.id)");
    red.appendChild(err);
}
function AddToWhiteList(doc){
    let err = document.createElement('li');
    err.className = "s_li";
    err.innerText = doc.data().m_name + " " +doc.data().value;
    err.id = "W "+doc.data().m_name + " " +doc.data().value;
    err.setAttribute("onclick", "deleteThis(this.id)");
    white.appendChild(err);
}

function ShowDeleteModal(idOfError){

}

function deleteThis(idOfError) {
    const itemToDelete = document.getElementById(idOfError);
    console.log(idOfError);
    var split = idOfError.split(" ");
    var type = split[0];

    switch(type){
        case 'R':
            db.collection("error-red").doc(split[1]+split[2]).delete().then(function(){
                console.log("Deleted")
            }).catch(function (error) {
                console.log("Error with deleting: " + error);
            });
            break;

        case 'W':
            db.collection("error-white").doc(split[1]+split[2]).delete().then(function(){
                console.log("Deleted")
            }).catch(function (error) {
                console.log("Error with deleting: " + error);
            });
            break;

        case 'B':
            db.collection("error-black").doc(split[1]+split[2]).delete().then(function(){
                console.log("Deleted")
            }).catch(function (error) {
                console.log("Error with deleting: " + error);
            });
            break;

    }

    LoadErrors();
}

function SubmitError(type, name, code){
console.log(type + name + code);
    if(type == 'red'){
        db.collection("error-red").doc(name+code).set({
            m_name: name,
            value: code
        }).then(function(){
            console.log("DONE")
        }).catch(function(error){
           console.log(error)
        });
    }
    else if(type == 'black'){
        db.collection("error-black").doc(name+code).set({
            m_name: name,
            value: code
        }).then(function(){
            console.log("DONE")
        }).catch(function(error){
            console.log(error)
        });
    }
    else if(type == 'white'){
        db.collection("error-white").doc(name+code).set({
            m_name: name,
            value: code
        }).then(function(){
            console.log("DONE")
        }).catch(function(error){
            console.log(error)
        });
    }

    LoadErrors();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == redModal || event.target == whiteModal || event.target == blackModal) {
        redModal.style.display = "none";
        whiteModal.style.display = "none";
        blackModal.style.display = "none";
    }
}