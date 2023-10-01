import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { toast } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  getFirestore,
  onSnapshot,
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
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(navigator.language.slice(0, -3));
  const [userData, setUserData] = useState();

  // firebase
  const [user] = useAuthState(auth);
  // Initialize services - database
  const db = getFirestore();
  // Collection ref

  const editUserData = (userID, newUserData, editedParam) => {
    setLoading(true);
    const userRef = collection(db, "users");
    const userDocRef = doc(userRef, userID);

    updateDoc(userDocRef, { [editedParam]: newUserData })
      .then(() => {
        console.log(
          "User został zaktualizowany",
          editedParam,
          ":",
          newUserData
        );
        toast.success("Zaktualizowano dane użytkownika ", editedParam);
      })
      .catch((error) => {
        console.log("Błąd podczas aktualizacji danych ", error);
        toast.error("Błąd podczas aktualizacji danych");
      });

    console.log(
      "hello from context: user id",
      userID,
      newUserData,
      "in data:",
      editedParam
    );

    setLoading(false);
    setRerender(!rerender);
  };

  // get user data

  useEffect(() => {
    const getData = () => {
      if (user) {
        const userDocRef = doc(db, "users", user?.uid);

        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            setUserData(userData);

            if (userData !== "undefined") {
              setUserCarIDs(userData.carsIDs);
            } else {
              console.log("no data for user");
              setUserCarIDs([]);
            }
          } else {
            console.log("No such document");
            const addUserToDataBase = async () => {
              await setDoc(doc(db, "users", user?.uid), {
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                id: user?.uid,
              });
            };
            addUserToDataBase();
          }
        });

        return () => {
          // Wyrejestrowanie subskrypcji po zakończeniu komponentu
          unsubscribe();
        };
      }

      if (user === "undefined") {
        setUserCarIDs([]);
      }
    };
    getData();
  }, [user?.uid, user?.displayName, user?.email, user?.photoURL]);

  const editCarData = (e, newData) => {
    setLoading(true);
    const carsRef = doc(db, "cars", newData.id);
    setDoc(carsRef, newData)
      .then(() => {
        console.log("zaktualizowano auto");
        toast.success("Zaktualizowano auto");
      })
      .catch((error) => {
        console.log("błąd podczas aktualizacji auta", error);
        toast.error("błąd podczas aktualizacji");
      });
    setRerender(!rerender);
    setLoading(false);
  };

  const editedServiceData = (e, newData) => {
    setLoading(true);
    const serviceRef = doc(db, "services", newData.id);
    setDoc(serviceRef, newData)
      .then(() => {
        console.log("zaktualizowano serwis");
        toast.success("Zaktualizowano serwis");
      })
      .catch((error) => {
        console.log("błąd podczas aktualizacji serwisu", error);
        toast.error("błąd podczas aktualizacji");
      });

    setServicesRerender(!servicesRerender);
    setLoading(false);
  };

  // get cars object
  // useEffect(() => {
  //   setLoading(true);

  //   if (userCarIDs && userCarIDs.length > 0) {
  //     const q = query(collection(db, "cars"), where("id", "in", userCarIDs));

  //     // Execute the query
  //     const getCarsByIds = async () => {
  //       let result = [];
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         const docData = doc.data();
  //         result.push({ ...docData, uid: doc.id });
  //       });
  //       setCars(result);
  //     };
  //     getCarsByIds();
  //     setLoading(false);
  //   }
  //   setLoading(false);
  // }, [userCarIDs, rerender]);

  useEffect(() => {
    setLoading(true);

    if (userCarIDs && userCarIDs.length > 0) {
      const carsCollectionRef = collection(db, "cars");
      const carsQuery = query(carsCollectionRef, where("id", "in", userCarIDs));

      const unsubscribe = onSnapshot(carsQuery, (querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          result.push({ ...docData, uid: doc.id });
        });
        setCars(result);
        setLoading(false);
      });

      return () => {
        // Unsubscribe when the component unmounts
        unsubscribe();
      };
    } else {
      setCars([]);
      setLoading(false);
    }
  }, [userCarIDs, rerender]);

  // dodaj auto
  function addCar(e, carObject) {
    e.preventDefault();
    // dodaj auto do bazy aut
    const addCarToCollection = async () => {
      await setDoc(doc(db, "cars", carObject.id), carObject)
        .then(() => {
          toast.success("Dodano auto");
        })
        .catch((error) => {
          toast.error("błąd podczas dodawania auta");
          console.log(error);
        });
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
                toast.success("Usunięto auto");
                setRerender(!rerender);
              })
              .catch((error) => {
                console.error("Error deleting document: ", error);
                toast.success("Błąd podczas usuwania auta");
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
        setServicesIDs(snap.data()?.services);
      } else {
        console.log("No such document");
      }
      // };
    };
    getServicesData(viewedCarId);
  }, [viewedCarId, setviewedCarId, servicesRerender]);

  // useEffect(() => {
  //   setFilteredServices([]);
  //   setLoading(true);
  //   if (servicesIDs && servicesIDs.length > 0) {
  //     let result = [];

  //     // Execute the query
  //     const getServicesByID = async () => {
  //       const q = query(
  //         collection(db, "services"),
  //         where("id", "in", servicesIDs)
  //       );
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         const docData = doc.data();
  //         // result.push({ ...docData, uid: doc.id });
  //         result.push(docData);
  //       });
  //       setFilteredServices(result);
  //       setLoading(false);
  //     };
  //     getServicesByID();
  //   } else {
  //     setFilteredServices([]);
  //     setLoading(false);
  //   }
  // }, [servicesIDs]);
  useEffect(() => {
    setFilteredServices([]);
    setLoading(true);

    let unsubscribe;

    if (servicesIDs && servicesIDs.length > 0) {
      const servicesCollectionRef = collection(db, "services");
      const q = query(servicesCollectionRef, where("id", "in", servicesIDs));

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        let result = [];

        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          result.push(docData);
        });

        setFilteredServices(result);
        setLoading(false);
      });
    } else {
      setFilteredServices([]);
      setLoading(false);
    }

    return () => {
      // Unsubscribe when the component unmounts or when `servicesIDs` changes.
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [servicesIDs]);
  // add service

  function addService(serviceObject, carId) {
    // dodaj serwis do bazy danych
    const addServiceObject = async () => {
      await setDoc(doc(db, "services", serviceObject.id), serviceObject)
        .then(() => {
          toast.success("dodano serwis");
        })
        .catch((error) => {
          toast.error("błąd podczas dodawania serwisu");
        });
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
    addServiceToCar();
    setServicesRerender(!servicesRerender);
  }
  // delete service
  function deleteService(serviceId, currentCarID) {
    // toast((t) => (
    //   <span>
    //     Are you sure?
    //     <button onClick={() => toast.dismiss(t.id)}>Yes</button>
    //     <button onClick={() => toast.dismiss(t.id)}>No</button>
    //   </span>
    // ));

    const result = window.confirm("are you sure?");

    if (result) {
      const servicesRef = collection(db, "services");
      const sercivesDocRef = doc(servicesRef, serviceId);
      deleteDoc(sercivesDocRef)
        .then(() => {
          console.log("usunięto serwis");
          toast.success("usunięto serwis");
        })
        .catch((error) => {
          console.log("błąd podczas usuwania serwisu", error);
          toast.error("błąd podczas usuwania serwisu");
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
        setUserCarIDs,
        loading,
        setCars,
        language,
        setLanguage,
        editCarData,
        editedServiceData,
        userData,
        editUserData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
