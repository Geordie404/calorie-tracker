import { useState, useEffect } from 'react';

// Base API route
const api_base = 'http://localhost:3002';

function App() {

  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newItem, setNewItem] = useState("");
  const [newItemEntry, setNewItemEntry] = useState("");
  const [newItemCal, setNewItemCal] = useState("");
  const [newItemPro, setNewItemPro] = useState("");
  const globalUserID = 0; // using this for now to keep track of who is signed in


  // runs on page load, eventually move load calories to a button associated with user
	useEffect(() => {
		// getItems();
	}, []);


  // loads in different users items and changes global user ID
 function changeUser(id){
    getUsers(id);
    getUserItems(id);
    globalUserID = id;
 }


  // Test Functions
  function allItems() {
    alert('All items!');
    getItems();
  }

  // get all items
  const getItems = () => {
    fetch(api_base + '/items/')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch((err) => console.error("Error: ", err));
  }

  // get user information
  const getUsers = async id => {
    await fetch(api_base + '/user/' + id)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch((err) => console.error("Error: ", err));
  }
 
  // get items from today from a specified user ID
  const getUserItems = async id => {
     await fetch(api_base + '/items/today/' + id)
    .then(res => res.json())
    .then(data => setItems(data))
    .catch((err) => console.error("Error: ", err));
  }

  
  // request for adding an item
  const addItem = async id => {
		const data = await fetch(api_base + "/item/new/" + id, {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
        userId: id,
				entry: newItemEntry,
        calories: newItemCal,
        protein: newItemPro
			})
		}).then(res => res.json());

		setItems([...items, data]);

		setPopupActive(false);
		setNewItem("");
	}

  // item deletion code
  const deleteItem = async id => {
		const data = await fetch(api_base + '/item/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setItems(items => items.filter(item => item._id !== data.result._id));
	}

  return (
    <div className="App">
      <h1>Calorie Tracker</h1>

      {/* for users daily totals */}
      <div className="todays-totals">
        {users.length > 0 ? users.map(user => (
            <div className="user" key={user._id}>
              <div className="todays-user">Welcome {user.username}!</div>
              <div className="todays-cals">Calories {user.calories}</div>
              <div className="todays-protein">Protein {user.protein}g</div>
            </div>
          )) : (
            <div className="user">
              {/* testing buttons */}
            <div>Sign In!</div>
            <div className="buttons">
              <button onClick={() => changeUser(7)}>Geordie</button>
              <button onClick={() => changeUser(6)}>Bella</button>
            </div>
            </div>
          )}
      </div>

      {/* list of added items */}
      <div className="items">
        {items.length > 0 ? items.map(item => (
            <div className={
              "item" + (item.hidden ? " is-hidden" : " is-active")
            } key={item._id}>
              <div className="checkbox"></div>
              <div className="name">{item.entry}</div>
              <div className="calories">Calories {item.calories}</div>
              <div className="protein">Protein {item.protein}g</div>
              <div className="delete-item" onClick={() => deleteItem(item._id)}>x</div>
            </div>
          )) : (
            <p>You currently have no items today</p>
          )}
      </div>


      {/* pop up button for adding items */}

      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
            <label for="entry">Item Name
              <input id= "entry" type="text" className="add-item-input" onChange={e => setNewItemEntry(e.target.value)} value={newItemEntry} />
            </label>
            <label for="cal">Calories
              <input id= "cal" type="text" className="add-item-input" onChange={e => setNewItemCal(e.target.value)} value={newItemCal} />
            </label>
            <label for="pro">Protein
              <input id= "pro" type="text" className="add-item-input" onChange={e => setNewItemPro(e.target.value)} value={newItemPro} />
            </label>
						<div className="button" onClick={() => addItem(globalUserID)}>Add Item</div>
					</div>
				</div>
			) : ''}



    </div>
  );
}

export default App;
