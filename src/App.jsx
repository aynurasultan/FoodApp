import { useState } from "react";
import Search from "./components/Search/Search.jsx";
import FoodList from "./components/FoodList.jsx";
import Nav from "./components/Nav/Nav.jsx";
import "./App.css";
import Container from "./components/Container/Container.jsx";
import InnerContainer from "./components/InnerContainer/InnerContainer.jsx";
import FoodDetails from "./components/FoodDetails/FoodDetails.jsx";

function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodId, setFoodId] = useState(null); // Başlangıçta null yap

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container>
        <InnerContainer>
          <FoodList setFoodId={setFoodId} foodData={foodData} />
        </InnerContainer>
        <InnerContainer>
          {foodId ? (
            <FoodDetails foodId={foodId} />
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              Please search and select a food to see its details.
            </p>
          )}
        </InnerContainer>
      </Container>
    </div>
  );
}

export default App;
