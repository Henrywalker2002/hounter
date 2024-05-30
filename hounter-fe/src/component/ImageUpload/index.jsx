import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Button} from '@mui/material'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageUpload = ({selectedFile, setSelectedFile}) => {
  // const [selectedFile, setSelectedFile] = useState(props);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Url = reader.result;
        setSelectedFile({ file: file, base64Url });
        console.log(selectedFile)
      };
      // setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Please select a valid image file.');
    }
  };

  return (
    <div>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={handleFileChange} color='success' size='small'>
        Chọn ảnh khác
        <VisuallyHiddenInput type="file" />
      </Button>
      <br />
      {/* <button onClick={handleUpload}>Upload</button> */}
      {/* <br />
      {selectedFile && (
        <div>
          <img
            src={selectedFile.base64Url}
            alt="Selected"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )} */}
    </div>
  );
};

export default ImageUpload;
