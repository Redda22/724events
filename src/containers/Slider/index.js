import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

function Slider() {
  const { data } = useData();
  const [index, setIndex] = useState(0); // Variable d'état de l'index des slides.

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // fonction pour passer à la slide suivante.
  const nextCard = () => {
    setIndex((nextIndex) => // Appel de modification avec setIndex et nextIndex en parametre.
      nextIndex < byDateDesc.length - 1 ? nextIndex + 1 : 0 // nextIndex s'incrémente tant qu'elle n'est pas supérieur à la quantité de slides.
    );
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000); // Éxecution de nextCard à des intervals fixe.
    return () => clearInterval(interval); // Appel de l'éxecution et fermeture de l'interval juste après.
  }, [index, byDateDesc]
  );

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((radio, radioIdx) => (
                <input
                  key={radio.title}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // index et non idx
                  readOnly // empeche la modification de contenu
                />
              ))}
            </div>
          </div>
        </div>


      ))}
    </div>
  );
};

export default Slider;
