import * as React from "react";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import CopyToClipboard from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";

export default function SeqPanelContent(props: any) {
  const makeNRed = (seq: string) => {
    return seq.split("").map((el: string) => {
      return (
        <span style={{ color: el === "N" ? "red" : "inherit" }}>{el}</span>
      );
    });
  };

  return props.show ? (
    <div style={{ position: "relative" }}>
      <pre>{makeNRed(props.val)}</pre>
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "-75px",
        }}
      >
        <CopyToClipboard text={props.val}>
          <IconButton aria-label="copy" color="primary">
            <FileCopyOutlinedIcon />
          </IconButton>
        </CopyToClipboard>
      </div>
    </div>
  ) : null;
}
