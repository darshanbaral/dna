import * as React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function PanelContainer(props: any) {
  const [show, setShow] = React.useState(props.show);

  const handleChange = () => {
    setShow(!show);
  };

  const makeNRed = (seq: string) => {
    return seq.split("").map((el: string) => {
      return (
        <span style={{ color: el === "N" ? "red" : "inherit" }}>{el}</span>
      );
    });
  };

  return (
    <ExpansionPanel
      disabled={!props.show}
      expanded={show && props.show}
      style={{ margin: "10px 0", position: "relative" }}
      onChange={handleChange}
    >
      <ExpansionPanelSummary
        style={{ margin: "0", minHeight: "1em", padding: "0 24px" }}
        expandIcon={<ExpandMoreIcon />}
      >
        <h4 style={{ margin: "0" }}>{props.label}</h4>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: "0 24px" }}>
        {props.content}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
