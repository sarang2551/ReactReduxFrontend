import { Typography } from "@material-ui/core";

function FileUploaderMui(props) {
  return (
    <div
      style={{ marginLeft: props.marginLeft, marginBottom: props.marginBottom }}
      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-fullWidth"
    >
      <input
        type={"file"}
        id="image-file-upload"
        style={{
          display: "none",
          width: "100%"
        }}
        onChange={(e) => {
          props.succeedCallback &&
            props.succeedCallback("image", e.target.files[0]);
        }}
        onClick={props.onClickCallback}
      ></input>

      <label
        htmlFor="image-file-upload"
        style={{
          cursor: "pointer",
          margin: 0
        }}
      >
        <Typography variant={"button"}>{props.label}</Typography>
      </label>
    </div>
  );
}

export default FileUploaderMui;
