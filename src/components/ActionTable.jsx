import { useFEStyles } from "../styling/FEStyle";
import { defaultStyles } from "../styling/defaultStyle";

/**
 * Renders a configurable table of items with optional action buttons.
 *
 * Columns can display an item's field directly or use a custom renderer.
 * Actions can share a single column or each occupy a separate column.
 *
 * @param {Object} props
 * @param {Object[]} props.items - Items to display as table rows.
 * @param {(item: Object) => string | number} props.getKey - Returns a unique, stable key for each row.
 * @param {Object[]} props.columns - Column definitions.
 * @param {string | number} [props.columns[].key] - Optional unique column key; defaults to `field`.
 * @param {string} props.columns[].field - Property of the item to display.
 * @param {string} props.columns[].label - Column heading.
 * @param {(item: Object) => React.ReactNode} [props.columns[].renderItem] - Custom cell renderer, overriding the field value.
 * @param {Object[]} [props.actions=[]] - Action button definitions.
 * @param {string | number} props.actions[].key - Unique, stable key for the action.
 * @param {string} props.actions[].label - Button label.
 * @param {(item: Object) => void} [props.actions[].onAction] - Callback invoked when the button is clicked.
 * @param {string} [props.actions[].buttonStyleSlot="BtnPrimary"] - Styling slot used for the action button.
 * @param {Object} [props.style={}] - Inline style overrides, keyed by component styling slot.
 * @param {Object} [props.className={}] - Additional CSS classes, keyed by component styling slot.
 * @param {boolean} [props.separateActionColumns=false] - Whether each action has its own column instead of sharing one.
 * @param {boolean} [props.showHeadersWhenEmpty=false] - Whether to render the table headings when `items` is empty.
 * @returns {React.ReactElement | null}
 */
export function ActionTable({
  items,
  getKey,
  columns,
  actions = [],
  style,
  className,
  separateActionColumns,
  showHeadersWhenEmpty,
}) {
  const { styleComponent } = useFEStyles(defaultStyles, style, className);

  const renderActionButton = (action, item) => (
    <button
      {...styleComponent(action.buttonStyleSlot ?? "BtnPrimary")}
      key={action.key}
      onClick={() => action.onAction?.(item)}
    >
      {action.label}
    </button>
  );

  if (!items || (items.length === 0 && !showHeadersWhenEmpty)) return null;

  return (
    <table {...styleComponent("Table")}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              {...styleComponent("TableCell")}
              key={column.key ?? column.field}
            >
              <span {...styleComponent("Heading")}>{column.label}</span>
            </th>
          ))}
          {actions.length > 0 &&
            separateActionColumns &&
            actions.map((action) => (
              <th {...styleComponent("TableCell")} key={action.key}>
                <span {...styleComponent("Heading")}>{action.label}</span>
              </th>
            ))}
          {actions.length > 0 && !separateActionColumns && (
            <th {...styleComponent("TableCell")}>Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={getKey(item)}>
            {columns.map((column) => (
              <td
                {...styleComponent("TableCell")}
                key={column.key ?? column.field}
              >
                {column.renderItem
                  ? column.renderItem(item)
                  : item[column.field]}
              </td>
            ))}
            {actions.length > 0 &&
              separateActionColumns &&
              actions.map((action) => (
                <td {...styleComponent("TableCell")} key={action.key}>
                  {renderActionButton(action, item)}
                </td>
              ))}
            {actions.length > 0 && !separateActionColumns && (
              <td {...styleComponent("TableCell")}>
                {actions.map((action) => renderActionButton(action, item))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
