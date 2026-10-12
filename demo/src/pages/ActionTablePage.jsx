import { ActionTable, ActionList } from "@fraserelliott/fe-components";
import { useState } from "react";

const initialPeople = [
  {
    id: 1,
    firstName: "Alice",
    surname: "Morgan",
    dob: "1994-06-12",
    email: "alice.morgan@example.com",
    addressLine1: "12 Willow Road",
  },
  {
    id: 2,
    firstName: "James",
    surname: "Patel",
    dob: "1987-11-23",
    email: "james.patel@example.com",
    addressLine1: "45 Oak Avenue",
  },
  {
    id: 3,
    firstName: "Sophie",
    surname: "Bennett",
    dob: "2001-03-08",
    email: "sophie.bennett@example.com",
    addressLine1: "7 Meadow Close",
  },
  {
    id: 4,
    firstName: "Daniel",
    surname: "Hughes",
    dob: "1978-09-17",
    email: "daniel.hughes@example.com",
    addressLine1: "83 Station Road",
  },
  {
    id: 5,
    firstName: "Priya",
    surname: "Shah",
    dob: "1999-12-04",
    email: "priya.shah@example.com",
    addressLine1: "21 Cedar Drive",
  },
  {
    id: 6,
    firstName: "Oliver",
    surname: "Clarke",
    dob: "1965-05-29",
    email: "oliver.clarke@example.com",
    addressLine1: "16 Church Lane",
  },
  {
    id: 7,
    firstName: "Amelia",
    surname: "Foster",
    dob: "1992-08-15",
    email: "amelia.foster@example.com",
    addressLine1: "34 Brook Street",
  },
  {
    id: 8,
    firstName: "Mohammed",
    surname: "Khan",
    dob: "1983-02-26",
    email: "mohammed.khan@example.com",
    addressLine1: "59 Highfield Road",
  },
  {
    id: 9,
    firstName: "Charlotte",
    surname: "Evans",
    dob: "2004-10-31",
    email: "charlotte.evans@example.com",
    addressLine1: "8 Rosewood Gardens",
  },
  {
    id: 10,
    firstName: "Thomas",
    surname: "Reed",
    dob: "1971-07-09",
    email: "thomas.reed@example.com",
    addressLine1: "102 Park Crescent",
  },
];

const columns = [
  { field: "id", label: "Id" },
  { field: "firstName", label: "First name" },
  { field: "surname", label: "Surname" },
  { field: "dob", label: "Date of birth" },
  { field: "email", label: "Email" },
  { field: "addressLine1", label: "Address line 1" },
  {
    field: "age",
    label: "Age",
    renderItem: calculateAge,
  },
];

function calculateAge(person) {
  const [year, month, day] = person.dob.split("-").map(Number);
  const today = new Date();

  let age = today.getFullYear() - year;

  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age--;
  }

  return age;
}

export function ActionTablePage() {
  const [people, setPeople] = useState(initialPeople);
  const [columnsIncluded, setColumnsIncluded] = useState(
    columns.map((c) => ({ field: c.field, include: true })),
  );

  const resetPeople = () => {
    setPeople(initialPeople);
  };

  const deletePerson = (person) => {
    setPeople((prev) => prev.filter((p) => p.id !== person.id));
  };

  const actions = [
    {
      key: 0,
      label: "Delete",
      buttonStyleSlot: "BtnDanger",
      onAction: deletePerson,
    },
  ];

  const isColumnIncluded = (column) =>
    columnsIncluded.some((c) => c.field === column.field && c.include);

  const renderColumnCheckbox = (column) => (
    <div>
      <label htmlFor={column.field}>{column.label}</label>
      <input
        id={column.field}
        type="checkbox"
        checked={isColumnIncluded(column)}
        onChange={(e) => {
          const checked = e.target.checked;

          setColumnsIncluded((prev) =>
            prev.map((c) =>
              c.field === column.field ? { ...c, include: checked } : c,
            ),
          );
        }}
      />
    </div>
  );

  return (
    <>
      <div>
        <ActionList
          items={columns}
          getKey={(column) => column.field}
          renderItem={renderColumnCheckbox}
        />
        <button onClick={() => resetPeople()}>Reset People</button>
      </div>

      <div>
        <ActionTable
          getKey={(person) => person.id}
          columns={columns.filter(isColumnIncluded)}
          items={people}
          actions={actions}
          separateActionColumns
        />
      </div>
    </>
  );
}
