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
import ServicesHeaders from "../components/ServicesHeaders";
import { FaChevronCircleRight } from "react-icons/fa";

export default function SingleCar() {
  const [editedService, setEditedService] = useState();
  const [sorting, setSorting] = useState("date");
  const [count, setCount] = useState(0);

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

  const sortBy = (data, sortedHeader) => {
    // change to numbers
    const toNumber = data.map((element) => ({
      ...element,
      price: Number(element.price),
      mileage: Number(element.mileage),
    }));

    // compare numbers
    if (sortedHeader === "price" || sortedHeader === "mileage") {
      if (count % 2) {
        const sorted = toNumber?.sort(
          (a, b) => a[sortedHeader] - b[sortedHeader]
        );
        return sorted;
      } else {
        const sorted = toNumber?.sort(
          (a, b) => b[sortedHeader] - a[sortedHeader]
        );
        return sorted;
      }
    } else {
      // compare strings
      if (count % 2) {
        const sorted = toNumber?.sort((a, b) =>
          a[sortedHeader]?.localeCompare(b[sortedHeader])
        );
        return sorted;
      } else {
        const sorted = toNumber?.sort((a, b) =>
          b[sortedHeader]?.localeCompare(a[sortedHeader])
        );
        return sorted;
      }
    }
  };

  const carData = () => {
    const currentCar = cars.find((car) => car.id === carID);

    return (
      <div>
        <NavLink to="../cars" className="goback">
          <HiArrowCircleLeft className="react-icon color" />{" "}
          {contentObj?.[language].backToGarage}
        </NavLink>
        {/* car details */}
        <div
          className="singlecar_background_container"
          style={{ marginTop: "2rem" }}
        >
          <div
            style={{
              background: `url(${currentCar?.img})`,
            }}
            className="singlecar_background"
          ></div>
          <div>
            <img
              src={currentCar?.img}
              alt=""
              className="single-car__img services"
            />
          </div>
          <div>{/* info box */}</div>
        </div>
        <h2>
          {currentCar?.brand} {currentCar?.model}
        </h2>
      </div>
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
                  <ServicesHeaders
                    header="Tytuł"
                    id="title"
                    setSorting={setSorting}
                    setCount={setCount}
                    count={count}
                  />
                  <ServicesHeaders
                    header="Data"
                    id="date"
                    setSorting={setSorting}
                    setCount={setCount}
                    count={count}
                  />
                  <ServicesHeaders
                    header="Opis"
                    id="desc"
                    setSorting={setSorting}
                    setCount={setCount}
                    count={count}
                  />
                  <ServicesHeaders
                    header="Kategoria"
                    id="category"
                    setSorting={setSorting}
                    setCount={setCount}
                    count={count}
                  />
                  <ServicesHeaders
                    header="Data dodania"
                    id="createdAt"
                    setSorting={setSorting}
                    setCount={setCount}
                    count={count}
                  />
                  <ServicesHeaders
                    header="Przebieg"
                    id="mileage"
                    setSorting={setSorting}
                    setCount={setCount}
                    count={count}
                  />
                  <ServicesHeaders
                    header="Cena"
                    id="price"
                    setSorting={setSorting}
                    setCount={setCount}
                    count={count}
                  />

                  {/* <th
                    id="title"
                    onClick={(e) => {
                      setSorting(e.target.id);
                      setCount((prev) => prev + 1);
                    }}
                  >
                    Tytuł
                  </th>

                  <th id="date" onClick={(e) => setSorting(e.target.id)}>
                    Data
                  </th>
                  <th id="desc" onClick={(e) => setSorting(e.target.id)}>
                    Opis
                  </th>
                  <th id="category" onClick={(e) => setSorting(e.target.id)}>
                    Kategoria
                  </th>
                  <th id="createdAt" onClick={(e) => setSorting(e.target.id)}>
                    Data dodania
                  </th>
                  <th id="mileage" onClick={(e) => setSorting(e.target.id)}>
                    Przebieg
                  </th>
                  <th id="price" onClick={(e) => setSorting(e.target.id)}>
                    Cena
                  </th> */}
                </tr>
              </thead>
              {filteredServices &&
                filteredServices.length > 0 &&
                sortBy(filteredServices, sorting).map(
                  (
                    {
                      id,
                      title,
                      desc,
                      price,
                      date,
                      createdAt,
                      mileage,
                      category,
                    },
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
                          category,
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
