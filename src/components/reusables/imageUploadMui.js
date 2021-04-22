import React from "react";
import { arrayBufferToBase64, canvas2Base64WithMaxSize } from "./Utility";
import FileUploaderMui from "./fileUploadMui";
export default function UploadImageMui(props) {
  const [imageSrc, setImageSrc] = React.useState("");
  const imageHolderId = "productImage";

  var fileInfo = { type: null };

  const onFileLoad = (ev) => {
    const { result } = ev.currentTarget;
    const base64 = arrayBufferToBase64(result);
    setImageSrc(imageWithPrefix(base64));
  };

  const imageWithPrefix = (base64) => `data:${fileInfo.type};base64, ${base64}`;

  const onFileLoadError = (ev) => {
    //Need to change to a proper UI error
    console.log("Failed to load file from local");
  };

  const onFileLoadEnd = async (ev) => {
    try {
      resizeImage();
    } catch (error) {
      throw error;
    }
  };
  const reader = new FileReader();
  reader.addEventListener("load", onFileLoad);
  reader.addEventListener("error", onFileLoadError);
  reader.addEventListener("loadend", onFileLoadEnd);

  const resizeImage = () => {
    const image = document.getElementById(imageHolderId);
    const canvas = document.createElement("canvas");
    const width = image.width;
    const height = image.height;
    canvas.width = width;
    canvas.height = height;

    canvas.getContext("2d").drawImage(image, 0, 0, width, height);
    const resized = canvas2Base64WithMaxSize(canvas, 1.0, imageSrc);

    // setImageSrc(imageWithPrefix(resized));
    // image.remove();

    props.succeedCallback && props.succeedCallback({ resizedBase64: resized });

    props.setGlobalSharedAction({
      message: null,
      messageType: "success",
      loading: false
    });
  };
  const setImgUploadedCallback = (id, e) => {
    let errorMessage = "";

    if (id === "image" && e && e.type) {
      if (!e.type.startsWith("image/")) {
        errorMessage = "Please upload an image with PNG/JPEG format";
      } else if (/^image\/(png|jpe?g)/.test(e.type) === false) {
        errorMessage = "Only PNG or JPEG images are supported for now";
      }

      if (errorMessage) {
        //proper UI error required
        console.log(errorMessage);
        return;
      }

      // store file info to function scope
      fileInfo = e;

      // hand over to readerhandler
      //reads blob and loads content, after which the loadend event is triggered
      reader.readAsArrayBuffer(e);
    } else {
      //proper UI error required
      console.log("Pls upload an Image!");
    }
  };
  return (
    <div>
      <FileUploaderMui
        label={props.label || "Upload from local"}
        onClickCallback={(e) => {
          // clean the target to allow upload the same file
          e.target.value = null;
        }}
        succeedCallback={(id, data) => {
          setImgUploadedCallback(id, data);
        }}
      />

      <div>
        <img
          id={imageHolderId}
          alt={""}
          style={{
            maxHeight: "320px",
            maxWidth: "320px",
            display: "none"
          }}
          src={imageSrc}
        />
      </div>
    </div>
  );
}
