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
            console.log(response);
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
        document.getElementById("recipeEnter").style="display:none";
        document.getElementById("SubtractIngredients").style="display:none";
        document.getElementById("RecipeSearch").style="display:none";
        document.getElementById("Top10").style="display:none";
    };
    function btn2Click(){
        console.log("btn2 click");
        var url = theUrl + "/categories";
        sendHttpRequest('GET',url).then(responseData => {
            console.log(responseData);
            var selectionResponse = responseData;
            var mySelect=document.getElementById("catNo");
            mySelect.options.length=0;
            for (var i in selectionResponse){
                var option = document.createElement("option");
                 option.text = selectionResponse[i].categoryName;
                 option.value = selectionResponse[i].categoryNo;
                 mySelect.add(option);
            }
        });
        console.log('HI');
        
        document.getElementById("ServerResponse").style="display:none";
        document.getElementById("recipeEnter").style="display:initial";
        document.getElementById("SubtractIngredients").style="display:none";
        document.getElementById("RecipeSearch").style="display:none";
        document.getElementById("Top10").style="display:none";
    };
    function btn3Click(){
        console.log("btn3 click");
        var url = theUrl + "/recipes";
        sendHttpRequest('GET',url).then(responseData => {
            console.log(responseData);
            var recipeSelect = document.getElementById("recipeSelect");
            recipeSelect.options.length=0;
            for (var i in responseData){
                var option = document.createElement("option");
                 option.text = responseData[i].recipeName;
                 option.value = responseData[i].recipeNo;
                 recipeSelect.add(option);
            }
            
            var list = document.getElementById("ingredientList");
            list.innerHTML = "";

            GrabIngredients();
        });
        document.getElementById("ServerResponse").style="display:none";
        document.getElementById("recipeEnter").style="display:none";
        document.getElementById("SubtractIngredients").style="display:initial";
        document.getElementById("RecipeSearch").style="display:none";
        document.getElementById("Top10").style="display:none";
    };
    function btn4Click(){
        console.log("btn4 click");
        document.getElementById("ServerResponse").style="display:none";
        document.getElementById("recipeEnter").style="display:none";
        document.getElementById("SubtractIngredients").style="display:none";
        document.getElementById("RecipeSearch").style="display:initial";
        document.getElementById("Top10").style="display:none";
    };
    function btn5Click(){
        console.log("btn5 click");
        console.log("get");
        document.getElementById("ServerResponse").style="display:none";
        document.getElementById("recipeEnter").style="display:none";
        document.getElementById("SubtractIngredients").style="display:none";
        document.getElementById("RecipeSearch").style="display:none";
        document.getElementById("Top10").style="display:initial";
        var url = theUrl + "/mostpop";
        sendHttpRequest('GET',url).then(responseData => {
            var list = document.getElementById("mostPopularList");
            list.innerHTML = "";

            for (var i in responseData){
                var rName = responseData[i].recipeName;
                var rQty = responseData[i].qtyOrdered;
                var t1 = document.createTextNode("Recipe: " + rName);
                var t2 = document.createTextNode("Quantity Ordered: " + rQty);
                var para = document.createElement("P");
                para.appendChild(t1);
                para.appendChild(document.createElement("br"));
                para.appendChild(t2);

                list.appendChild(para);
            }
        });
    };
    function btn6Click(){
        console.log("btn6 click");
        document.getElementById("top").innerText = "";
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

    function GrabIngredients() {
        var selector = document.getElementById("recipeSelect");
        console.log("Getting Ingredients for:" + selector.value);
        var url = theUrl + "/recipeIngredients";
        var body = {
            recipeNo: selector.value
        };
        sendHttpRequest('POST',url,body).then(responseData => {
            var list = document.getElementById("ingredientList");
            list.innerHTML = "";
            for (var i in responseData) {
                var ingredientText = responseData[i].ingredientName + ": Qty On Hand = " + responseData[i].qtyOnHand + ", Needed = " + responseData[i].amount;
                var tNode = document.createTextNode(ingredientText);

                var li = document.createElement("li");
                li.appendChild(tNode);

                list.appendChild(li);
            }
        });
    }

    function MakeRecipe() {
        var selector = document.getElementById("recipeSelect");
        console.log("Getting Ingredients for:" + selector.value);
        var url = theUrl + "/makeRecipe";
        var body = {
            recipeNo: selector.value
        };
        sendHttpRequest('POST',url,body).then(responseData => {
            console.log(responseData);
            if (responseData.word == "Success"){
                GrabIngredients();
            }
            else {                
                var list = document.getElementById("ingredientList");
                list.appendChild(document.createTextNode("Not enough ingredients"));
            }
        });
    }

    function SearchRecipe() {
        var body = {
            recipeName: document.getElementById("recipeNameBox").value
        };
        var url = theUrl + "/searchRecipe";

        console.log("Searching for: " + body.recipeName);

        sendHttpRequest('POST',url,body).then(responseData => {
            var list = document.getElementById("recipeSearchResults");
            list.innerHTML = "";
            for (var i in responseData) {
                var tName = document.createTextNode("Recipe: " + responseData[i].recipeName);
                var tCat = document.createTextNode("Category: " + responseData[i].categoryName);
                var tInst = document.createTextNode("Instructions: " + responseData[i].instructions);
                var tQty = document.createTextNode("Qty per recipe: " + responseData[i].qtyPerRecipe);
                var tPrep = document.createTextNode("Prep: " + responseData[i].estPrepTime);
                var tCook = document.createTextNode("Cook: " + responseData[i].estCookTime);
                var tOnHand = document.createTextNode("Qty on hand: " + responseData[i].qtyOnHand);
                var tPrice = document.createTextNode("Standard Price: " + responseData[i].stdSellingPrice);
                
                var p = document.createElement("p");
                p.appendChild(tName);
                p.appendChild(document.createElement("br"));
                p.appendChild(tCat);
                p.appendChild(document.createElement("br"));
                p.appendChild(tInst);
                p.appendChild(document.createElement("br"));
                p.appendChild(tQty);
                p.appendChild(document.createElement("br"));
                p.appendChild(tPrep);
                p.appendChild(document.createElement("br"));
                p.appendChild(tCook);
                p.appendChild(document.createElement("br"));
                p.appendChild(tOnHand);
                p.appendChild(document.createElement("br"));
                p.appendChild(tPrice);
                p.appendChild(document.createElement("br"));

                list.appendChild(p);
            }
        })
    }
    function GetCustomerSpend()
    {
        var mySelect = document.getElementById("customerName");
        var url = theUrl + "/customers";
        var body = {
            customerNo: mySelect.value
        }
        sendHttpRequest('POST',url,body).then(responseData => {
            console.log(responseData);
            var selectionResponse = responseData;
            var myAnswer=document.getElementById("customerAnswer");
            myAnswer.innerHTML=" ";
            var text1, text2
            for (var i in selectionResponse){
                var option = document.createElement("option");
                 text1 = selectionResponse[i].customerName;
                 text2 = selectionResponse[i].totalMoneySpent;
            }
            myAnswer.innerHTML="The customer "+text1+" has spent a total of "+text2;
        });
    }

    //event listeners
    document.getElementById("btn1").addEventListener("click",btn1Click);
    document.getElementById("btn2").addEventListener("click",btn2Click);
    document.getElementById("btn3").addEventListener("click",btn3Click);
    document.getElementById("btn4").addEventListener("click",btn4Click);
    document.getElementById("btn5").addEventListener("click",btn5Click);
    document.getElementById("btn6").addEventListener("click",btn6Click);
    document.getElementById("customerSpend").addEventListener("click",GetCustomerSpend);
    document.getElementById("submitRecipe").addEventListener("click",SubmitRecipe);
    document.getElementById("makeRecipe").addEventListener("click",MakeRecipe);
    document.getElementById('searchRecipe').addEventListener("click",SearchRecipe);
    document.getElementById('recipeSelect').addEventListener("change",GrabIngredients);
}