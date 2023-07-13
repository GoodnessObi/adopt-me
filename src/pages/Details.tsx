import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { adopt } from "../store/adoptedPetSlice";
import Modal from "../components/Modal";
import { useGetPetQuery } from "../store/petApiService";
// import fetchPet from "../api/fetchPet";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  if (!id) {
    throw new Error("no id provided to details");
  }

  const { isLoading, data: pet } = useGetPetQuery(id);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🐾</h2>
      </div>
    );
  }

  if (!pet) {
    throw new Error("no pet. lol!");
  }

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
                    dispatch(adopt(pet));
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

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

// export default Details;
