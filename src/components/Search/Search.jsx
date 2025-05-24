import { useEffect, useState } from "react";
import styles from "./search.module.css";

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!query.trim()) {
      setFoodData([]);
      setHasSearched(false);
      return;
    }

    async function fetchFood() {
      try {
        const response = await fetch(
          `${apiUrl}?query=${query}&apiKey=${apiKey}`
        );
        const data = await response.json();
        setFoodData(data.results);
        setHasSearched(true);
      } catch (error) {
        console.error("API Error:", error);
      }
    }

    fetchFood();
  }, [query, apiUrl, apiKey, setFoodData]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search for a dish..."
      />
      <ul>
        {hasSearched && foodData.length === 0 ? (
          <li>No results found</li>
        ) : (
          foodData.map((item) => <li key={item.id}>{item.title}</li>)
        )}
      </ul>
    </div>
  );
}
