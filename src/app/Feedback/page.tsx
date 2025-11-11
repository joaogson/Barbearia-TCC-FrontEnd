import BarberFeedbackList from "../../../components/FeedBacks/BarberFeedBacksList/barberFeedBackList";
import ClientFeedbackList from "../../../components/FeedBacks/ClientFeedBackList/clientFeedBackList";
import FeedbackForm from "../../../components/FeedBacks/FeedBackForm/feedBackForm";


export default function FeedBack() {
  return (
    <div>
        <h1 style={{
          borderBottom: "3px solid #3e301b",
          width: "80%",
          textAlign: "start",
          color: "#3e301b",
          fontSize: "2rem",
          marginTop: "25px",
        }}>FeedBacks</h1>
      <FeedbackForm barberId={1} clientId={1} />

      <BarberFeedbackList barberId={1} />

      <ClientFeedbackList />
    </div>
  );
}
