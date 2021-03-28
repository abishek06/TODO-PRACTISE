const inputText = document.querySelector('#inputText');
const btnAddEdit = document.querySelector('#btnAddEdit');
const inputToDoList = document.querySelector('.to-do-list');
const editText='Edit';
const addText='Add';
let todoList = new Array();
let listInnerHtml="";
let editItemIndex=-1;


getValuesFromLocalStorage();
showAllTasks();


/*Clearing all local storage */
function clearAll(){    
    todoList=[];
    localStorage.clear();
    showAllTasks();
    inputText.value = '';
    btnAddEdit.value=addText;
}

function showAllTasks(){   
    listInnerHtml='';
    if(todoList.length>0){
        todoList.forEach((element,index) => {
            listInnerHtml +=  `<li>${element}<span class="icon"><i class="fa fa-edit" onclick="editTask(${index})"></i> <i class="fa fa-trash" onclick="deleteTask(${index})"></i></span></li>`
        });
    }
    else
      listInnerHtml = `<li>There are no items to display. Please Enter Items to display..</li>`

    inputToDoList.innerHTML = listInnerHtml;  
}


function getValuesFromLocalStorage(){    
    var getLocalStorageData =localStorage.getItem('ToDo');      
    if(getLocalStorageData==null)
        todoList=[];
    else
        todoList = JSON.parse(getLocalStorageData);       
    
}

btnAddEdit.onclick=()=>{     
    getValuesFromLocalStorage();  
    if(btnAddEdit.value===addText){ 
        listInnerHtml='';   
        var userEnteredValue = inputText.value;      
        todoList.push(userEnteredValue);             
    }
    else if(btnAddEdit.value===editText){        
        getValuesFromLocalStorage();        
        todoList.splice(editItemIndex,1, inputText.value);
        btnAddEdit.value=addText;            
    }
    localStorage.setItem('ToDo', JSON.stringify(todoList));  
    showAllTasks();
    inputText.value='';
}

function deleteTask(index){    
    console.log(index);
    var items = JSON.parse(localStorage.getItem('ToDo'));
    var itemList = items.splice(index,1);
    localStorage.setItem('ToDo', JSON.stringify(items));
    getValuesFromLocalStorage();
    showAllTasks();
}

function editTask(index){
    debugger;
    var items = JSON.parse(localStorage.getItem('ToDo'));
    editItemIndex = index;
    inputText.value = items[index];
    btnAddEdit.value = editText;    
}