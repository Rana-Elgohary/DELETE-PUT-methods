let data = document.getElementById("data")

let myReq = new XMLHttpRequest();
myReq.open("GET", "https://jsonplaceholder.typicode.com/photos", true) 
myReq.send()

myReq.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4){
        let jsData = JSON.parse(this.responseText)
        
        let mapping = jsData.map(function(element){
            let newDiv = document.createElement("div")
            let img = document.createElement("img")
            let H2 = document.createElement("h2")
            let p = document.createElement("p")
            let p2 = document.createElement("p")
            let edit = document.createElement("button")
            let delet = document.createElement("button")
    
            edit.setAttribute("onclick", `editHandel(${element.id})`)
            delet.setAttribute("onclick", `deleteHandel(${element.id})`)

            newDiv.className = `card`

            let title = document.createTextNode(`${element.title}`)
            let para2 = document.createTextNode(`The ID is: ${element.id}`)
            let para = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")
            let editTxt = document.createTextNode("Edit")
            let deleteTxt = document.createTextNode("Delete")

            img.setAttribute("src", `${element.url}`)

            H2.appendChild(title)
            p2.appendChild(para2)
            p.appendChild(para)
            edit.appendChild(editTxt)
            delet.appendChild(deleteTxt)

            newDiv.appendChild(img)
            newDiv.appendChild(p2)
            newDiv.appendChild(H2)
            newDiv.appendChild(p)
            newDiv.appendChild(edit)
            newDiv.appendChild(delet)
            return newDiv
        })

        mapping.forEach(element => {
            data.appendChild(element)
        });
    }
}


function editHandel(id){
    window.location.href =`card.html?id=${id}`
}

function deleteHandel(id){
    const confirmed = window.confirm("Are you sure?")
    if(confirmed){
        let myReq = new XMLHttpRequest();
        myReq.open("DELETE", `https://jsonplaceholder.typicode.com/photos/${id}`, true) 
        
        myReq.onload = function () {
            if (myReq.status == 200) {
                console.log("Data deleted successfully");
            } else {
                console.error("Failed to delete data");
            }
        };
        
        myReq.send()
    }
    else{
        console.log("Failed to delete")
    }
}