import * as React from "react";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import CopyToClipboard from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";

export default function SeqPanelContent(props: any) {
  const [disp, setDisp] = React.useState("hidden");

  React.useEffect(() => {
    if (disp === "visible") {
      setTimeout(() => setDisp("hidden"), 1750);
    }
  }, [disp]);

  const handleClick = () => {
    setDisp("visible");
  };

  const msgStyle = {
    backgroundColor: "#edf7ed",
    border: "solid 1px #5cb660",
    textAlign: "center",
    borderRadius: "3px",
    fontSize: "0.8em",
    padding: "2px",
    margin: "5px 0",
    visibility: disp,
    opacity: disp === "hidden" ? 0 : 1,
    transition: "all 0.5s",
  } as React.CSSProperties;

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
        <CopyToClipboard text={props.val} onCopy={handleClick}>
          <IconButton aria-label="copy" color="primary">
            <FileCopyOutlinedIcon />
          </IconButton>
        </CopyToClipboard>
        <p style={msgStyle}>Copied</p>
      </div>
    </div>
  ) : null;
}
