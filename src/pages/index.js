import * as React from "react";
import { useRef } from "react";
import "../styles/index.scss";

// markup
const IndexPage = () => {
  let fileUpload = useRef(null);

  const onFileUpload = () => {
    const file = fileUpload.files;
    console.log(file);
  }

  return (
    <main>
      <div className="header-wrapper">
      <h1>Merge Your PDFs<span aria-label="document emoji" role="img">📄</span></h1>
      </div>
      <div className="file-upload-wrapper">
        <input type="file" accept=".pdf" multiple 
        ref={(ref) => fileUpload = ref}
        onChange={onFileUpload} id="file-input"></input>
      </div>
    </main>
  )
}

export default IndexPage
