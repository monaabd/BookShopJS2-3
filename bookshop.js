window.onload = function(){
  let add = document.getElementById("add");
  let addBook = document.getElementById("addBook");
  let viewButton = document.getElementById("viewButton");
  let viewBook = document.getElementById("viewBook");
  let inputTitle = document.getElementById("inputTitle").value;
  let inputAuthor = document.getElementById("inputAuthor").value;
   let inputDelete = document.getElementById("inputDelete").value; 
    var changeBook=document.getElementById("changeBook");
    let changeAuthor= document.getElementById("changeAuthor").value;
    let changeTitle= document.getElementById("changeTitle").value;
    let google= document.getElementById("google");
    let googleList=document.getElementById("googleList");
    let search=document.getElementById("search"); // button
    let apiKey = document.getElementById("apiKey");
    let Api= document.getElementById("Api");
    let key= 'aT4dA';
    
    search.addEventListener("click",function(event){
           
         let q = document.getElementById("google").value; 
          fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`)
         .then(function(response){ 
            response.json().then(function(json){
             googleList.innerHTML='';
            json.items.forEach(book =>{
                 googleList.innerHTML +=`<p> Founded Title is: ${book.volumeInfo.title},   By : ${book.volumeInfo.authors}</p>`;
            })
              
                
             console.log(json);
            
               });
    })
  
     }) //google event                   
   
   apiKey.addEventListener("click",function(event){
       console.log('click');
        fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?requestKey`)
         .then(function(response){ 
            response.json().then(function(json){
             Api.innerHTML=json.key;
              key=json.key;  
            console.log(json.key);
               });
                        
    }) ; //fetch       
   }) ;// addEven
        
  add.addEventListener("click", function(event) {
      inputTitle = document.getElementById("inputTitle").value;
      inputAuthor = document.getElementById("inputAuthor").value;
     fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${key}&title=${inputTitle}&author=${inputAuthor}`)
         .then(function(response){ 
         
         
       //response subject which include status code ,header..
         //console.log(response);
       //  console.log(´Status:´,response.status);
         // what type of data i have ,like what Json
         
       // return promise to get data ,means we are waiting for things to happend come by promise, and here json is method for response which we have different method it can be text , json,,, here i need json object,
         response.json().then(function(data){
         console.log("Fetch Result:");
            if(data.status==="success"){ 
                console.log(data.status);
             addBook.innerHTML= ` Your book added successfully`;
            viewBooks(1);
            }
            // else( addBook.innerHTML=`There is an error please try again`);
         } )    
     });//fetch1
       
  })// add.event
  
  function viewBooks(nr){
      let tries = nr;
    fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${key}`)
         .then(function(response){  
         response.json().then(function(data){
            
         if(data.status==="success"){
             let viewDiv = document.getElementById('viewBook');
             let booklist= data.data;
             viewDiv.innerHTML='';

             booklist.forEach(book => {
                 console.log(book);
                 let eleTitle = document.createElement('span');
                 let eleAuthor= document.createElement('span');
                 let eleId= document.createElement('span');
                 eleId.innerHTML=`Id: ${book.id} `;
              
                 eleTitle.innerText=`Title: ${book.title} `;
                 eleAuthor.innerHTML=`Author: ${book.author}<br>`;
                 
                 viewDiv.appendChild(eleId);
                 viewDiv.appendChild(eleTitle);
                 viewDiv.appendChild(eleAuthor);
             })
         } 
        else if (data.status==="error"){
            if (tries < 10){
                tries++
                viewBooks(tries);
            }
        }
         })
  })
}
    
  viewButton.addEventListener("click",function(event){
        viewBooks(1);                                                               
  });//viewButton
    
    deleteButton.addEventListener("click",function(event){
    inputDelete = document.getElementById("inputDelete").value;
     fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=${key}&id=${inputDelete}`)
         .then(function(response){  
         response.json().then(function(data){
          if(data.status==="success"){
              console.log("book deleted");
          }
         else {
             console.log("davids error");
         }
             
         })
         
     })
         }); //addeventDelete
    
    console.log(changeBook);
    changeBook.addEventListener("click",function(event){
    inputDelete = document.getElementById("inputDelete").value;
    changeAuthor = document.getElementById("changeAuthor").value;
    changeTitle = document.getElementById("changeTitle").value;
     fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=update&key=${key}&id=${inputDelete}&title=${changeAuthor}&author=${changeTitle}`)
         .then(function(response){  
         response.json().then(function(data){
         if(data.status==="success"){
             console.log("data changed");
         }
             else {
                 console.log("error try again");
             }
         })
     })
         }); // addevent changebutton
} //window load
 