import User from "./User.js"
import UserClass from "./UserClass";
import { Component } from "react";

class About extends Component{
  constructor(props){
    super(props);

    console.log("Parent Constructor");

  }

  componentDidMount(){
    console.log("Parent Component Did Mount");
  }

  render(){
    console.log("Parent Render")
    return(
      <div>
        <h1>About Class Component</h1>
        <h2>This is Food Ordering App</h2>
        {/* <User name = {"Farukh Khan (function)"}/> */}
  
        <UserClass name = {"Farukh Khan (Class)"} location = {"Kanpur Class"}/>
      </div>
    );
  }
};



// const About = () =>{
//   return(
//     <div>
//       <h1>About Us</h1>
//       <h2>This is Food Ordering App</h2>
//       {/* <User name = {"Farukh Khan (function)"}/> */}

//       <UserClass name = {"Farukh Khan (Class)"} location = {"Kanpur Class"}/>
//     </div>
//   );
// };

export default About;
