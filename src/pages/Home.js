import { useState } from "react";
import Key from "./../apiKey";
export default function Home() {
  //here we have array with ingredients, I use this state for rendering the ingredients the user added.
  const [ingredientsArray, setIngredientsArray] = useState([]);
  //It's the state that defines the value of current ingredient in input.
  const [ingredient, setIngredient] = useState("");
  //This state contains the info about the results of our search and used for rendering them on page.
  const [searchResult, setSearchResult] = useState([]);
  //This state contains ingredients user gave and the delimeter is ,+
  //It's used for making a search request
  const [ingredients, setIngredients] = useState("");

  function setIngredientsParser(ingredient) {
    console.log(ingredient);
    if (ingredients == "") {
      setIngredients(ingredient);
    } else {
      setIngredients(ingredients + `,+${ingredient}`);
    }
    //I just add a value to array
    setIngredientsArray((current) => [...current, ingredient]);
    setIngredient("");
  }
  async function getRecipes(ingredients) {
    try {
      const address = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ranking=1&number=10&ignorePantry=true&apiKey=${Key}`;
      const response = await fetch(address);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
        setIngredientsArray([]);
      } else {
        alert("couldnt receive data");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="content">
      <div>
        <label>Add your ingredient</label>
        <input
          type="text"
          placeholder="Put ingredient you have here"
          id="ingredientInput"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button
          type="button"
          onClick={function () {
            setIngredientsParser(ingredient);
          }}
        >
          Add
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={function () {
            getRecipes(ingredients);
          }}
        >
          Search!!
        </button>
        <ol id="ingredients">
          {ingredientsArray.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ol>
        <ol>
          {searchResult.map((recipe) => (
            <div>
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>
              </li>
              <div>
                <h3>The ingredients you have and are used in recipe:</h3>
                {recipe.usedIngredients.map((usedIngredients) => (
                  <div key={usedIngredients.id}>{usedIngredients.original}</div>
                ))}

                <h3>The ingredients you don't have and are used in recipe:</h3>
                {recipe.missedIngredients.map((missedIngredients) => (
                  <div key={missedIngredients.id}>
                    {missedIngredients.original}
                  </div>
                ))}
              </div>
              <img src={recipe.image}></img>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}
