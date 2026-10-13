import { NavLink } from "react-router-dom";
import { useFEStyles, defaultStyles } from "@fraserelliott/fe-components";
import { sx, utilities } from "@fraserelliott/fe-utilities";

export const pages = [
  {
    name: "Home",
    title: "FE-Components Demo",
    to: "/",
    body: "Welcome to the demo of fe-components! This is overview of the library, a collection of reusable React components with flexible styling, sensible defaults, and straightforward customisation.",
  },
  {
    name: "Confirm Dialog",
    to: "/confirmdialog",
    body: "A confirmation dialog with configurable buttons, dismissal behaviour, and support for asynchronous actions. Includes focus management and customisable styling.",
  },
  {
    name: "Modal",
    to: "/modal",
    body: "A flexible modal for displaying custom content, with configurable overlays, close buttons, focus trapping, and dismissal options.",
  },
  {
    name: "Toast",
    to: "/toast",
    body: "A lightweight notification system supporting neutral, success, and error messages. Includes automatic dismissal, configurable positioning, and stacking behaviour.",
  },
  {
    name: "Action Table",
    to: "/actiontable",
    body: "A configurable data table with custom column rendering and row actions. Supports dynamic columns, per-action button styling, and flexible action layouts.",
  },
];

export function HomePage() {
  const { styleComponent } = useFEStyles(defaultStyles);

  const wrapWithNavLink = (heading, to) => <NavLink to={to}>{heading}</NavLink>;

  const renderSection = (section) => {
    const heading = (
      <h1 {...styleComponent("Heading")}>{section.title ?? section.name}</h1>
    );

    return (
      <div key={section.name}>
        {section.name !== "Home"
          ? wrapWithNavLink(heading, section.to)
          : heading}
        <p>{section.body}</p>
      </div>
    );
  };

  return (
    <div
      {...styleComponent(
        "Panel",
        sx(utilities["fe-gap-2"], {
          width: "clamp(300px, 75vw, 400px)",
          maxWidth: "90vw",
        }),
      )}
    >
      {pages.map((page) => renderSection(page))}
    </div>
  );
}
