import React, { useState, useEffect } from "react";
import { mergePdf } from "../services/MergerService";
import "../styles/index.scss";

// markup
const IndexPage = () => {
  const [fileList, setFileList] = useState([]);
  const [dropHover, setDropHover] = useState(false);

  useEffect(() => {
    const dropArea = document.getElementById("drop-area");
    const inputElement = document.getElementById("file-input");

    ["dragleave", "dragend"].forEach((type) => {
      dropArea.addEventListener(type, (e) => {
        setDropHover(false);
      });
    });

    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      setDropHover(true);
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      if (e.dataTransfer.files) {
        inputElement.files = e.dataTransfer.files;
        setFileList([...fileList, ...inputElement.files]);
      }
      setDropHover(false);
    });
  });

  const renderThumbnailList = () => {
    return !dropHover && fileList.length > 0 ? (
      <div className="drop-area-thumbnail">
        {fileList.map((file, index) => {
          const fileUrl = URL.createObjectURL(file);
          return (
            <div key={index} className="drop-area-pdf-preview">
              <iframe
                title={file.name}
                src={fileUrl}
                width="100%"
                height="100%"
              ></iframe>
              <p>{file.name ? file.name : null}</p>
            </div>
          );
        })}
      </div>
    ) : null;
  };

  const clearFiles = () => {
    setFileList([]);
  };

  const mergeFiles = () => {
    return mergePdf(fileList)
      .then((res) => {
        if (res.status === 200 && res.data) {
          const link = document.createElement("a");
          link.download = "mergedPdf.pdf";
          const blob = new Blob([res.data], { type: "application/pdf" });
          link.href = window.URL.createObjectURL(blob);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const dropAreaClass = dropHover ? "drop-area drop-area-hover" : "drop-area";

  return (
    <main className="body-wrapper">
      <div className="header-wrapper">
        <h1>
          Merge Your PDFs
          <span aria-label="document emoji" role="img">
            📄
          </span>
        </h1>
      </div>
      <div className="file-input-wrapper">
        <input type="file" accept=".pdf" multiple id="file-input"></input>
      </div>
      <div id="drop-area" className={dropAreaClass}>
        {renderThumbnailList()}
        <div className="drop-area-text">
          {!dropHover && fileList.length === 0 && (
            <p>Drag and drop your PDFs here!</p>
          )}
        </div>
      </div>
      <div className="button-row">
        <button
          onClick={clearFiles}
          disabled={fileList.length === 0}
          className="button-row-button"
        >
          CLEAR
        </button>
        <button
          onClick={mergeFiles}
          disabled={fileList.length === 0}
          className="button-row-button"
        >
          MERGE
        </button>
      </div>
    </main>
  );
};

export default IndexPage;
