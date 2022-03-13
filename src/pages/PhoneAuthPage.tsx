import { useState,useEffect } from "react";
import ToastMessage from "../components/ToastMessage";
const PhoneAuthPage = () => {
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const buttonClickHandler = () => {
    setButtonIsClicked(true);
  };
  useEffect(() => {
    if (buttonIsClicked) {
      setTimeout(() => {
        setButtonIsClicked(false);
      }, 1500);
    }
  }, [buttonIsClicked]);
  return <div>
  <button onClick={buttonClickHandler}>toast message!</button>
  {buttonIsClicked && <ToastMessage />}
</div>;
};
export default PhoneAuthPage;