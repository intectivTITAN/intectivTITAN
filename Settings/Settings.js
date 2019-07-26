const red = document.querySelector('#RedList');
const black = document.querySelector('#BlackList');
const white = document.querySelector('#WhiteList');


LoadErrors();

function LoadErrors() {
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
    black.appendChild(err);
}

function AddToRedList(doc){
    let err = document.createElement('li');
    err.className = "s_li";
    err.innerText = doc.data().m_name + " " +doc.data().value;
    red.appendChild(err);
}
function AddToWhiteList(doc){
    let err = document.createElement('li');
    err.className = "s_li";
    err.innerText = doc.data().m_name + " " +doc.data().value;
    white.appendChild(err);
}