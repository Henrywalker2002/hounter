import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadImageList(props) {
  const { selectedFiles, setSelectedFiles } = props;

  const handleFileChange = (event) => {
    const files = event.target.files;
    let validFiles = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Url = reader.result;
          validFiles.push({ file: files[i], base64Url });
          setSelectedFiles([...selectedFiles, ...validFiles]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const removeFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div style={{ margin: "10px" }}>
      <div style={{ fontFamily: "bolder" }}>
        {" "}
        Hình ảnh <span style={{ color: "red" }}>*</span>
      </div>
      <div>
        <Button
          component="label"
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onChange={handleFileChange}
          color="success"
          size="small"
        >
          Thêm ảnh
          <VisuallyHiddenInput type="file" />
        </Button>
        <br />
        {selectedFiles.length > 0 && (
          <div>
            <div>
              {selectedFiles.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.base64Url}
                    alt={item.file.name}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                  <button onClick={() => removeFile(index)}>Xoá</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
