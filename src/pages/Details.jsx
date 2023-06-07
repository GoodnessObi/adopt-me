import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../api/fetchPet";
import Carousel from "../components/Carousel";
import AdoptedPetContext from "../context/AdoptedPet";
import ErrorBoundary from "../components/ErrorBoundary";
import Modal from "../components/Modal";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐾</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="my-0 mx-auto w-11/12">
      <Carousel images={pet.images} />;
      <div>
        <div className="text-center">
          <h1 className="text-5xl font-bold">{pet.name}</h1>
          <h2 className="text-4xl font-semibold">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
          <button
            onClick={() => setShowModal(true)}
            className="my-5 rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50"
          >
            Adopt {pet.name}
          </button>
        </div>

        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

// export default Details;
