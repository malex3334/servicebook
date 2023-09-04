import { createContext, useContext, useEffect, useState } from "react";
import { dummyCarsData, dummyServicesdata, dummyUser } from "../data/dummyCars";
import { filterCars, getServices } from "../helpers/Helpers";
import { auth, fetchUsers } from "../utils/firebase";
import {
  useAuthState,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  // const [user, setUser] = useState(dummyUser);
  const [filteredServices, setFilteredServices] = useState([]);
  const [cars, setCars] = useState([]);
  const [dummyServices, setDummyServices] = useState(dummyServicesdata);
  const [dummyCars, setDummyCars] = useState(dummyCarsData);

  // firebase
  const [user, loading] = useAuthState(auth);
  const [userList, setUserList] = useState([]);

  // end of firebase

  // funkcja logowania
  // function logIn(userData) {
  //   setUser(userData);
  //   setIsLogged(!isLogged);
  // }

  // dodaj auto
  function addCar(e, carObject) {
    e.preventDefault();
    console.log(carObject);
    setCars((prev) => [...prev, carObject]);
    setDummyCars((prev) => [...prev, carObject]);
    console.log("carobjectid", carObject.id);

    // setUser((prevState) => ({
    //   ...prevState,
    //   carsIDs: [...prevState.carsIDs, carObject.id],
    // }));
  }
  // usuń auto
  function deleteCar(id) {
    const result = window.confirm("Are you sure?");
    if (result) {
      const updatedCars = cars.filter((item) => item.id !== id);
      setCars(updatedCars);
      const updatedDummyCars = dummyCars.filter((item) => item.id !== id);
      setDummyCars(updatedDummyCars);
    } else return;
  }
  function showServices(id) {
    setFilteredServices(getServices(dummyServices, cars, id));
  }

  // dodaj serwis
  function addService(serviceObject, carID) {
    setFilteredServices((prev) => [...prev, serviceObject]);
    dummyServices.push(serviceObject);

    setCars((prevCars) =>
      prevCars.map((car) =>
        car.id === carID
          ? { ...car, services: [...car.services, serviceObject.id] }
          : car
      )
    );
    dummyCars.map((car) => {
      if (car.id === carID) {
        car.services.push(serviceObject.id);
      } else return car;
    });
  }

  //  usuń serwis
  function deleteService(id) {
    const result = window.confirm("Are you sure?");
    if (result) {
      const updatedItems = filteredServices.filter((item) => item.id !== id);
      setFilteredServices(updatedItems);
      const dummyServicesUpdate = dummyServices.filter(
        (item) => item.id !== id
      );
      setDummyServices(dummyServicesUpdate);
    } else return;
  }

  useEffect(() => {
    if (user) {
      setCars(filterCars(dummyCars, user));
    } else setCars([]);
  }, [dummyCars]);

  return (
    <DataContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        // logIn,
        cars,
        showServices,
        filteredServices,
        addService,
        deleteService,
        deleteCar,
        addCar,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
