export function filterArrayOfObjects(filteredArrayOfObjects, filterBy) {
  return filteredArrayOfObjects.filter((obiekt) =>
    filterBy.objectParameter.includes(obiekt.id)
  );
}

export function filterCars(cars, user) {
  console.log(cars, user);
  return cars.filter((obiekt) => user && user?.carsIDs?.includes(obiekt.id));
}

export function getServices(services, cars, carID) {
  const specificCar = cars.find((car) => car.id === carID);
  const filterResult = services.filter((obiekt) =>
    specificCar.services.includes(obiekt.id)
  );

  return filterResult;
}

// aktualna data
export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// cash format

export const cash = (amount) => {
  return amount?.toLocaleString("pl-pl", { minimumFractionDigits: 2 });
};

//
export const noImg =
  "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";

export const noAvatar =
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png";
