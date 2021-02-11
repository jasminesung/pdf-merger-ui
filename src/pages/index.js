import React, {useState, useEffect} from "react";
import { Document, Page } from 'react-pdf';
import { mergePdf } from '../services/MergerService';
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

  const renderThumbnail = (file) => {
    console.log('file:', file);
    const fileUrl = URL.createObjectURL(file);
    console.log('file url', fileUrl);

    return (
      <div className="drop-area-pdf-preview">
        <iframe title={file.name} src={fileUrl} width='400px' height='400px'></iframe>
      </div>
    )
  }

  const renderThumbnailList = () => {
    return !dropHover && fileList.length > 0 ? (
      <div className="drop-area-thumbnail">
        {
          fileList.map((file, index) => {
            const fileUrl = URL.createObjectURL(file);
            return (
              <div key={index} className="drop-area-pdf-preview">
              <iframe title={file.name} src={fileUrl} width='100%' height='100%'></iframe>
              <p>{file.name ? file.name : null}</p>
            </div>
            )
          })
        }
      </div>
    ) : null;
  }

  const clearFiles = () => {
    setFileList([]);
    setFileUploaded(false);
  }

  const mergeFiles = () => {
    return mergePdf(fileList);
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
        {renderThumbnailList()}
        <div className="drop-area-text">
          {!dropHover && fileList.length === 0 && <p>Drag and drop your PDFs here!</p>}
        </div>
      </div>
      <div className="button-row">
        <button onClick={clearFiles} role="button" disabled={fileList.length === 0} className="button-row-button">CLEAR</button>
        <button onClick={mergeFiles} role="button" disabled={fileList.length === 0} className="button-row-button">MERGE</button>
        <button role="button" disabled={fileList.length === 0} className="button-row-button">DOWNLOAD</button>
      </div>
    </main>
  )
}

export default IndexPage
