import React, { useEffect } from "react";
import { Config } from "../pages/A4ContentProvider";

interface Props {
  children: string;
  config?: Config;
}

const CreateA4Page: React.FC<Props> = ({ children, config }) => {
  const maxHeightPerPage: number = 297 * 3.7795275591;
  const pages: { content: string; pageNumber: number }[] = [];
  let currentContent: string = "";
  let pageNumber: number = 1;

  const measureHeight = (htmlContent: string): number => {
    const container = document.createElement("div");
    container.style.width = "210mm";
    container.style.position = "absolute";
    container.style.visibility = "hidden";
    container.innerHTML = htmlContent;
    document.body.appendChild(container);
    const height = container.offsetHeight;
    document.body.removeChild(container);
    return height;
  };

  children.split(/<\/?p[^>]*>/).forEach((paragraph) => {
    const testContent = currentContent + `<p>${paragraph}</p>`;
    if (measureHeight(testContent) <= maxHeightPerPage) {
      currentContent += `<p>${paragraph}</p>`;
    } else {
      pages.push({ content: currentContent, pageNumber });
      currentContent = `<p>${paragraph}</p>`;
      pageNumber++;
    }
  });

  if (currentContent) pages.push({ content: currentContent, pageNumber });

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #printable-content, #printable-content * {
          visibility: visible;
        }
        #printable-content {
          position: absolute;
          left: 0;
          top: 0;
        }
        #print-button {
          display: none;
        }
        .page-container {
          margin: 0 !important;
          box-shadow: none !important;
          break-after: page;
        }
        @page {
          size: A4;
          margin: 0;
          padding: 0;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section>
      <div id="printable-content">
        {pages.map((page) => (
          <div
            key={page.pageNumber}
            className="page-container"
            style={{
              border: "none",
              width: "210mm",
              height: "297mm",
              margin: "1rem auto",
              padding: "20mm",
              position: "relative",
              background: "white",
              color: "black",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              pageBreakAfter: "always",
            }}
          >
            {!config?.removeFooter && (
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "grey",
                }}
              >
                Page {page.pageNumber} of {pages.length}
              </div>
            )}

            <div dangerouslySetInnerHTML={{ __html: page.content }} />
            <>
              {config?.printable && page.pageNumber === 1 && (
                <button
                  style={{
                    cursor: "pointer",
                    border: "none",
                    position: "absolute",
                    top: "2rem",
                    right: "0",
                    transform: "translateX(-50%)",
                    backgroundColor: "transparent",
                    transition: "color 0.3s ease",
                  }}
                  id="print-button"
                  onClick={() => {
                    window.print();
                  }}
                >
                  🖨️ Print
                </button>
              )}
            </>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreateA4Page;
