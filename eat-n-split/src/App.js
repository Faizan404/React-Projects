import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriendForm() {
    setAddFriend((status) => !status);
  }

  function handleSetFriendList(friend) {
    setFriendList((friends) => [...friends, friend]);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(friend);
  }

  function handleUpdateBalance(balance) {
    setFriendList((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id ? { ...friend, balance } : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendList={friendList}
          onSelectFriend={handleSelectFriend}
        />
        {addFriend && (
          <FormAddFriend
            onSetFriendList={handleSetFriendList}
            onSetFriendsStatus={() => setAddFriend((status) => !status)}
          />
        )}
        <Button onClick={handleAddFriendForm}>
          {addFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onUpdateFriend={friendList}
        />
      )}
    </div>
  );
}

function FriendsList({ friendList, onSelectFriend }) {
  return (
    <ul>
      {friendList.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}

function Friends({ friend, onSelectFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name}'s {Math.abs(friend.balance)} Rs
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)} Rs
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelectFriend(friend)}>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onSetFriendList, onSetFriendsStatus }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    const newFriend = { name, id: Date.now(), balance: 0 };
    newFriend["image"] = `${image}?u=${newFriend.id}`;

    onSetFriendList(newFriend);
    onSetFriendsStatus();
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend's name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(() => e.target.value)}
      />
      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(() => e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onUpdateFriend }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const friendsExpense = bill ? bill - myExpense : "";
  const [payer, setPayer] = useState("user");

  function handleSplitBill() {
    if (payer === "user") onUpdateFriend(Number(friendsExpense));
    if (payer === "friend") onUpdateFriend(-Number(friendsExpense));
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(() => e.target.value)}
      />
      <label>👱Your expense</label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          Number(myExpense) < Number(bill)
            ? setMyExpense(() => e.target.value)
            : myExpense
        }
      />
      <label>🧑‍🤝‍🧑{selectedFriend.name}'s expense</label>
      <input type="text" value={friendsExpense} disabled />
      <label>🤑Who is paying the bill?</label>
      <select value={payer} onChange={(e) => setPayer(() => e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button onClick={handleSplitBill}>
        Split Bill
      </Button>
    </form>
  );
}
