/**
 * Renders a list of items using a consumer-provided render function.
 *
 * @param {Object} props
 * @param {any[]} props.items - Items to display.
 * @param {(item: any) => React.ReactNode} props.renderItem - Renders the content of each list item.
 * @param {(item: any) => React.Key} props.getKey - Returns a unique key for each item.
 * @returns {React.JSX.Element}
 */
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
