import Button from "antd/es/button";
import { useNavigate } from "react-router";

const CancelAddGemstoneButton = () => {
  const navigate = useNavigate();
  return (
    <Button size="large" onClick={() => navigate("/gemstones")} style={{ width: "84px" }}>
      Cancel
    </Button>
  );
};

export default CancelAddGemstoneButton;
