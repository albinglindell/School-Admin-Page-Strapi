

let fetching = async()=>{
let response = await fetch("http://localhost:1337/api/students")
let data = await response.json()
return data
}
const logedIn = localStorage.getItem("Token")

let deleteUser =  (id)=>{

    axios.delete(`http://localhost:1337/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`
        }
      });
      location.reload()
    }
let login = async ()=>{
    let username = document.querySelector("#_username").value
    let password = document.querySelector("#_password").value

    let response = await axios.post("http://localhost:1337/api/auth/local", 
    {
        identifier : username,
        password: password
    });
    let token = response.data.jwt
    console.log(token)
    localStorage.setItem("Token", token)
    location.reload()
}

let logOut = ()=>{
    localStorage.clear()
    location.reload()
}
 


let addStudent = async ()=>{
    let name = document.querySelector("#_Name").value
    let lastName = document.querySelector("#_LastName").value
    let age = document.querySelector("#_Age").value
    let education = document.querySelector("#_Education").value

    let response = await axios.post("http://localhost:1337/api/students", {
    data: {
        name: name,
        lastName: lastName,
        age: age,
        education: education
    }},
    {
        headers:{
            Authorization:`Bearer ${localStorage.getItem("Token")}`
        }
    }); 
    console.log(response)
    location.reload()
}

const wrapper = document.querySelector(".wrapper")

let nameComponent = (name, lastName, age, education, id)=> `
<div class="StudentCard">
<h1>${name}</h1>
<h2>${lastName}</h2>
<h3>${age}</h3>
<h4>${education}</h4>
<button onclick="deleteUser(${id})">Delete Student</button>
</div>
<br>
`

if (logedIn){
    fetching()
    .then(data=>{
        let students = data.data
        console.log(students)
    
    
        students.forEach(student =>{
            let {id, attributes} = student
            let {name, lastName, age, education} =attributes
            console.log(name, lastName, age, education, id)
    
            wrapper.innerHTML += nameComponent(name,lastName,age,education, id)
    
        })
    })
    
}
