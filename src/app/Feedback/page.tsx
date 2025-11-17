import ProtectedRoute from "components/ProtectedRoute/protectedRoute";
import FeedbackForm from "../../../components/FeedBacks/FeedBackForm/feedBackForm";

export default function FeedBack() {
  return (
    <ProtectedRoute allowedRoles={["BARBER", "CLIENT", "ADMIN"]}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
        <FeedbackForm />
      </div>
    </ProtectedRoute>
  );
}
