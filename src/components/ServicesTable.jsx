import React from "react";
import { cash } from "../helpers/Helpers";
import { FaTrashAlt } from "react-icons/fa";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { contentObj } from "../language";
export default function ServicesTable(
  { index, service, deleteService, onServiceEdit },
  { key, id, viewedCarID }
) {
  const { editedServiceData, language } = useContext(DataContext);

  const handleCheckboxChange = (e) => {
    const updatedService = { ...service, done: !service.done };
    editedServiceData(e, updatedService);
  };

  const handleCheckboxClick = (e) => {
    if (e === "checkbox") {
      return;
    } else {
      onServiceEdit(service);
    }
  };

  const borderColorDone = `#07E607`;
  const borderColorTodo = "orange";

  return (
    <tr
      onClick={(e) => {
        handleCheckboxClick(e.target.type);
        // onServiceEdit(service);
      }}
      style={{
        cursor: "pointer",
        backgroundColor: index % 2 === 0 ? "#f2f2f2" : "inherit",
      }}
    >
      <td
        style={{
          borderLeft: ".5em solid ",
          borderLeftColor: service.done ? borderColorDone : borderColorTodo,
        }}
      >
        {index + 1}.
      </td>
      <td className="title">{service?.title}</td>
      <td>{service?.date}</td>
      <td className="desc">{service?.desc}</td>
      <td className="category">
        {contentObj?.[language].services.filters[service?.category]}
      </td>
      <td>{service?.createdAt}</td>
      <td>{Number(service?.mileage).toLocaleString()}</td>
      <td>{cash(Number(service?.price))}</td>
      <td
        style={{
          color: "red",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => deleteService(service?.id, viewedCarID)}
      >
        <FaTrashAlt style={{ fontSize: "1.5rem" }} />
      </td>
      <td
        style={{
          borderRight: ".5em solid ",
          borderRightColor: service.done ? borderColorDone : borderColorTodo,
        }}
      >
        <input
          type="checkbox"
          checked={service?.done}
          onChange={(e) => {
            handleCheckboxChange(e);
          }}
        />
      </td>
    </tr>
  );
}
