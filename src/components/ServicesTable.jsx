import React from "react";
import { cash } from "../helpers/Helpers";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function ServicesTable(
  { index, service, deleteService, onServiceEdit },
  { key, id, viewedCarID }
) {
  const { loading } = useContext(DataContext);
  return (
    <tbody>
      <tr
        onClick={() => {
          onServiceEdit(service);
        }}
        style={{
          cursor: "pointer",
          backgroundColor: index % 2 === 0 ? "#f2f2f2" : "inherit",
        }}
      >
        <td>{index + 1}.</td>
        <td>{service?.title}</td>
        <td>{service?.date}</td>
        <td className="desc">{service?.desc}</td>
        <td className="desc">{service?.category}</td>
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
      </tr>
    </tbody>
  );
}
