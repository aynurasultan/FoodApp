import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "../ItemList";

export default function FoodDetails({ foodId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [food, setFood] = useState(null); // Başlangıçta null
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!foodId) return;

    const fetchFood = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${apiKey}`
        );
        const data = await response.json();
        setFood(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFood();
  }, [foodId, apiKey]);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (!food) return null;

  return (
    <div className={styles.recipeCard}>
      <h1 className={styles.recipeName}>{food.title}</h1>
      {food.image && (
        <img className={styles.recipeImage} src={food.image} alt={food.title} />
      )}
      <div className={styles.recipeDetails}>
        <span>
          <strong>⏰ {food.readyInMinutes} Minutes</strong>
        </span>
        <span>
          👦🏻 <strong>Serves {food.servings}</strong>
        </span>
        <span>{food.vegetarian ? "🥦 Vegetarian" : "🥩 Non-Vegetarian"}</span>
      </div>
      <div>
        <span>${(food.pricePerServing / 100).toFixed(2)} Per Serving</span>
      </div>
      <h2>Ingredients</h2>
      <ItemList food={food} isLoading={isLoading} />
      <h2>Instructions</h2>
      <div className={styles.recipeInstructions}>
        {food.analyzedInstructions?.length > 0 &&
        food.analyzedInstructions[0]?.steps?.length > 0 ? (
          <ol>
            {food.analyzedInstructions[0].steps.map((step, index) => (
              <li key={index}>{step.step}</li>
            ))}
          </ol>
        ) : (
          <p>No instructions available.</p>
        )}
      </div>
    </div>
  );
}
