import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import PleaseLogin from "../components/PleaseLogin";
import NewServiceForm from "../components/NewServiceForm";
import { NavLink, useParams } from "react-router-dom";
import { utils, writeFile } from "xlsx";
import { cash } from "../helpers/Helpers";
import { HiArrowCircleLeft } from "react-icons/hi";
import Loading from "../components/Loading";
import { MdConstruction } from "react-icons/md";
import { contentObj } from "../language";
import ServicesTable from "../components/ServicesTable";

export default function SingleCar() {
  const [editedService, setEditedService] = useState();

  const {
    filteredServices,
    isLogged,
    cars,
    deleteService,
    viewedCarID,
    setviewedCarId,
    loading,
    language,
  } = useContext(DataContext);
  const { id: carID } = useParams();

  const onServiceEdit = (service) => {
    setEditedService(service);
  };

  useEffect(() => {
    setviewedCarId(carID);
  }, [carID]);

  const [currentCar, setCurrentCar] = useState(
    cars?.find((car) => car.id === carID)
  );

  function exportToXLS() {
    const table = document.getElementById("myTable");
    const workbook = utils.table_to_book(table);
    writeFile(
      workbook,
      `${currentCar?.brand} ${currentCar?.model} - mycarservice.xls`
    );
  }

  const carData = () => {
    const currentCar = cars.find((car) => car.id === carID);

    return (
      <>
        <NavLink to="../cars" className="goback">
          <HiArrowCircleLeft className="react-icon color" />{" "}
          {contentObj?.[language].backToGarage}
        </NavLink>
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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="singlecar_container container">
        <div>{carData()}</div>
        <NewServiceForm
          editedService={editedService}
          setEditedService={setEditedService}
        />
        <h2>
          <MdConstruction className="react-icon" />
          {contentObj?.[language].services.heading}
        </h2>
        {loading ? (
          <Loading />
        ) : (
          <div className="table_container">
            <table id="myTable">
              <thead>
                <tr>
                  <th>lp</th>
                  <th>Tytuł</th>
                  <th>Data</th>
                  <th>Opis</th>
                  <th>Data dodania</th>
                  <th>Przebieg</th>
                  <th>Cena</th>
                </tr>
              </thead>
              {filteredServices &&
                filteredServices.length > 0 &&
                filteredServices.map(
                  (
                    { id, title, desc, price, date, createdAt, mileage },
                    index,
                    service
                  ) => {
                    return (
                      <ServicesTable
                        key={id}
                        index={index}
                        service={{
                          id,
                          title,
                          desc,
                          price,
                          date,
                          createdAt,
                          mileage,
                        }}
                        deleteService={deleteService}
                        onServiceEdit={onServiceEdit}
                      />
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
                  <td className="line">RAZEM</td>
                  <td className="line">
                    <b>{cash(sum)} zł</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <button style={{ marginTop: "1rem" }} onClick={() => exportToXLS()}>
          Pobierz jako plik Excel
        </button>
      </div>
    );
  }
}
