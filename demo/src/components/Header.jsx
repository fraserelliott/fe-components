import { NavLink } from "react-router-dom";
import { useFEStyles } from "@fraserelliott/fe-components";
import { utilities, sx } from "@fraserelliott/fe-utilities";
import { pages } from "../pages/HomePage";

const style = {
  inline: {
    Navbar: sx(
      utilities["fe-d-flex"],
      utilities["fe-flex-row"],
      utilities["fe-w-100"],
      utilities["fe-justify-center"],
      {
        listStyle: "none",
        backgroundColor: "var(--fec-bg-secondary, #ecece7)",
      },
    ),
    NavItem: sx(
      utilities["fe-d-flex"],
      utilities["fe-items-center"],
      utilities["fe-p-em-2"],
    ),
  },
  anim: {
    NavItem: "fec-btn",
  },
};

export function Header() {
  const { styleComponent } = useFEStyles(style);

  const renderPageLink = (page) => {
    const navItemStyles = styleComponent("NavItem");

    return (
      <li key={page.name}>
        <NavLink
          style={({ isActive }) =>
            sx(
              navItemStyles.style,
              isActive && { backgroundColor: "var(--fec-bg-active, #cfd8e3)" },
            )
          }
          to={page.to}
          className={navItemStyles.className}
        >
          {page.name}
        </NavLink>
      </li>
    );
  };

  return (
    <ul {...styleComponent("Navbar")}>
      {pages.map((page) => renderPageLink(page))}
    </ul>
  );
}
