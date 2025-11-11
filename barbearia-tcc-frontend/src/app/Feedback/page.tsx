import BarberFeedbackList from "../../../components/FeedBacks/BarberFeedBacksList/barberFeedBackList";
import ClientFeedbackList from "../../../components/FeedBacks/ClientFeedBackList/clientFeedBackList";
import FeedbackForm from "../../../components/FeedBacks/FeedBackForm/feedBackForm";
import { useAuth } from "../../../contexts/AuthContext";

export default function FeedBack() {
  return (
    <div>
      <h1
        style={{
          borderBottom: "3px solid #3e301b",
          width: "80%",
          textAlign: "start",
          color: "#3e301b",
          fontSize: "2rem",
          marginTop: "25px",
        }}
      >
        FeedBacks
      </h1>

      <h2
        style={{
          marginTop: "50px",
          marginLeft: "auto",
          marginRight: "auto",
          width: "80%",
          textAlign: "start",
          color: "#3e301b",
          fontSize: "2rem",
        }}
      >
        Deixe sua Avaliação
      </h2>
      <FeedbackForm />
    </div>
  );
}
