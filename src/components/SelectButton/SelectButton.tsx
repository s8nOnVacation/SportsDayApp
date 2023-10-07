import React from "react";
import "./SelectButton.css";

interface SelectButtonProps {
  disabled?: boolean;
  btnType: "select" | "remove" | "submit";
  btnClass?: string;
  prefix?: React.ReactElement | string;
  prefixClass?: string;
  suffixClass?: string;
  suffix?: React.ReactElement | string;
  onBtnClick: () => void;
  testid?: string;
}

export default function SelectButton(props: SelectButtonProps) {
  const {
    disabled = false,
    btnType = "select",
    btnClass,
    prefix,
    prefixClass,
    suffix,
    suffixClass,
    onBtnClick,
    testid = "SelectButton"
  } = props;
  return (
    <button
      disabled={disabled}
      className={`ActionBtn Btn_${btnType} ${btnClass}`}
      onClick={onBtnClick}
      data-testid={testid}
    >
      {prefix && (
        <span className={prefixClass} data-testid={testid + "_prefix"}>
          {prefix}
        </span>
      )}
      {btnType.toUpperCase()}
      {suffix && (
        <span className={suffixClass} data-testid={testid + "_suffix"}>
          {suffix}
        </span>
      )}
    </button>
  );
}
