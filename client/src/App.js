import { useState, useEffect } from 'react';

// Base API route
const api_base = 'http://localhost:3002S';

function App() {

  const [items, setItems] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newItem, setNewItem] = useState("");


  // runs on page load, eventually move load calories to a button associated with user
	useEffect(() => {
		GetUserItems(1);
	}, []);


  // get items from today from a specified user ID
  const GetItems = () => {
    fetch(api_base + '/items/')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch((err) => console.error("Error: ", err));
  }
 
  // get items from today from a specified user ID
  const GetUserItems = (id) => {
		fetch(api_base + '/todays-items/' + id)
			.then(res => res.json())
			.then(data => setItems(data))
			.catch((err) => console.error("Error: ", err));
	}

  return (
    <div className="App">
      <h1>Welcome to Cal Track</h1>

      {/* for users daily totals */}
      <div className="todays-totals">
        <div className="todays-cals">calories</div>
        <div className="todays-protein">protein</div>
      </div>

      {/* list of added items */}
      <div className="items">
        {items.length > 0 ? items.map(todo => (
            <div className={
              "item" + (todo.hidden ? " is-hidden" : "is-active")
            } key={item._id} onClick={() => hideItem(item._id)}>
              <div className="checkbox"></div>

              <div className="item-name">{item.text}</div>
              <div className="item-calories">{item.calories}</div>
              <div className="item-protein">{item.protein}</div>

              <div className="hide-todo">x</div>
            </div>
          )) : (
            <p>You currently have no items today</p>
          )}
          <div className="item">item name</div>
          <div className="calories">100</div>
          <div className="protein">8</div>
          <div className="hide">x</div>
      </div>



    </div>
  );
}

export default App;
