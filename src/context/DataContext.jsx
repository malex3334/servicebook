import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  collection,
  getDoc,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [rerender, setRerender] = useState(false);
  const [servicesRerender, setServicesRerender] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);
  const [cars, setCars] = useState([]);
  const [viewedCarId, setviewedCarId] = useState();
  const [userCarIDs, setUserCarIDs] = useState([]);
  const [servicesIDs, setServicesIDs] = useState([]);

  // firebase
  const [user, loading] = useAuthState(auth);
  // Initialize services - database
  const db = getFirestore();
  // Collection ref

  // get user data
  useEffect(() => {
    const getData = async () => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user?.uid));

        if (snap.exists()) {
          setUserCarIDs(snap.data().carsIDs);
        } else {
          console.log("No such document");
        }
      }
    };
    getData();
  }, [user?.uid, rerender]);

  // get cars object
  useEffect(() => {
    if (userCarIDs && userCarIDs.length > 0) {
      const q = query(collection(db, "cars"), where("id", "in", userCarIDs));

      // Execute the query
      const getCarsByIds = async () => {
        let result = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          result.push({ ...docData, uid: doc.id });
        });
        setCars(result);
      };
      getCarsByIds();
    }
  }, [userCarIDs]);

  // dodaj auto
  function addCar(e, carObject) {
    e.preventDefault();
    // dodaj auto do bazy aut
    const addCarToCollection = async () => {
      await setDoc(doc(db, "cars", carObject.id), carObject);
    };
    addCarToCollection();

    // przypisz auto do usera
    const addCarToUser = () => {
      const usersRef = collection(db, "users");
      const userDocRef = doc(usersRef, user?.uid);

      updateDoc(userDocRef, {
        carsIDs: arrayUnion(carObject.id),
      })
        .then(() => {
          console.log("Dodano ID do tablicy cars");
        })
        .catch((error) => {
          console.error("Błąd podczas dodawania ID do tablicy cars:", error);
        });
    };
    addCarToUser();
    setRerender(!rerender);
  }
  // usuń auto
  function deleteCar(id, services) {
    const result = window.confirm("Are you sure?");
    if (result) {
      const collectionRef = collection(db, "cars");

      // Znajdź dokumenty, które mają określone pole "id"
      const q = query(collectionRef, where("id", "==", id));
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // Usuń znaleziony dokument
            deleteDoc(doc.ref)
              .then(() => {
                console.log("Document deleted successfully");
                setRerender(!rerender);
              })
              .catch((error) => {
                console.error("Error deleting document: ", error);
              });
          });
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });

      // usuń wpis w userze
      const deleteCarToUser = () => {
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, user?.uid);
        const newData = userCarIDs.filter((item) => item !== id);
        // Znajdź użytkownika o ID '666'
        updateDoc(userDocRef, {
          carsIDs: newData,
        })
          .then(() => {
            console.log("usunięto ID z tablicy services");
          })
          .catch((error) => {
            console.error(
              "Błąd podczas dodawania ID do tablicy services:",
              error
            );
          });
      };
      deleteCarToUser();

      // usuń powiązane serwisy

      const deleteLinkedServices = () => {
        const q = query(
          collection(db, "services"),
          where("id", "in", services)
        );

        getDocs(q)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              deleteDoc(doc.ref)
                .then(() => {
                  console.log("Document services deleted successfully");
                  setRerender(!rerender);
                })
                .catch((error) => {
                  console.error("Error deleting document: ", error);
                });
            });
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      };
      deleteLinkedServices();
    } else return;
  }

  // get and set services
  useEffect(() => {
    const getServicesData = async (carId) => {
      // get services ids
      const snap = await getDoc(doc(db, "cars", carId));

      if (snap.exists()) {
        setServicesIDs(snap.data().services);
      } else {
        console.log("No such document");
      }
      // };
    };
    getServicesData(viewedCarId);
  }, [viewedCarId, setviewedCarId, servicesRerender]);

  useEffect(() => {
    if (servicesIDs && servicesIDs.length > 0) {
      let result = [];

      // Execute the query
      const getServicesByID = async () => {
        const q = query(
          collection(db, "services"),
          where("id", "in", servicesIDs)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          // result.push({ ...docData, uid: doc.id });
          result.push(docData);
        });
        setFilteredServices(result);
      };
      getServicesByID();
    } else setFilteredServices([]);
  }, [servicesIDs]);
  // add service

  function addService(serviceObject, carId) {
    // dodaj serwis do bazy danych
    const addServiceObject = async () => {
      await setDoc(doc(db, "services", serviceObject.id), serviceObject);
    };
    addServiceObject();

    setRerender(!rerender);
    // add service to the car
    const addServiceToCar = () => {
      const usersRef = collection(db, "cars");
      const userDocRef = doc(usersRef, carId);

      updateDoc(userDocRef, {
        services: arrayUnion(serviceObject.id),
      })
        .then(() => {
          console.log("Dodano ID do tablicy cars");
        })
        .catch((error) => {
          console.error("Błąd podczas dodawania ID do tablicy cars:", error);
        });
    };
    setServicesRerender(!servicesRerender);
    addServiceToCar();
  }
  // delete service
  function deleteService(serviceId, currentCarID) {
    const result = window.confirm("are you sure?");

    if (result) {
      const servicesRef = collection(db, "services");
      const sercivesDocRef = doc(servicesRef, serviceId);
      deleteDoc(sercivesDocRef)
        .then(() => {
          console.log("usunięto serwis");
        })
        .catch((error) => {
          console.log("błąd podczas usuwania serwisu", error);
        });
      // setRerender(!rerender);

      const deleteLinkedServicesInCarObject = async () => {
        const carsCollectionRef = collection(db, "cars");
        const carDocRef = doc(carsCollectionRef, viewedCarId);

        // Pobierz aktualną wartość tablicy services
        const docSnapshot = await getDoc(carDocRef);
        const carData = docSnapshot.data();
        const servicesArray = carData.services;

        // Usuń wpis z tablicy services
        const updatedServicesArray = servicesArray.filter(
          (service) => service !== serviceId
        );

        // Zaktualizuj tablicę services w dokumencie
        updateDoc(carDocRef, {
          services: updatedServicesArray,
        })
          .then(() => {
            console.log("Wpis został usunięty z tablicy services.");
          })
          .catch((error) => {
            console.error(
              "Błąd podczas usuwania wpisu z tablicy services:",
              error
            );
          });
      };
      setServicesRerender(!servicesRerender);
      deleteLinkedServicesInCarObject();
    } else return;
  }

  return (
    <DataContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        cars,
        filteredServices,
        deleteCar,
        addCar,
        addService,
        setviewedCarId,
        deleteService,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
