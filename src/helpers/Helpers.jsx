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
  const element = ref.current.offsetTop - elementRect.height;
  // const middleY = elementRect.top + elementRect.height / 2;
  const middleY = element;

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

export function handleImgError(carImgRef, carImgBackground) {
  const noImg =
    "https://media.istockphoto.com/id/120205938/photo/new-car-presentation.jpg?s=612x612&w=0&k=20&c=d8Uy1_rREo_gSwXv2XCdpPf5wK_6UbwWQ5DBAuTYt0g=";

  carImgRef.current.src = noImg;

  if (carImgBackground) {
    carImgBackground.current.style.background = `url(${noImg})`;
  }
}

export const imgWarning = "* Link musi prowadzić bezpośrednio do zdjęcia!";
export const activationMsg =
  "Na podany adres wysłano wiadomość z potwierdzeniem rejestracji konta. Aktywuj konto i zaloguj się. ";

export function calculateDaysLeft(inputDate) {
  // Split the input date string into year, month, and day components
  const [year, month, day] = inputDate.split("-").map(Number);

  // Create Date objects for the target date and the current date
  const currentDate = new Date();
  const targetDate = new Date(year, month - 1, day); // Month is 0-based, so subtract 1

  // Calculate the time difference in milliseconds
  const timeDifference = targetDate - currentDate;

  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const daysLeft = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

  return daysLeft;
}
