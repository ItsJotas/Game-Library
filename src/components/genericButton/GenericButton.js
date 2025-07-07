import { useNavigate } from "react-router-dom";
import "./GenericButton.css";

const GenericButton = ( {buttonText, navigateLink} ) => {
  const navigate = useNavigate();

  return (
    <div class="generic-button" onClick={() => navigate(navigateLink)}>
        <p>{buttonText}</p>
    </div>
  );
};

export default GenericButton;