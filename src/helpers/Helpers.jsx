import { utils, writeFile } from "xlsx";

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
  return amount?.toLocaleString("pl-pl", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
};

//
export const noImg =
  "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";

export const noAvatar =
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png";

export function scrollToElement(ref) {
  const elementRect = ref.current.getBoundingClientRect();
  const middleY = elementRect.top + elementRect.height / 2;
  console.log(middleY);
  window.scrollTo({
    top: middleY,
    behavior: "smooth",
  });
}

export function exportToXLS(data) {
  const table = document.getElementById("myTable");
  const workbook = utils.table_to_book(table);
  writeFile(workbook, `${data?.brand} ${data?.model} - mycarservice.xls`);
}

export function exportToPDF() {
  const element = document.getElementById("contentToExport"); // Replace with the ID of the content you want to export
  const pdfOptions = {
    margin: 10,
    filename: "exported-document.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
}
