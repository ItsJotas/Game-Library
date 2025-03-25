import { useNavigate } from "react-router-dom";
import "./ReturnButton.css";
import returnButton from "./return-button.png";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div class="return-arrow-container">
      <div class="return-arrow" onClick={() => navigate(-1)}>
        <img
          src={returnButton}
          alt="Return Arrow"
        />
        <p>BACK</p>
      </div>
    </div>
    
  );
};

export default BackButton;