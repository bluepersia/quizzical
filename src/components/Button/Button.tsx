import type { JSX, MouseEvent, PropsWithChildren } from "react";
import styles from "./Button.module.css";

type ButtonProps = PropsWithChildren & {
  style?: { [key: string]: string };
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};
export default function Button({
  children,
  onClick,
  style = {},
}: ButtonProps): JSX.Element {
  return (
    <button className={styles.button} style={style} onClick={onClick}>
      {children}
    </button>
  );
}
