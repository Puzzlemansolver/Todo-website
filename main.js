const inputBox = document.querySelector(".input-task input");
const addBtn = document.querySelector(".input-task button");
const todoList = document.querySelector(".todo-list");
const deleteBtn = document.querySelector(".clearAll")

inputBox.onkeyup = ()=> {
    let userData = inputBox.value;//getting user input
    if(userData.trim() != 0 ){//iff user values  arent olny space
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}
showTask();

addBtn.onclick = ()=>{
    let userData=inputBox.value; //get user inoput
    let getLocalStorage = localStorage.getItem("New todo");//get local storage
    if(getLocalStorage == null){ //if local storage is null
        listArr=[];// craete blank array
    }else{
        listArr = JSON.parse(getLocalStorage);//transform json string to js object

    }
    listArr.push(userData);// pushing or adding user data
    localStorage.setItem("New todo", JSON.stringify(listArr));//transform js object to a json string
    showTask();
    addBtn.classList.remove("active");
}

function showTask(){
    let getLocalStorage = localStorage.getItem("New todo"); 
    if(getLocalStorage == null){
        listArr= [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNum =document.querySelector(".pendingNum");
    
        if(listArr.length >0)
        {
            deleteBtn.classList.add("active");
        }else{
            deleteBtn.classList.remove("active");
        }
    pendingNum.textContent= listArr.length;
    let newLitag = '';
    listArr.forEach((element, index) =>{
        newLitag +=`<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fa-solid fa-trash"></i></span></li>`;
    });
    todoList.innerHTML= newLitag;
    inputBox.value="";
}

function deleteTask(index){
    let getLocalStorage =localStorage.getItem("New todo");
    listArr= JSON.parse(getLocalStorage);
    listArr.splice(index,1);// delete or remove the selected idnex
    //refresh list
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTask();
}

deleteBtn.onclick= ()=>{
    listArr=[];
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showTask();
}

