import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import PleaseLogin from "../components/PleaseLogin";
import NewServiceForm from "../components/NewServiceForm";
import { NavLink, useParams } from "react-router-dom";
import { cash, scrollToElement } from "../helpers/Helpers";
import { HiArrowCircleLeft } from "react-icons/hi";
import Loading from "../components/Loading";
import { MdConstruction } from "react-icons/md";
import { contentObj } from "../language";
import ServicesTable from "../components/ServicesTable";
import ServicesHeaders from "../components/ServicesHeaders";
import { useRef } from "react";
import { exportToXLS } from "../helpers/Helpers";
import SingleFilter from "../components/SingleFilter";

export default function SingleCar() {
  const [editedService, setEditedService] = useState();
  const [sorting, setSorting] = useState("date");
  const [count, setCount] = useState(0);
  const scrollRef = useRef(null);

  const [filters, setFilters] = useState({
    fix: true,
    aesthetics: true,
    maintenance: true,
  });

  const {
    filteredServices,
    isLogged,
    cars,
    deleteService,
    setviewedCarId,
    loading,
    language,
  } = useContext(DataContext);

  const [filteredData, setFilteredData] = useState([]);
  const { id: carID } = useParams();

  const onServiceEdit = (service) => {
    setEditedService(service);
    scrollToElement(scrollRef);
  };

  const [currentCar, setCurrentCar] = useState();

  useEffect(() => {
    setCurrentCar(cars?.find((car) => car.id === carID));
    setviewedCarId(carID);
  }, [carID]);

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

  const filterFunction = (data, filters) => {
    data.map((element) => {
      if (element.category === undefined) {
        element.category = "maintenance";
      }
    });
    return data.filter((element) => {
      if (
        (filters.aesthetics && element.category === "aesthetics") ||
        (filters.fix && element.category === "fix") ||
        (filters.maintenance && element.category === "maintenance")
      ) {
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    setFilteredData(filterFunction(filteredServices, filters));
  }, [filters, filteredServices]);

  const handleInputChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
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

  const sum = filteredData?.reduce((accumulator, currentValue) => {
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
        <div ref={scrollRef}>{carData()}</div>
        <NewServiceForm
          editedService={editedService}
          setEditedService={setEditedService}
        />
        <h2>
          <MdConstruction className="react-icon" />
          {contentObj?.[language].services.heading}
        </h2>
        <div className="filters_container">
          <SingleFilter
            key="1"
            name="fix"
            checked={filters.fix}
            onChange={handleInputChange}
          />
          <SingleFilter
            key="2"
            name="aesthetics"
            // name={contentObj?.[language].services.filters.aesthetics}
            checked={filters.aesthetics}
            onChange={handleInputChange}
          />
          <SingleFilter
            key="3"
            name="maintenance"
            checked={filters.maintenance}
            onChange={handleInputChange}
          />
        </div>
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
                </tr>
              </thead>

              <tbody className="table_content">
                {filteredData &&
                  filteredData.length > 0 &&
                  sortBy(filteredData, sorting).map(
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
              </tbody>
            </table>
          </div>
        )}
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
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
        </div>
        <button
          style={{ marginTop: "1rem" }}
          onClick={() => exportToXLS(cars?.find((car) => car.id === carID))}
        >
          Pobierz jako plik Excel
        </button>
      </div>
    );
  }
}
