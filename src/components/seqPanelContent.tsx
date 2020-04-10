import * as React from "react";

export default function SeqPanelContent(props: any) {
  const makeNRed = (seq: string) => {
    return seq.split("").map((el: string) => {
      return (
        <span style={{ color: el === "N" ? "red" : "inherit" }}>{el}</span>
      );
    });
  };

  return props.show ? <pre>{makeNRed(props.val)}</pre> : null;
}
