import React from "react";
import { contentObj } from "../language";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { MdConstruction } from "react-icons/md";

export default function About() {
  const { language } = useContext(DataContext);

  return (
    <div>
      <div className="start_container container">
        <MdConstruction className="start_icon" />
        <div className="start_body">
          <h2>MyCarService</h2>
          <h3>
            to aplikacja do kontrolowania wydatków i serwisów swojego auta!
            Oferuje wiele zalet, które sprawią, że zarządzanie finansami i
            konserwacją samochodu będzie łatwiejsze i bardziej przejrzyste.
          </h3>
          <ul>Główne zalety tej aplikacji to:</ul>
          <li className="list">
            Przejrzystość: aplikacja została zaprojektowana w taki sposób, aby
            zapewnić przejrzysty i intuicyjny interfejs użytkownika. Dzięki temu
            łatwo będzie poruszać się po różnych sekcjach i znaleźć potrzebne
            informacje.
          </li>
          <li className="list">
            Dostęp z poziomu strony internetowej: aplikacja jest dostępna z
            poziomu przeglądarki internetowej. Oznacza to, że możesz zalogować
            się na swoje konto i uzyskać dostęp do swoich danych z dowolnego
            urządzenia, które ma dostęp do internetu. Niezależnie od tego, czy
            używasz komputera, smartfona czy tabletu, zawsze będziesz mieć
            dostęp do swoich informacji.
          </li>
          <li className="list">
            Eksport danych do tabeli Excel: W aplikacji możesz eksportować swoje
            dane finansowe i informacje dotyczące serwisów samochodu do plików
            Excel. Dzięki temu będziesz mógł łatwo analizować i przetwarzać te
            dane w formacie, który najbardziej Ci odpowiada. Dzięki tej
            aplikacji będziesz mógł śledzić swoje wydatki związane z samochodem,
            kontrolować koszty serwisów i utrzymania, a także analizować swoje
            wydatki w bardziej rozbudowany sposób. Niezależnie od tego, czy
            jesteś właścicielem jednego samochodu czy floty pojazdów, poniższa
            aplikacja pomoże Ci utrzymać kontrolę nad finansami i serwisami
            swojego auta.
          </li>
          <span>
            Zapraszam do wypróbowania aplikacji i cieszenia się korzyściami,
            jakie ona oferuje!
          </span>
          <span>Aplikacja w trakcie testów - eksportuj dane do xls!</span>
        </div>
      </div>
    </div>
  );
}
