import React, { useState, useEffect, ChangeEvent } from "react";
import ToastMessage from "../components/ToastMessage";
import "../scss/PhoneAuthPage.scss";
import { ReactComponent as Check } from "../svg/check.svg";
import { ReactComponent as Arrow } from "../svg/left-arrow.svg";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
const PhoneAuthPage = () => {
  const navigation = useNavigate();
  const [buttonIsClicked, setButtonIsClicked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authNumber, setAuthNumber] = useState("");
  const [isSended, setIsSended] = useState(false);
  const [timeIsValid, setTimeIsValid] = useState(true);
  const [isReSended, setIsReSended] = useState(false);
  const authIsValid = timeIsValid && authNumber.length === 6;
  const isValid = phoneNumber.length === 13;
  const isEntered = phoneNumber.length > 0;
  const buttonClickHandler = () => {
    //axios 인증번호 전송 요청
    setButtonIsClicked(true);
    setIsSended(true);
  };
  useEffect(() => {
    if (buttonIsClicked) {
      setTimeout(() => {
        setButtonIsClicked(false);
      }, 1500);
    }
  }, [buttonIsClicked]);
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (isSended) return;
    let adjustNumber = event.target.value;
    if (phoneNumber.length === 13 && event.target.value.length > 13) return;
    if (
      (phoneNumber.length === 2 && event.target.value.length === 3) ||
      (phoneNumber.length === 7 && event.target.value.length === 8)
    ) {
      adjustNumber = event.target.value + "-";
      console.log(adjustNumber);
    }
    setPhoneNumber(adjustNumber);
  };
  const clearButtonHandler = () => {
    if (isSended) return;
    setPhoneNumber("");
  };
  const authChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (phoneNumber.length === 6 && event.target.value.length > 6) return;
    setAuthNumber(event.target.value);
  };
  const authNumberResend = () => {
    setIsReSended(true);
    setTimeIsValid(true);
  };
  const resetIsResend = () => {
    setIsReSended(false);
  };
  const nextClickHandler = () => {
    navigation("/next");
  };
  const buttonContext = !isSended ? (
    <button
      className={isValid ? "login-button active" : "login-button"}
      onClick={buttonClickHandler}
    >
      인증번호 발송
    </button>
  ) : (
    <button
      className={authIsValid ? "login-button active" : "login-button"}
      onClick={nextClickHandler}
    >
      다음
    </button>
  );
  return (
    <div className="login">
      <div className="login-back" onClick={() => navigation(-1)}>
        <Arrow />
      </div>
      <header className="login-header">휴대폰 인증</header>
      <span className="login-description">
        원활한 서비스 제공을 위해 휴대폰 번호를 입력해주세요
      </span>
      <div className="login-inputbox">
        <input
          value={phoneNumber}
          onChange={inputChangeHandler}
          className="login-input"
          placeholder="휴대폰 번호"
        ></input>
        {isEntered && (
          <span
            className={
              isSended ? "login-input-clear checked" : "login-input-clear"
            }
            onClick={clearButtonHandler}
          >
            {isSended ? <Check /> : "X"}
          </span>
        )}
      </div>
      {isSended && (
        <div className="login-authnumber">
          <input
            value={authNumber}
            onChange={authChangeHandler}
            className="login-input"
            placeholder="인증번호 6자리"
          ></input>
          <span className="login-timer">
            <Timer isResend={isReSended} resendfunc={resetIsResend} />
          </span>
          <p className="login-authnumber-resend" onClick={authNumberResend}>
            인증번호 재전송
          </p>
        </div>
      )}
      {buttonContext}
      {buttonIsClicked && <ToastMessage />}
    </div>
  );
};
export default PhoneAuthPage;
