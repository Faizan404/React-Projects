export default function Item({ packingListItem, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={packingListItem.packed}
        onChange={() => onToggleItem(packingListItem.id)}
      />
      <span className={packingListItem.packed ? "packed" : ""}>
        {packingListItem.quantity} {packingListItem.description}
      </span>
      <button onClick={() => onDeleteItem(packingListItem.id)}>❌</button>
    </li>
  );
}
