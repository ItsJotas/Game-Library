import { useNavigate } from "react-router-dom";
import "./ReturnButton.css";
import returnButton from "./return-button.png";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div class="return-arrow-container" onClick={() => navigate(-1)}>
      <img
        class="return-arrow"    
        src={returnButton}
        alt="Return Arrow"
      />
      <p>BACK</p>
    </div>
  );
};

export default BackButton;