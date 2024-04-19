

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

          function renderCategoriesOut(categories){
            const card = document.getElementById('content');
            const title = document.getElementById('head-text');
            const search = document.getElementById('search-bar');
          
            let html = '';
            let searchBtn = '';
            
            for(let i = 0; i < categories.length; i = i + 1){
              html += `
                <div class="card">
                  <img src="${categories[i].strCategoryThumb}" alt="John" style="width:100%">
                  <h1>${categories[i].strCategory}</h1>
                  <p class="title">Summary</p>
                  <p class="details">${categories[i].strCategoryDescription}</p>
                  <button id="show-details" onclick="ShowDetails('${categories[i].strCategory}')"> Show More</button>
                
                </div>
              `;
            }
            
            searchBtn = `
                <input type="text" placeholder="Search Categories Recipes..." id="searchKey">
                <button onclick=searchCategoriesOut() ><i class="fa fa-search"></i></button>
              `;

            search.innerHTML = searchBtn;

            title.innerHTML = " Lets see...Categories"
            card.innerHTML = html;
          }


          function renderCategories(categories){
            const card = document.getElementById('content');
            const title = document.getElementById('head-text');
            const search = document.getElementById('search-bar');
          
            let html = '';
            let searchBtn = '';
            
            for(let i = 0; i < categories.length; i = i + 1){
              html += `
                <div class="card">
                  <img src="${categories[i].strCategoryThumb}" alt="John" style="width:100%">
                  <h1>${categories[i].strCategory}</h1>
                  <p class="title">Summary</p>
                  <p class="details">${categories[i].strCategoryDescription}</p>
                  <button id="show-details" onclick="ShowDetails('${categories[i].strCategory}')"> Show More</button>
                  <p><button class="recipeBtn" onclick="renderCatRecipes('${categories[i].strCategory}')">Show ${categories[i].strCategory} Recipes</button></p>
                </div>
              `;
            }
            
            searchBtn = `
                <input type="text" placeholder="Search Categories Recipes..." id="searchKey">
                <button onclick=searchCategories() ><i class="fa fa-search"></i></button>
              `;

            search.innerHTML = searchBtn;

            title.innerHTML = " Lets see...Categories"
            card.innerHTML = html;
          }
          

          function renderCatRecipes(category){
            const card = document.getElementById('content');
            const title = document.getElementById('head-text');
            const search = document.getElementById('search-bar');
          
            let html = '';
            let searchBtn = '';

            for(let i = 0; i < state.length; i = i + 1){
              if(category === state[i].strCategory){
                html += `
                <div class="card">
                  <img src="${state[i].strMealThumb}" alt="John" style="width:100%">
                  <h1>${state[i].strMeal}</h1>
                  <p class="title">Details:</p>
                  <p class="details">${state[i].strInstructions}</p>
                  <div class="small-icons" id="icons">
                    <a href="${state[i].strYoutube}"><i class="fa fa-youtube-play" style="font-size:24px"></i></a>
                    
                    <span id="${state[i].strMeal}">
                      <a onclick="favorite('${state[i].strMeal}')" ><ion-icon  name="star-outline"></ion-icon></a>
                    </span>  
                  
                  </div>
                  <p><button onclick="ShowRecipe('${state[i].strMeal}')">ShowRecipes</button></p>
                </div>
                `;
              }
            }

            searchBtn = `
                <input type="text" placeholder="Search ${category} Recipes..." id="searchKey">
                <button onclick=searchCatRecipes('${category}') ><i class="fa fa-search"></i></button>
              `;

            search.innerHTML = searchBtn;
            title.innerHTML = `Lets see...${category} Recipes`; 
            card.innerHTML = html;
          }


          function renderAllRecipes(recipes){
            const card = document.getElementById('content');
            const title = document.getElementById('head-text');
            const search = document.getElementById('search-bar');
          
            let html = '';
            let searchBtn = '';
        
            for(let i = 0; i < recipes.length; i = i + 1){
              html += `
              <div class="card">
                <img src="${recipes[i].strMealThumb}" alt="John" style="width:100%">
                <h1>${recipes[i].strMeal}</h1>
                <p class="title">Details:</p>
                <p class="details">${recipes[i].strInstructions}</p>
                <div class="small-icons" id="icons">
                  <a href="${recipes[i].strYoutube}"><i class="fa fa-youtube-play" style="font-size:24px"></i></a>
      
                </div>
                <p><button onclick="ShowRecipe('${recipes[i].strMeal}')">ShowRecipes</button></p>
              </div>
              `;
            }
            searchBtn = `
                <input type="text" placeholder="Search All Recipes..." id="searchKey">
                <button onclick=searchAllRecipes() ><i class="fa fa-search"></i></button>
              `;

            search.innerHTML = searchBtn;

            title.innerHTML = `Lets see...Recipes`; 
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



          async function getAllRecipesIn(){
            let tempState = await getData();
            let t = 0;

            for(let i = 0; i < tempState.length; i = i + 1){
              if(tempState[i].meals !== null){
                for(let r = 0; r < tempState[i].meals.length; r = r + 1){
                  state[t] = tempState[i].meals[r];
                  t = t + 1;
                }
              }
            }

            
            let tempCat = await getCategory();

            cats = tempCat.categories;

            renderCategories(cats);
          }
          

          async function getAllRecipesOut(){
            let temp = await getCategory();

            cats = temp.categories;

            renderCategoriesOut(cats);

          }

      //END CATEGORY FUNCTIONS

      //------------>Category Detail Functions<--------------------//
          function ShowDetails (category){
            const content = document.getElementById('content');
          
            let html = '';
            
            for(let i = 0; i < cats.length; i = i + 1){
              if(cats[i].strCategory == category){
                html = `
                <div class="wrapper">
                  <button class="icon-close" onclick="hideDetails()">
                    <ion-icon name="close"></ion-icon>
                  </button>
                  <h1>Description</h1>
                  <p>${cats[i].strCategoryDescription}</p>
                </div>
                `;
              }
            }
            content.innerHTML = html;
          
            content.classList.add('active');
          }
          
          function hideDetails(){
            const content = document.getElementById('content');
            
            renderCategories(cats);
            content.classList.remove('active');
          }

      //--------------->Recipe Detail Functions<--------------------//

      function ShowRecipe (name){
        const content = document.getElementById('content');

        let html = '';

        for(let i = 0; i < state.length; i = i + 1){
          if(name === state[i].strMeal){
            html = `
            <div class="wrapper">
              <button class="icon-close" onclick="hideRecipe('${state[i].strCategory}')">
                <ion-icon name="close"></ion-icon>
              </button>
              <h1>${state[i].strMeal}</h1>
              <h2>Recipe</h2>
              <p>${state[i].strInstructions}</p>
            </div>
            `;
          }
        }
        content.innerHTML = html;
        content.classList.add('active');
      }

      function hideRecipe(category){
        const content = document.getElementById('content');

        renderCatRecipes(category);
        content.classList.remove('active');
      }

      function favorite(name){
        const icon = document.getElementById('name');

        let html = '';

        html = `
          <a ><ion-icon  name="star"></ion-icon></a>
        `;

        console.log(icon.innerHTML)
        
        icon.innerHTML = html;

      }

      function unfavorite(){
        const icon = document.getElementById('icons');

        icon.classList.remove('active');
      }


      function searchCategories(){
        let searchKey = document.querySelector('#searchKey').value;

        let results = [];

        for(let rec of cats){
          let searchText = rec.strCategory.toUpperCase();
          searchKey = searchKey.toUpperCase();

          if ( searchText.search(searchKey) !== -1 ){
            results.push(rec);
          }
          renderCategories(results);
        }
      }

      function searchCategoriesOut(){
        let searchKey = document.querySelector('#searchKey').value;

        let results = [];

        for(let rec of cats){
          let searchText = rec.strCategory.toUpperCase();
          searchKey = searchKey.toUpperCase();

          if ( searchText.search(searchKey) !== -1 ){
            results.push(rec);
          }
          renderCategoriesOut(results);
        }
      }

      function searchCatRecipes(category){
        let searchKey = document.querySelector('#searchKey').value;
        let results = [];

        for(let rec of state){
          let searchText = rec.strMeal.toUpperCase();
          searchKey = searchKey.toUpperCase();
          
          if ( searchText.search(searchKey) !== -1 ){
            if(rec.strCategory === category){
              results.push(rec);
            }
          }
          renderAllRecipes(results);
        }
      }

      async function searchAllRecipes(){
        let searchKey = document.querySelector('#searchKey').value;

        let results = [];
        
        for(let rec of state){

          let searchText = rec.strMeal.toUpperCase();
          searchKey = searchKey.toUpperCase();

          if ( searchText.search(searchKey) !== -1 ){
            results.push(rec);
          }

          renderAllRecipes(results);
        }
      }

      function catBackBtn (){
        renderCategories(cats);
      }



      function AllRecipes(){
        renderAllRecipes(state);
      }




