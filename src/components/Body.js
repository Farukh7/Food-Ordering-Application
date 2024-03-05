import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {
  // Local State Variable - Super powerful variable
  const [ListofRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  console.log("Body Render");

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();
    //Optioanl Chaining
    setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    // console.log(data);
  };



  // Normal JS Variable
  //   let ListofResturantsJs = [
  //     {
  //     info:{
  //       id: "334475",
  //       name:"KFC",
  //       cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
  //       cuisines: ["Burger", "American", "Snacks", "Fast Food"],
  //       costForTwo: 4000,
  //       deliveryTime: 36,
  //       avgRating: "3.8",
  //     }
  //     },
  //     {
  //   info:{
  //     id: "334474",
  //     name:"Dominos",
  //     cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
  //     cuisines: ["Burger", "American", "Snacks", "Fast Food"],
  //     costForTwo: 4000,
  //     deliveryTime: 36,
  //     avgRating: "4.5",
  //   },
  //     },
  //     {
  //       info:{
  //         id: "334471",
  //         name:"MS",
  //         cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
  //         cuisines: ["Burger", "American", "Snacks", "Fast Food"],
  //         costForTwo: 4000,
  //         deliveryTime: 36,
  //         avgRating: "4.7",
  //       },
  //     },
  // ];
  

  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) 
  return (<h1>Looks like you're offline!! Please check your internet connection. </h1> 
  );


  return ListofRestaurants.length === 0 ? (
    <Shimmer /> 
  ) : (
    <div className="body">
      <div className="filter flex">  
        <div className="search m-4 p-4">
          <input type ="text" className="border border-solid border-black" value ={searchText} onChange={(e) => {
            setSearchText(e.target.value);
          }} />
          <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
          onClick = {() => {
            // Filter the restaurant cards and update the UI
            // searchText
            console.log(searchText);
            
            const filteredRestaurant =  ListofRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );

            setFilteredRestaurant(filteredRestaurant);

          }}>Search</button>
        </div>
        <div className="search m-4 p-4 flex items-center">
        <button
          className="px-4 py-2 bg-gray-100  rounded-lg"
          onClick={() => {
            // Filter Logic Here
            const filteredList = ListofRestaurants.filter(
              (res) => res.info.avgRating > 4.2 && res.info.avgRating < 4.5
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
        <Link
        key={restaurant.info.id}
        to = {"/restaurants/" + restaurant.info.id}>
          <RestaurantCard  resData={restaurant} />
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
