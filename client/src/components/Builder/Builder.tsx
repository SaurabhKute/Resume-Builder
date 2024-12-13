import { useSelector } from "react-redux";
import Form from "../Form/Form";
import Template1 from "../Templates/Template1/Template1";
import Template2 from "../Templates/Template2/Template2";
import { RootState } from "../../app/store";
import { useEffect } from "react";

export default function Builder() {
  const resume = useSelector((state: RootState) => state.resume || {});

  useEffect(() => {
    console.log(resume.resumeResponse.templateId, "Template ID");
  }, [resume]);

  // Function to render the appropriate template
  const renderTemplate = () => {
    const templateId = Number(resume.resumeResponse?.templateId);
    switch (templateId) {
      case 1:
        return <Template1 />;
      case 2:
        return <Template2 />;
      default:
        return <div>Please select a valid template.</div>; // Default or fallback UI
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        height: "800px",
        margin: "20px",
        justifyContent: "space-around",
      }}
    >
      <Form />
      {renderTemplate()}
    </div>
  );
}
