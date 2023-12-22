const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get('id');
console.log('Photo ID:', photoId);

let myReq = new XMLHttpRequest();
myReq.open("GET", `https://jsonplaceholder.typicode.com/photos/${photoId}`, true) 
myReq.send()

myReq.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4){
        let jsData = JSON.parse(this.responseText)
        document.getElementById("photo").src = jsData.url
        document.getElementById("txtinput").value = jsData.title
        document.getElementById("numinput").value = jsData.id
    }
}

function saveHandler(){
    const titleValue = document.getElementById("txtinput").value;
    const idValue = document.getElementById("numinput").value;

    const updatedData = {
        title: titleValue,
        id: parseInt(idValue)
    };

    let myReq = new XMLHttpRequest();
    myReq.open("PUT", `https://jsonplaceholder.typicode.com/photos/${photoId}`,true) 

    myReq.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    myReq.onload = function () {
        if (myReq.status == 200) {
        console.log("Data updated successfully:", updatedData);
        } else {
        console.error("Failed to update data");
        }
    };

    myReq.send(JSON.stringify(updatedData));
}

function cancelHandler(){
    window.location.href = "index.html"
}