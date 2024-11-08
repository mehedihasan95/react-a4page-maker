import React, { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
}

const GenerateA4Page = forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    return <div ref={ref}>{children}</div>;
  }
);

export default GenerateA4Page;
