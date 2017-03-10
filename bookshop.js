window.onload = function(){
  let add = document.getElementById("add");
  let addBook = document.getElementById("addBook");
  let viewButton = document.getElementById("viewButton");
  let viewBook = document.getElementById("viewBook");
  let inputTitle = document.getElementById("inputTitle").value;
  let inputAuthor = document.getElementById("inputAuthor").value;
   let inputDelete= document.getElementById("inputDelete").value; 
    
    
  add.addEventListener("click", function(event) {
      
     fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=aT4dA&title=${inputTitle}&author=${inputAuthor}`)
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
             addBook.innerHTML= ` Your book added successfully`}
            // else( addBook.innerHTML=`There is an error please try again`);
         } )    
     });//fetch1
       
  })// add.event
  
  viewButton.addEventListener("click",function(event){
     fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=aT4dA`)
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
         })
         
        
         }
                                                                                                                                          )
  });//viewButton
    
    deleteButton.addEventListener("click",function(event){
        //let inputDelete = document.getElementById("inputDelete").value;
     fetch(`https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=aT4dA&id=${inputDelete}`)
         .then(function(response){  
         response.json().then(function(data){
         })
         
     })
         });
} //window load
