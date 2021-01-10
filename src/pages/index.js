import React, {useState, useEffect} from "react";
import { Document, Page } from 'react-pdf';
import "../styles/index.scss";

// markup
const IndexPage = () => {

  const [ fileList, setFileList ] = useState([]);
  const [ dropHover, setDropHover ] = useState(false);
  const [ fileUploaded, setFileUploaded ] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    console.log('file list', fileList);
    const dropArea = document.getElementById('drop-area');
    const inputElement = document.getElementById('file-input');

    ['dragleave', 'dragend'].forEach(type => {
      dropArea.addEventListener(type, e => {
        setDropHover(false);
      })
    })

    dropArea.addEventListener('dragover', e => {
      e.preventDefault();
      setDropHover(true);
    })

    dropArea.addEventListener('drop', e => {
      e.preventDefault();
      if (e.dataTransfer.files) {
        inputElement.files = e.dataTransfer.files;
        setFileUploaded(true);
        setFileList([...fileList, ...inputElement.files])
      }
      setDropHover(false);
      getThumbnail(new Blob(fileList[0]));
      console.log('input element', inputElement.files);
    })
  })

  const onFileUpload = (e) => {
    console.log(e.target.files);
    setFileList([...fileList, e.target.files[0]]);
  }

  const onDocumentLoad = ({ numPages }) => {
    setNumPages(numPages);
  }

  const getThumbnail = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload= () => {
      console.log(reader.result);
    }

    reader.onerror = () => {
      console.error(reader.error);
    }
  }

  const renderThumbanil = () => {
    return (
      <div className="drop-area-thumbnail">
        {
          fileList.map(file => {
            getThumbnail(file);
          })
        }
      </div>
    )
  }

  const dropAreaClass = dropHover ? 'drop-area drop-area-hover' : 'drop-area';

  return (
    <main className="body-wrapper">
      <div className="header-wrapper">
      <h1>Merge Your PDFs<span aria-label="document emoji" role="img">📄</span></h1>
      </div>
      <div className="file-input-wrapper">
        <input type="file" accept=".pdf" multiple 
        onChange={onFileUpload} id="file-input"></input>
      </div>
      <div id="drop-area" className={dropAreaClass}>
        <div className="drop-area-text">
          {!dropHover && !fileUploaded && <p>Drag and drop your PDFs here!</p>}
        </div>
      </div>
    </main>
  )
}

export default IndexPage
