import "./App.css";
import React from "react";
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = React.useState("");
  const [days, setDays] = React.useState(0);
  const [foodList, setFoodList] = React.useState([]);
  const [updateFood,  setUpdateFood] = React.useState('');


  React.useEffect(() => {
    Axios.get('https://mern-bg.herokuapp.com/read').then((Response) => {
      setFoodList(Response.data)
    })
  }, [])

  const submit = () => {
    Axios.post('https://mern-bg.herokuapp.com/insert', {
      foodName: foodName,
      days: days
    })
  }

  const Update = (_id) => {
    Axios.put('https://mern-bg.herokuapp.com/update', {
      id : _id,
      updateFood: updateFood
    })
  }

  const DeleteFood = (_id) => {
    Axios.delete(`https://mern-bg.herokuapp.com/delete/${_id}` )
  }

  return (
    <div className="App">
      <h2>CRUD APP</h2>
      <label>Food Name:</label>
      <input
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <label>Day Since You Ate:</label>
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />
      <button onClick={submit}>Submit</button>

      <h1>Food List</h1>
      {
        foodList.map((val, key) => {
          return(
            <div className='main' key={key}>
              <h4>{val.foodName}</h4>
              <h4>{val.daysSinceIAte}</h4>
              <div>
                <input type="text" onChange={(e) => setUpdateFood(e.target.value)} placeholder="New Food Name"/>
                <button onClick={() => Update(val._id)}>Update</button>
              </div>
              <button onClick={() => DeleteFood(val._id)}>Delete</button>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
