import { NavLink } from "react-router-dom";
import { UI } from "@styles/styles";

const pages = [
  { name: "Home", to: "/" },
  { name: "Toast", to: "/toast" },
  { name: "Confirm Dialog", to: "/confirmdialog" },
];

export function Header() {
  const renderPageLink = (page) => {
    return (
      <li key={page.name} className={UI.NavItem()}>
        <NavLink to={page.to}>{page.name}</NavLink>
      </li>
    );
  };

  return (
    <ul className={UI.Navbar()}>{pages.map((page) => renderPageLink(page))}</ul>
  );
}
