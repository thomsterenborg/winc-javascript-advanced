'use strict';

const cakeRecipes = require("./cake-recipes.json");

// function that compares two arrays, one with searchParams
// and one with the results from search
const compareSearchWithResult = (search, result) => {
  //Transform search and result with JSON.strigify to make them comparable 
  search = JSON.stringify(search);
  result = JSON.stringify(result);
  
  //compare and return the result
  return (search === result);
 
};

//Function that filters the elements of an array and check if the element is present in the JSON string
//If the element is present it will be pushed into a new array
const searchItemInRecipe = (search, recipe) => {
  const searchResult = [];

  if (search.filter(element => { 
    if (recipe.includes(element)) { 
      searchResult.push(element); 
    } 
  })); return searchResult; // returns the new array for further use
};

// Checks ingredients from search are in recipe

const searchForIngredients = (recipe, search) => {
  
  //set it to lower case to make it case insensitive
  //use JSON.stringify to make it searchable
  recipe = JSON.stringify(recipe).toLowerCase(); 
  search = search.map(element => element.toLowerCase()); //set it to lower case to make it case insensitive

  //This is where the searching happens
  const searchResult = searchItemInRecipe(search, recipe);
  
  //compare result with search and retun the result
  const result = compareSearchWithResult(search, searchResult);
  return result;
};

//Fucntion that searches for Author
const searchForAuthor = (recipe, search) => {
  
  //set to lower case to make it case insensitive
  //use JSON.stringify to make it searchable
  recipe = JSON.stringify(recipe).toLowerCase();
  search = search.map(element => element.toLowerCase()); //set it to lower case to make it case insensitive

  //This is where the searching happens
  let result = false;
  if (search.filter(element => {
    if (recipe.includes(element)) {
      result = true;
    }
  }));
  //retun the result
  return result;
};

const searchForSearchTerms = (recipe, search) => {
  //combine Name and Description of recipe to search both at one go
  //set it to lower case to make it case insensitive
  recipe = recipe.Name.concat(recipe.Description).toLowerCase();

  search = search.toLowerCase() //set search to lower case to make it case insensitive
  search = search.split(" "); //split string in to an array to able to filter out each element

  //This is where the searching happens
  const searchResult = searchItemInRecipe(search, recipe);
    
  //compare result with search and retun the result
  const result = compareSearchWithResult(search, searchResult);
  return result;
};

// Search for recipes 
const searchRecipes = (recipes, search) => {
  const result = [];
  recipes.forEach(recipe => {

    //Search for ingredients
    const ingredientsInRecipe = recipe.Ingredients;
    const ingrendientsInSearch = search.ingredients;
    
    if (ingrendientsInSearch) {
      if (!searchForIngredients(ingredientsInRecipe, ingrendientsInSearch)) return;
    };

    //search for author
    const authorFromRecipe = recipe.Author;
    const authorsFromSearch = search.authors;
    
    if (authorsFromSearch) {
      if (!searchForAuthor(authorFromRecipe, authorsFromSearch)) return;
    };

    //Search for search terms
    const searchTerms = search.searchTerms
    
    if (searchTerms) {
      if (!searchForSearchTerms(recipe, searchTerms)) return;
    };

    //Push recipe into the result array if all checks are true
  
    result.push(recipe)
    
  }); return result;
} ;

//function that prints the recipes in a nice way
const printRecipes = recipes => {
  const amountOfRecipes = recipes.length;
  let recipeCount = 1;

  //Log the total amount of found recipes
  console.log("****************************");
  console.log(`We have found ${amountOfRecipes} recipes`);
  console.log("****************************");

  //Log the found recipes
   recipes.forEach(recipe => {
    const name = recipe.Name;
    const author = recipe.Author;
    const description = recipe.Description;
    const ingredients = recipe.Ingredients;
     
    console.log(`\nRecipe ${recipeCount++}:`);
    console.log("----------------------------");
    console.log(`${name}`);
    console.log(`By: ${author}`);
    console.log("\nAbout this recipe:")
    console.log(description)
    console.log("\nIngredients:\n")
    ingredients.forEach(ingredient => console.log(` * ${ingredient}`));
    });
};

//Paramenters that are used in search
const searchParams = {
  authors: ["best", "cook"],
  ingredients: ["syrup"],
  searchTerms: "brunch pancakes"
};

printRecipes(searchRecipes(cakeRecipes, searchParams));

//Didn't remove the code below so the mentors will be able to use it
// would've removed it otherwise since it doesn't need to be there.

// If you're ready to test: uncomment the code below.
// printRecipes(searchRecipes(cakeRecipes, {})); // 162
// printRecipes(searchRecipes(cakeRecipes, { ingredients: ["carrot"] })); // 3
// printRecipes(searchRecipes(cakeRecipes, { authors: ["Good food"] })); // 32
// printRecipes(searchRecipes(cakeRecipes, { searchTerms: "christmas simple" })); // 5
// printRecipes(
//     searchRecipes(cakeRecipes, {
//         ingredients: ["nuts"],
//         searchTerms: "christmas simple",
//     })
// ); // 2
// printRecipes(
//     searchRecipes(cakeRecipes, {
//         authors: ["best", "cook"],
//         ingredients: ["syrup"],
//         searchTerms: "brunch pancakes",
//     })
// ); // 2


