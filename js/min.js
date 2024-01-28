


let Categories = document.getElementById("Categories")
let Area = document.getElementById("Area")
let Ingredients = document.getElementById("Ingredients")
let ContactUs = document.getElementById("ContactUs")
let searchInput = document.getElementById("searchInput");


let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;






function call(){
    Categories.addEventListener("click" , function(){
        getCategories() 
        $(".icon2").addClass("d-none")
        $(".icon1").removeClass("d-none")
        $(".navTab").addClass("d-none")

    })
    
    
    Area.addEventListener("click" ,function(){
        getArea()
        $(".icon2").addClass("d-none")
        $(".icon1").removeClass("d-none")
        $(".navTab").addClass("d-none")

    })
    
    
    Ingredients.addEventListener("click" ,function(){
        getIngredients()
        $(".icon2").addClass("d-none")
        $(".icon1").removeClass("d-none")
        $(".navTab").addClass("d-none")

    })
    
    
    ContactUs.addEventListener("click" , function(){
        showContacts()
        $(".icon2").addClass("d-none")
        $(".icon1").removeClass("d-none")
        $(".navTab").addClass("d-none")

    })
    
    
    Search.addEventListener("click" ,function(){
        showSearchInputs()
        $(".icon2").addClass("d-none")
        $(".icon1").removeClass("d-none")
        $(".navTab").addClass("d-none")

    })
    
}

call()






// #########################  DETAILS ########################//


function displayMeals(data) {
    let box = ``;

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
            <img class="w-100" src="${data[i].strMealThumb}" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${data[i].strMeal}</h3>
            </div>
        </div>
</div>
        `
    }

   document.getElementById("display").innerHTML = box
}


async function getMealDetails(id) {
   


    $(".loading").fadeIn(300)

    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()


     display(response.meals[0])
     $(".loading").fadeOut(300)
    
   
}


function display(meal){

    let ingredients = ``
    let tagsStr = ``
    let tags = meal.strTags?.split(",")

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
  
    if (!tags) tags = []
  
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }


    box = ``
    box+=`<div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
`
 document.getElementById("display").innerHTML = box

}



// ################################# CAREGORY ############################//


async function getCategoryMeals(data) {
   



    $(".loading").fadeIn(300)

   

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`)
    response = await api.json()

    displayMeals(response.meals)
    

    $(".loading").fadeOut(300)
}

async function getCategories() {




    $(".loading").fadeIn(300)

   
    searchInput.innerHTML =""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await api.json()

    displayCategories(response.categories)

    $(".loading").fadeOut(300)
  

}

function displayCategories(data) {
    let box = ""

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center  p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    document.getElementById("display").innerHTML = box
}




// ##################################### AREA ###############################//


async function getArea() {
   
  

    $(".loading").fadeIn(300)

    searchInput.innerHTML =""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await api.json()
  
    displayArea(respone.meals)
    $(".loading").fadeOut(300)

}
function displayArea(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${data[i].strArea}')" class="rounded-2 text-center text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
    }

    document.getElementById("display").innerHTML = box
}

async function getAreaMeals(data) {

   

    $(".loading").fadeIn(300)

    searchInput.innerHTML =""
    

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${data}`)
    response = await api.json()
    displayMeals(response.meals)
    $(".loading").fadeOut(300)

}




// ########################### INGREDIENTS ###########################//


async function getIngredients() {

 

    $(".loading").fadeIn(300)


    searchInput.innerHTML =""
  
    
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await api.json()
  

    displayIngredients(respone.meals.slice(0,20))
    $(".loading").fadeOut(300)

}


function displayIngredients(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3" id="card">
                <div onclick="getIngredientsMeals('${data[i].strIngredient}')" class="rounded-2 text-center text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    document.getElementById("display").innerHTML = box
}

async function getIngredientsMeals(data) {



    $(".loading").fadeIn(300)
 
    searchInput.innerHTML =""

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${data}`)
    response = await api.json()


    displayMeals(response.meals)
    $(".loading").fadeOut(300)
   
}




//################################# SEARCH ############################//


async function searchByName(search) {
   



    $(".loading").fadeIn(300)

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    response = await api.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
     displayMeals(response.meals) 
     $(".loading").fadeOut(300)

}

searchByName("")


async function searchByFLetter(search) {
   
    
    $(".loading").fadeIn(300)

   
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])

    $(".loading").fadeOut(300)

}

function showSearchInputs() {
    let box = ``
 
 box+=`<div class="row py-4 ">
 <div class="col-md-6 ">
     <input oninput="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
 </div>
 <div class="col-md-6">
     <input oninput="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
 </div>
 </div>
 `
 document.getElementById("searchInput").innerHTML = box
     
 document.getElementById("display").innerHTML = ""
 }
 



// ############################## COTACT ############################//


function showContacts() {
   
    
    let box =``
    
    
   box+= `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
   <div class="container w-75 text-center">
       <div class="row g-4">
           <div class="col-md-6">
               <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
               <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Special characters and numbers not allowed
               </div>
           </div>
           <div class="col-md-6">
               <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
               <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Email not valid *exemple@yyy.zzz
               </div>
           </div>
           <div class="col-md-6">
               <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
               <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid Phone Number
               </div>
           </div>
           <div class="col-md-6">
               <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
               <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid age
               </div>
           </div>
           <div class="col-md-6">
               <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
               <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid password *Minimum eight characters, at least one letter and one number:*
               </div>
           </div>
           <div class="col-md-6">
               <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
               <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                   Enter valid repassword 
               </div>
           </div>
       </div>
       <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3">Submit</button>
   </div>
</div> `
   



    document.getElementById("display").innerHTML = box

   

    
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })
    
    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })
    
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })
    
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })
    
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })
    
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
    


}







function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }

     if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
       
        }
}



function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}












    $(".icon1").click(function(){
        $(".icon2").removeClass("d-none")
       $(".icon1").addClass("d-none")
       $(".navTab").removeClass("d-none")
    
    
    })
    



    $(".icon2").click(function(){
        $(".icon2").addClass("d-none")
       $(".icon1").removeClass("d-none")
       $(".navTab").addClass("d-none")
    
    
    })
    
    





