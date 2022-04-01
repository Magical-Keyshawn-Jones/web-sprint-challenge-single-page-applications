import React from "react";
import Form from "./Form";
import { Route,Link } from "react-router-dom";

const App = () => {



  return (
    <div>
      <Route path='/'>
        <h1>Homepage</h1>
        <Link to='/pizza'>
          <button id='order-pizza'>Order Pizza</button>
        </Link>
        <Form/>
      </Route>
    </div>
  );
};
export default App;
