// import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Key from "./apiKey";
function App() {
  const [ingridients, setIngridients] = useState("");
  const [ingridient, setIngridient] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  function setIngridientsParser(ingridient) {
    console.log(ingridient);
    if (ingridients == "") {
      setIngridients(ingridient);
      console.log(ingridients, 0);
    } else {
      setIngridients(ingridients + `,+${ingridient}`);
      console.log(ingridients, 1);
    }
    setIngridient("");
  }
  const data = [];
  async function getData(ingredients) {
    try {
      const address = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ranking=1&number=10&ignorePantry=true&apiKey=${Key}`;
      const response = await fetch(address);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
        console.log(data);
      } else {
        alert("couldnt receive data");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      WIP
      <div>
        <label>Add your ingridient</label>
        <input
          type="text"
          placeholder="Put ingridient you have here"
          id="ingridientInput"
          value={ingridient}
          onChange={(e) => setIngridient(e.target.value)}
        />
        <button
          type="button"
          onClick={function () {
            setIngridientsParser(ingridient);
          }}
        >
          click
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={function () {
            getData(ingridients);
          }}
        >
          Search!!
        </button>
        <ol>
          {searchResult.map((recipe) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
