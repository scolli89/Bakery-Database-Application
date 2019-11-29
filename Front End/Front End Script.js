//frontEndScript
//script.js
// gloabl variables
var dataBase;
var doingSomething = false; // if
var theUrl = 'http://localhost:5000/bake';

//http://107.22.132.66:8080/books';//api';
//'http://localhost:8080/books';//'';
//"
// Main
window.onload = myOnLoad;

function myOnLoad(){

    //Actual http request functions
    const sendHttpRequest =(method,url,data)=>{
        document.getElementById("outline").innerHTML = "";
        return fetch(url,{
            mode: 'cors',
            method: method,
            body: JSON.stringify(data),
            headers: data ? {'Content-Type': 'application/json'} : {}

        }).then(response => {
            if(response.status >= 400){ //!response.ok
                //=
                return response.json().then(errResData=>{
                    const error = new Error('Something went wrong!');
                    error.data = errResData;
                    throw error;
                });
            }
            return response.json();
        }).catch(response => {
            console.log(response);
        });


    };

    function btn1Click(){
        console.log("btn1 click");
        console.log("update");
        document.getElementById("recipeEnter").style="display:none";
        document.getElementById("ServerResponse").style="display:initial";
        var url = theUrl + "/functionOne";
        sendHttpRequest('GET',url).then(responseData => {
            console.log(responseData);
            var selectionResponse = responseData;
            var p = document.getElementById("outline");
            p.innerHTML = ""; // clear previousl contents
            var ul = document.getElementById("theList");
            ul.innerHTML = "";

            for (var i in selectionResponse){
                var rNum = selectionResponse[i].customerNo;
                var rName = selectionResponse[i].customerName;
                var rAdrs = selectionResponse[i].address;
                var t1 = document.createTextNode("No." + rNum);
                var t2 = document.createTextNode("\nName: " + rName);
                var t3 = document.createTextNode("\nAddress: "+rAdrs);
                var para = document.createElement("P");
                para.appendChild(t1);
                para.appendChild(t2);
                para.appendChild(t3);

                ul.appendChild(para);

            }
        });

    };
    function btn2Click(){
        console.log("btn2 click");
        var url = theUrl + "/categories";
        sendHttpRequest('GET',url).then(responseData => {
            console.log(responseData);
            var selectionResponse = responseData;
            var mySelect=document.getElementById("catNo");
            for (var i=0; i < mySelect.length; i++)
            {
                mySelect.remove(i);
            }
            for (var i in selectionResponse){
                var option = document.createElement("option");
                 option.text = selectionResponse[i].categoryNo;
                 mySelect.add(option);
            }
        });
        console.log('HI');
        document.getElementById("ServerResponse").style="display:none";
        document.getElementById("recipeEnter").style="display:initial";

        
    };
    function btn3Click(){
        console.log("btn3 click");
    };
    function btn4Click(){
        console.log("btn4 click");
    };
    function btn5Click(){
        console.log("btn5 click");
    };
    function btn6Click(){
        console.log("btn6 click");
    };

    function SubmitRecipe()
    {
        var RecipeBody = {
            recipeName: document.getElementById("Name").value,
            categoryNo: document.getElementById("catNo").value,
            instructions: document.getElementById("instructions").value,
            qtyPerRecipe: document.getElementById("qtyForRecipe").value,
            estPrepTime: document.getElementById("estPrepTime").value,
            estCookTime: document.getElementById("estCookTime").value,
            qtyOnHand: document.getElementById("qtyOnHand").value,
            stdSellingPrice: document.getElementById("estSellingPrice").value
          };
          
          console.log(RecipeBody);
          btn2Click();
    };

    //event listeners
    document.getElementById("btn1").addEventListener("click",btn1Click);
    document.getElementById("btn2").addEventListener("click",btn2Click);
    document.getElementById("btn3").addEventListener("click",btn3Click);
    document.getElementById("btn4").addEventListener("click",btn4Click);
    document.getElementById("btn5").addEventListener("click",btn5Click);
    document.getElementById("btn6").addEventListener("click",btn6Click);
    document.getElementById("submitRecipe").addEventListener("click",SubmitRecipe);
}


// button functions
