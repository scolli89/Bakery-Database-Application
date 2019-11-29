//frontEndScript
//script.js
// gloabl variables
var dataBase;
var doingSomething = false; // if
var theUrl = 'http://localhost:5000/bake';

//'http://107.22.132.66:8080/books';//api';
//'http://localhost:8080/books';//'';
//
// Main
window.onload = myOnLoad;

function myOnLoad(){

    //Actual http request functions
    const sendHttpRequest =(method,url,data)=>{
        //document.getElementById("outline").innerHTML = "";
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
            console.log(response.json());
        });


    };

    function btn1Click(){
        console.log("btn1 click");
        console.log("update");
        var url = theUrl + "/customers";
        sendHttpRequest('GET',url).then(responseData => {
            console.log(responseData);
            var selectionResponse = responseData;
            var mySelect=document.getElementById("customerName");
            mySelect.options.length=0;
            for (var i in selectionResponse){
                var option = document.createElement("option");
                 option.text = selectionResponse[i].customerName;
                 option.value = selectionResponse[i].customerNo;
                 mySelect.add(option);
            }
        });
        document.getElementById("ServerResponse").style="display:initial";
        document.getElementById("PopularID").style="display:none";
        document.getElementById("recipeEnter").style="display:none";

    };
    function btn2Click(){
        console.log("btn2 click");
        var url = theUrl + "/categories";
        sendHttpRequest('GET',url).then(responseData => {
            console.log(responseData);
            var selectionResponse = responseData;
            var mySelect=document.getElementById("catNo");
            //mySelect.options.length=0;
            for (var i in selectionResponse){
                var option = document.createElement("option");
                 option.text = selectionResponse[i].categoryName;
                 option.value = selectionResponse[i].categoryNo;
                 mySelect.add(option);
            }
        });
        console.log('HI');
        document.getElementById("ServerResponse").style="display:none";
        document.getElementById("PopularID").style="display:none";
        document.getElementById("recipeEnter").style="display:initial";

        
    };
    function btn3Click(){
        console.log("btn3 click");
    };
    function btn4Click(){
        console.log("btn4 click");
        document.getElementById("RecipeSearch").style="display:initial";
    };
    function btn5Click(){
        console.log("btn5 click");
        console.log("get");
        document.getElementById("ServerResponse").style="display:none";
        document.getElementById("PopularID").style="display:initial";
        document.getElementById("recipeEnter").style="display:none";
        var url = theUrl + "/mostpop";
        sendHttpRequest('GET',url).then(responseData => {
            console.log(responseData);
            var selectionResponse = responseData;
            var p = document.getElementById("outline");
            p.innerHTML = ""; // clear previousl contents
            var ul = document.getElementById("theList");
            ul.innerHTML = "The 10 Most Popular Recipes from the last 50 days";

            for (var i in selectionResponse){
                var rName = selectionResponse[i].recipeName;
                var rQty = selectionResponse[i].qtyOrdered;
                var t1 = document.createTextNode("Recipe: " + rName);
                var t2 = document.createTextNode("\nQuantity Ordered: " + rQty);
                var para = document.createElement("P");
                para.appendChild(t1);
                para.appendChild(t2);

                ul.appendChild(para);
            }
        });
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
          var url = theUrl + "/insertRecipe";
          sendHttpRequest('POST',url,RecipeBody).then(responseData => {
            console.log(responseData);
        });
          btn2Click();
    };

    function SearchRecipe() {
        var body = {
            recipeName: document.getElementById("recipeNameBox").value
        };
        var url = theUrl + "/searchRecipe";

        console.log("Searching for: " + body.recipeName);

        sendHttpRequest('POST',url,body).then(responseData => {
            var list = document.getElementById("recipeSearchResults");
            for (var recipe in responseData) {
                var tName = document.createTextNode("Recipe: " + recipe.recipeName);
                var tCat = document.createTextNode("Category: " + recipe.categoryName);
                var tInst = document.createTextNode("Instructions: " + recipe.instructions);
                var tQty = document.createTextNode("Qty per recipe: " + recipe.qtyPerRecipe);
                var tPrep = document.createTextNode("Prep: " + recipe.estPrepTime);
                var tCook = document.createTextNode("Cook: " + recipe.estCookTime);
                var tOnHand = document.createTextNode("Qty on hand: " + recipe.qtyOnHand);
                var tPrice = document.createTextNode("Standard Price: " + recipe.stdSellingPrice);
                
                var p = document.createElement("p");
                p.appendChild(tName);
                p.appendChild(tCat);
                p.appendChild(tInst);
                p.appendChild(tQty);
                p.appendChild(tPrep);
                p.appendChild(tCook);
                p.appendChild(tOnHand);
                p.appendChild(tPrice);

                list.appendChild(p);
            }
        })
    }
    function GetCustomerSpend()
    {
        var mySelect=document.getElementById("catNo");
        console.log(mySelect.text);
    }

    //event listeners
    document.getElementById("btn1").addEventListener("click",btn1Click);
    document.getElementById("btn2").addEventListener("click",btn2Click);
    document.getElementById("btn3").addEventListener("click",btn3Click);
    document.getElementById("btn4").addEventListener("click",btn4Click);
    document.getElementById("btn5").addEventListener("click",btn5Click);
    document.getElementById("btn6").addEventListener("click",btn6Click);
    document.getElementById("submitRecipe").addEventListener("click",SubmitRecipe);
    document.getElementById('searchRecipe').addEventListener("click",SearchRecipe);
    document.getElementById("customerSpend").addEventListener("click",GetCustomerSpend);
}