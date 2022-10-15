// import { useParams } from "react-router-dom";
// import * as React from "react";
// import getId from "../utils/getId";
import key from "../apiKey";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecipeDetailed() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const title = urlParams.get("title");
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/324694/analyzedInstructions?apiKey=${key}`
    )
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setRecipe(data));
  }, []);

  // try  {
  //   // const address = `https://api.spoonacular.com/recipes/${673463}/information?apiKey=${key}`;
  //   const address = "https://api.exchangerate.host/latest";
  //   const response = await fetch(address);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setRecipe(data);
  //     console.log(data);
  //   } else {
  //     alert("couldnt receive data");
  //   }
  // } catch (err) {
  //   alert(err);
  // }

  return (
    <div className="content">
      <h3>How to do the {title}</h3>
      {recipe.map((recipe) => (
        <div>
          <h3>{recipe.name}</h3>
          <ol>
            {recipe.steps.map((steps) => (
              <li>{steps.step}</li>
            ))}
          </ol>
        </div>
      ))}
      <div>Bon appetit!</div>
      <Link to={"/"}>Go back</Link>
    </div>
  );
}
