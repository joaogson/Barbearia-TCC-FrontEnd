import FeedbackForm from "../../../components/FeedBacks/FeedBackForm/feedBackForm";

export default function FeedBack() {
  return (
    <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
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
  );
}
