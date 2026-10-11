export function ActionList({ items, renderItem, getKey }) {
  if (!renderItem || !items || !getKey) return null;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
