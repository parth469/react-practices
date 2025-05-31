"use client";
import { FC, ButtonHTMLAttributes } from "react";

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const Button: FC<ButtonInterface> = ({ text = "Click", ...rest }) => {
  return <button {...rest}>{text}</button>;
};
