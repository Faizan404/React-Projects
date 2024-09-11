export default function Stat({ items }) {
  const totalItems = items.length;
  if (totalItems === 0)
    return (
      <p className="stats" s>
        <em>Start adding some items in your packing list 🧳</em>
      </p>
    );

  const packedItems = items.filter((item) => item.packed).length;
  const percentage = (packedItems / totalItems) * 100;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You got everyting! Ready to go✈️`
          : `You have ${totalItems} items on your list, and you already packed
          ${packedItems} (${percentage ? Math.round(percentage) : 0}%)`}
      </em>
    </footer>
  );
}
