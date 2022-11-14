import { useState, useEffect } from 'react';

// Base API route
const api_base = 'http://localhost:3002';

function App() {

  const [items, setItems] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newItem, setNewItem] = useState("");


  // runs on page load, eventually move load calories to a button associated with user
	useEffect(() => {
		GetUserItems(6); // bella id is 6
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

  const hideItem = async id => {
		const data = await fetch(api_base + '/item/hide/' + id).then(res => res.json());

		setItems(items => items.map(item => {
			if (item._id === data._id) {
				item.complete = data.complete;
			}

			return item;
		}));
		
	}

  return (
    <div className="App">
      <h1>Welcome to Cal Track</h1>

      {/* for users daily totals */}
      <div className="todays-totals">
        <div className="todays-user">welcome user</div>
        <div className="todays-cals">user calories</div>
        <div className="todays-protein">user protein</div>
      </div>

      {/* list of added items */}
      <div className="items">
        {items.length > 0 ? items.map(item => (
            <div className={
              "item" + (item.hidden ? " is-hidden" : " is-active")
            } key={item._id} onClick={() => hideItem(item._id)}>
              <div className="checkbox"></div>
              <div className="name">{item.entry}</div>
              <div className="calories">Calories: {item.calories}</div>
              <div className="protein">Protein: {item.protein}</div>
              <div className="delete" >X</div>
            </div>
          )) : (
            <p>You currently have no items today</p>
          )}
      </div>



    </div>
  );
}

export default App;
