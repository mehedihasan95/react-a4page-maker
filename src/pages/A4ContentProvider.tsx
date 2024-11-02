import React, { useEffect, useRef, useState } from "react";
import GenerateA4Page from "../components/GenerateA4Page";
import CreateA4Page from "../components/CreateA4Page";

export interface Config {
  printable?: boolean;
  removeFooter?: boolean;
}

interface Props {
  children: React.ReactNode;
  config?: Config;
}

const defaultConfig: Config = {
  printable: true,
  removeFooter: false,
};

const A4ContentProvider: React.FC<Props> = ({ children, config = {} }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  const mergedConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    const updateContent = () => {
      if (ref.current) {
        setHtmlContent(ref.current.innerHTML);
      }
    };
    updateContent();
    const observer = new MutationObserver(updateContent);
    if (ref.current) {
      observer.observe(ref.current, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <React.Fragment>
      <div style={{ display: "none" }}>
        <GenerateA4Page ref={ref} children={children} />
      </div>
      <CreateA4Page children={htmlContent} config={mergedConfig} />
    </React.Fragment>
  );
};

export default A4ContentProvider;
