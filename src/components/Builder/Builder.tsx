import Form from "../Form/Form";
import Resume from "../Resume/Resume";

export default function Builder() {
  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        height:'800px',
        margin:'20px',
        justifyContent:'space-around'
      }}
    >
      <Form />
      <Resume />
    </div>
  );
}
