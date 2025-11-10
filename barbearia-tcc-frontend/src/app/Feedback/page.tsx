import BarberFeedbackList from "../../../components/FeedBacks/FeedBackForm/BarberFeedBacksList/barberFeedBackList";
import ClientFeedbackList from "../../../components/FeedBacks/FeedBackForm/ClientFeedBackList/clientFeedBackList";
import FeedbackForm from "../../../components/FeedBacks/FeedBackForm/feedBackForm";
import { useAuth } from "../../../contexts/AuthContext";

export default function FeedBack() {
  return (
    <div>
      <FeedbackForm barberId={1} clientId={1} />

      <BarberFeedbackList barberId={1} />

      <ClientFeedbackList />
    </div>
  );
}
