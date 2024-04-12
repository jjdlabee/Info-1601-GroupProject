// function checklogin(){
//   let i = 0;
//   let html = '';

//   const header = document.querySelector('#header');

//   // html = `
//   //    <button class="btnLogin-popup" id="login">Login</button>
//   // `;

//   if(i === 0){
//     header.innerHTML = header.innerHTML + html;
//   }

// }

// checklogin();

// NAV CODE
    function openNav() {
      document.getElementById("mySidebar").style.width = "200px";
      document.getElementById("main").style.marginLeft = "200px";
      document.getElementById("button").style.scale = "0";
    }
    
    function closeNav() {
      document.getElementById("mySidebar").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      document.getElementById("button").style.scale = "1";
    }

//END NAV CODE

let state = [];
let cats = [];

//CATEGORY CARD CODE

    function renderCard(cat){
      const card = document.getElementById('content');
      const title = document.getElementById('head-text');
      let html = '';
      
      for(let i = 0; i < cat.categories.length; i = i + 1){
        html += `
          <div class="card">
            <img src="${cat.categories[i].strCategoryThumb}" alt="John" style="width:100%">
            <h1>${cat.categories[i].strCategory}</h1>
            <p class="title">Sunmmary</p>
            <p class="details">${cat.categories[i].strCategoryDescription}</p>
            <button id="show-details" onclick="ShowDetails('${cat.categories[i].strCategory}')"> Show More</button>
            <p><button onclick="renderRecipes('${cat.categories[i].strCategory}')">Show ${cat.categories[i].strCategory} Recipes</button></p>
          </div>
        `;
      }
      
      title.innerHTML = " Lets see...Categories"
      card.innerHTML = html;
    }
    

    function renderRecipes(category){
      const card = document.getElementById('content');
      const title = document.getElementById('head-text');
    
      let html = '';
    
      for(let i = 0; i < state.length; i = i + 1){
        if(state[i].meals !== null){
          for(let r = 0; r < state[i].meals.length; r = r + 1){
            if(category === state[i].meals[r].strCategory){
              html += `
              <div class="card">
                <img src="${state[i].meals[r].strMealThumb}" alt="John" style="width:100%">
                <h1>${state[i].meals[r].strMeal}</h1>
                <p class="title">Details:</p>
                <p class="details">${state[i].meals[r].strInstructions}</p>
                <div style="margin: 24px 0;">
                  <a href="#"><ion-icon name="reader"></ion-icon></i></a> 
                  <a href="#"><ion-icon name="star"></ion-icon></a>  
                  <a href="#"><ion-icon name="star-outline"></ion-icon></i></a>  
                </div>
                <p><button>ShowRecipes</button></p>
              </div>
              `;
    
            }
          }
        }
      }
  
      console.log(category)
      title.innerHTML = `Lets see...${category} Recipes`; 
      card.innerHTML = html;
    }

    //------->ASYNC FUNCTIONS<----------

    async function getCategory(){
      const response = await fetch ('https://www.themealdb.com/api/json/v1/1/categories.php');
      let categories = await response.json();

      // renderCard(categories);
      return categories;
    }

    async function getData(){
      let recipes = [];
      let r = 0;
      try{
        for (i = 97; i <= 122; i = i + 1) {
    
          const response1 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${String.fromCharCode(i)}`);
          const data = await response1.json();
    
          recipes[r] =  await data;
    
          r = r + 1;
        }
      }catch(e){
            console.log(e);//catch and log any errors
      }
      return recipes;
    
    }



    async function getAllRecipes(){
      state = await getData();
    
      cats = await getCategory();
      renderCard(cats);
    }
    
    
    getAllRecipes();

//END CATEGORY FUNCTIONS


function ShowDetails (category){
  const content = document.getElementById('content');
  const card = document.getElementsByClassName('card');

  let html = '';
  
  for(let i = 0; i < cats.categories.length; i = i + 1){
    if(cats.categories[i].strCategory == category){
      html = `
      <div class="wrapper">
        <button class="icon-close" onclick="hideDetails()">
          <ion-icon name="close"></ion-icon>
        </button>
    
        
         <h1>Description</h1>
         <p>${cats.categories[i].strCategoryDescription}</p>
            
            
        
      </div>
    
      `;
    }
  }
  content.innerHTML = html;

  content.classList.add('active');
}

function hideDetails(){
  const content = document.getElementById('content');
  
  renderCard(cats);
  content.classList.remove('active');
}




    





// let i;

// console.log("Alphabets form (A-Z) are:");

// // Using for loop for (A-Z):
// for (i = 97; i <= 122; i++) {
//     console.log(String.fromCharCode(i));
// }

