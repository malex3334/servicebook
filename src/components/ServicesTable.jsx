import React from "react";
import { cash } from "../helpers/Helpers";
import { FaTrashAlt } from "react-icons/fa";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

export default function ServicesTable(
  { index, service, deleteService, onServiceEdit },
  { key, id, viewedCarID }
) {
  const { editedServiceData } = useContext(DataContext);

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
      <td>{index + 1}.</td>
      <td className="title">{service?.title}</td>
      <td>{service?.date}</td>
      <td className="desc">{service?.desc}</td>
      <td className="category">{service?.category}</td>
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
      <td>
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
