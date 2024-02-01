import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [claimData, setClaimData] = useState({
    name: "",
    description: "",
    province: "",
    township: "",
    square_area: "",
    area_unit: "",
    primary_commodity: "",
    secondary_commodity: "",
  });

  const handleInputChange = (e) => {
    setClaimData({ ...claimData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const uploadFiles = () => {
    const formData = new FormData();

    // Append claim data to formData
    for (const [key, value] of Object.entries(claimData)) {
      formData.append(key, value);
    }

    // Append files to formData
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    axios
      .post("http://18.118.99.205:8080/claims", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InJjYWwiLCJmaXJzdF9uYW1lIjoicmF1bCIsImxhc3RfbmFtZSI6ImNhbGVybyIsImVtYWlsIjoicmF1bEBlbWFpbC5jb20iLCJpc19hZG1pbiI6ZmFsc2UsImxvZ2luVGltZSI6MTcwNTM3MDQwNzI4NCwiaWF0IjoxNzA1MzcwNDA3LCJleHAiOjE3MDU0NTY4MDd9.wXcy9-08bhH0a1LT2FAn8599tqwNeUK8dNrrPhgAA8I",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading:", error);
      });
  };

  return (
    <div>
      <div>
        {Object.keys(claimData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={claimData[key]}
            onChange={handleInputChange}
            placeholder={key}
          />
        ))}
      </div>
      <input type="file" multiple onChange={handleFileSelect} />
      <button onClick={uploadFiles}>Upload Files and Data</button>
      {selectedFiles.length > 0 && (
        <div>
          <h3>Selected Files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
