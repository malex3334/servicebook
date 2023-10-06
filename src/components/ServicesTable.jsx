import React from "react";
import { cash } from "../helpers/Helpers";
import { FaTrashAlt } from "react-icons/fa";

export default function ServicesTable(
  { index, service, deleteService, onServiceEdit },
  { key, id, viewedCarID }
) {
  return (
    <tbody key={id}>
      <tr
        onClick={() => {
          onServiceEdit(service);
          console.log(service);
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
