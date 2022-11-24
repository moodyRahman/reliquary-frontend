import { FC, ReactNode } from "react";

const Error: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default Error;
