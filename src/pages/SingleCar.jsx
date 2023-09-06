import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import PleaseLogin from "../components/PleaseLogin";
import NewServiceForm from "../components/NewServiceForm";
import { NavLink, useParams } from "react-router-dom";
import { utils, writeFile } from "xlsx";
import { FaTrashAlt } from "react-icons/fa";
import { cash } from "../helpers/Helpers";
import {HiArrowCircleLeft } from 'react-icons/hi'

export default function SingleCar() {
  const {
    filteredServices,
    isLogged,
    cars,
    deleteService,
    viewedCarID,
    setviewedCarId,
  } = useContext(DataContext);
  const { id: carID } = useParams();

  useEffect(() => {
    setviewedCarId(carID);
  }, [carID]);

  const carData = () => {
    const currentCar = cars.find((car) => car.id === carID);

    return (
      <>
        <NavLink to="../cars"><HiArrowCircleLeft   /> back to garage</NavLink>
        {/* car details */}
        <div style={{ marginTop: "2rem" }}>
          <div>
            <img src={currentCar?.img} alt="" className="single-car__img" />
            <h2>
              {currentCar?.brand} {currentCar?.model}
            </h2>
          </div>
          <div>{/* info box */}</div>
        </div>
      </>
    );
  };

  const sum = filteredServices?.reduce((accumulator, currentValue) => {
    if (filteredServices && filteredServices.length > 0) {
      let result = accumulator + Number(currentValue.price);
      return result;
    }
  }, 0);

  if (isLogged) {
    return <PleaseLogin />;
  }

  function exportToXLS() {
    const table = document.getElementById("myTable");
    const workbook = utils.table_to_book(table);
    writeFile(workbook, "table.xls");
  }

  return (
    <div className="singlecar_container">
      <div>{carData()}</div>
      <NewServiceForm />
      <h2>Services:</h2>
      <table id="myTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Data</th>
            <th>Opis</th>
            <th>Data utworzenia</th>
            <th>Przebieg</th>
            <th>Cena</th>
          </tr>
        </thead>
        {filteredServices &&
          filteredServices.length > 0 &&
          filteredServices.map(
            ({ id, title, desc, price, date, createdAt, mileage }, index) => {
              return (
                <tbody key={id}>
                  <tr
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f2f2f2" : "inherit",
                    }}
                  >
                    <td>{index + 1}.</td>
                    <td>{title}</td>
                    <td>{date}</td>
                    <td className="desc">{desc}</td>
                    <td>{createdAt}</td>
                    <td>{Number(mileage).toLocaleString()}</td>
                    {/* <td>{mileage}</td> */}
                    <td>{cash(Number(price))}</td>
                    <td
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteService(id, viewedCarID)}
                    >
                      <FaTrashAlt style={{ fontSize: "1.5rem" }} />
                    </td>
                  </tr>
                </tbody>
              );
            }
          )}
        <tbody>
          <tr>
            <td className="blind_row"></td>
            <td className="blind_row"></td>
            <td className="blind_row"></td>
            <td className="blind_row"></td>
            <td className="blind_row"></td>
            <td>RAZEM</td>
            <td>
              <b>{cash(sum)} zł</b>
            </td>
          </tr>
        </tbody>
      </table>
      <button style={{ marginTop: "1rem" }} onClick={exportToXLS}>
        Pobierz jako plik Excel
      </button>
    </div>
  );
}
