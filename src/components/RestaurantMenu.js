import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
// import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {

  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);
  console.log(resInfo);

  const [showIndex, setShowIndex] = useState(null);
  

  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // const fetchMenu = async () => {
  //   const data = await fetch(MENU_API + resId);
  //   const json = await data.json();
  //   setResInfo(json.data);
  // };

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[0]?.card?.card?.info;

    const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    // console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=> c.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    // console.log(categories);
    

    console.log(itemCards);
    
  return (
    <div className="text-center">
      
      <h1 className="font-bold my-10 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(" , ")} -  {costForTwoMessage}{" "}
      </p>

      {/* categories acoordions */}

      {categories.map((category, index) => (<RestaurantCategory key = {category?.card?.card?.title}data = {category?.card?.card}
      showItems = {index === showIndex ? true : false}
      setShowIndex = {() => setShowIndex(index)}
      />
      ))}

      






      {/* <h3>Menu</h3> */}
      {/* <ul>
        {itemCards.map((item) => <li key = {item.card.info.id}>{item.card.info.name} - {"Rs"} {item.card.info.price/100 || item.card.info.defaultPrice/100} </li> )}
      </ul> */}
    </div>
  );
};

export default RestaurantMenu;
