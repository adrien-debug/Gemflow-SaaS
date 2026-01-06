import Button from "antd/es/button";
import { useNavigate } from "react-router";

const CancelCreateCastingCylinderButton = () => {
  const navigate = useNavigate();

  return (
    <Button size="large" onClick={() => navigate("/casting")} style={{ width: "84px" }}>
      Cancel
    </Button>
  );
};

export default CancelCreateCastingCylinderButton;
