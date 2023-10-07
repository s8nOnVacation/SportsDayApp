import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SelectButton from "../components/SelectButton";

const btnType = "select";

const props = {
  testId: "SelectButton",
  btnType: btnType
};

const getComponent = (extraProps = {}) => {
  const defaultProps = { ...props, ...extraProps };

  return <SelectButton {...defaultProps}>Button</SelectButton>;
};

describe("Button component", () => {
  test("should render without exploding", () => {
    render(getComponent());
    const button = screen.getByTestId(props.testId);

    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("SELECT");
  });

  test("should have default classname type", () => {
    const { container } = render(getComponent());

    expect(container.getElementsByClassName("Btn_" + btnType).length).toBe(1);
  });

  test("should have prefix & suffix", () => {
    const extraProps = {
      prefix: "==",
      prefixClass: "prefix",
      suffix: "--"
    };
    render(getComponent(extraProps));
    const button = screen.getByTestId(props.testId);
    expect(button.firstChild).toHaveTextContent("==");
    expect(button.lastChild).toHaveTextContent("--");
    expect(button.getElementsByClassName("prefix").length).toBe(1);
  });

  test("should call onBtnClick", () => {
    const mockOnClick = jest.fn();

    render(getComponent({ onBtnClick: mockOnClick }));

    const button = screen.getByTestId(props.testId);

    fireEvent.click(button);
    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});
