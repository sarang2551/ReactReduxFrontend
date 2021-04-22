export const base64Prefix = "data:image/jpeg;base64,";
export const base64PrefixPNG = "data:image/png;base64,";
export const jpegSuffix = "image/jpeg";
export const pngSuffix = "image/png";
const MAX_FACE_IMAGE_SIZE_IN_BYTES = 100 * 1024 * 1.33;
export const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  //encodes a string into base64
  return window.btoa(binary);
};

/**Checks whether a base64 is jpeg/png  */
export const JPEG_OR_PNG = (base64String) => {
  if (base64String.startsWith(base64Prefix)) {
    return "jpeg";
  } else if (base64String.startsWith(base64PrefixPNG)) {
    return "png";
  } else {
    throw new Error("Image is neither a png nor a jpeg!");
  }
};

export const canvas2Base64WithMaxSize = (
  canvas,
  quality,
  downgraded,
  imageSrc
) => {
  quality = quality || 1.0;
  var imageType = JPEG_OR_PNG(imageSrc);
  let value;
  if (imageType === "jpeg") {
    value = canvas.toDataURL(jpegSuffix, quality).replace(base64Prefix, "");
  } else if (imageType === "png") {
    value = canvas.toDataURL(pngSuffix, quality).replace(base64PrefixPNG, "");
  }

  const sizeInBytes = calBase64Size(value);

  if (sizeInBytes > MAX_FACE_IMAGE_SIZE_IN_BYTES && quality > 0.0001) {
    // downgrade the quality progressively until the size is under the max
    return canvas2Base64WithMaxSize(canvas, quality * 0.7, true);
  } else {
    return value;
  }
};

export const calBase64Size = (base64) => {
  if (!base64) return 0;

  var sizeInBytes = 4 * Math.ceil(base64.length / 3) * 0.5624896334383812;

  console.log("[calBase64Size] sizeInBytes: ", sizeInBytes);

  return sizeInBytes;
};
