import * as React from "react";
import { render } from "react-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormGroup from "@material-ui/core/FormGroup";
import OptionList from "./components/optionList";
import {} from "./components/helperFunctions";
import "./styles.css";

export default class App extends React.Component {
  state: { [key: string]: any } = {
    seq: "ACTG",
    bc: true, //base count
    bcval: 4,
    gc: true, //GC ratio
    gcval: 0.5,
    nb: true, //N bases
    nbval: 0,
    invalid: 0,
    os: true, //Original Sequence
    osval: "ACTG",
    cs: true, //Complement Sequence
    csval: "TGAC",
    rs: true, //Reverse Sequence
    rsval: "GTCA",
    rcs: true, //Reverse Complement Sequence
    rcsval: "CAGT",
    grp: 4, //Groups of letters in the output (eg. ACT GTA CT)
  };

  sanitizedValue = "ACTG";

  displaySeqs = (seq: string) => {
    if (this.state.os) {
      this.setState({ osval: seq.addSpace(this.state.grp) });
    }
    if (this.state.rs) {
      this.setState({ rsval: seq.rev().addSpace(this.state.grp) });
    }
    if (this.state.cs) {
      this.setState({ csval: seq.comp().addSpace(this.state.grp) });
    }
    if (this.state.rcs) {
      this.setState({
        rcsval: seq.rev().comp().addSpace(this.state.grp),
      });
    }
  };

  onInputChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    let value: string = target.value;
    if (!value) {
      value = "";
    }
    this.sanitizedValue = value.sanitize();
    this.setState({ seq: value });
    this.displaySeqs(this.sanitizedValue);
    this.setState({ bcval: value.countBase() });
    this.setState({ gcval: value.getGCRatio() });
    this.setState({ nbval: value.getNBase(), invalid: value.getInvalidBase() });
  };

  onFocus = (event: React.FormEvent<HTMLTextAreaElement>) => {
    (event.target as HTMLTextAreaElement).select();
  };

  handleCheckboxToggle = (x: string, y: boolean) => {
    this.setState({ [x]: y });
  };

  handleSliderChange = (_event: any, value: any) => {
    this.setState({ grp: value }, () => {
      this.displaySeqs(this.sanitizedValue);
    });
  };

  render() {
    const baseCount = this.state.bc ? (
      <React.Fragment>
        <strong>Number of Bases</strong>
        <pre>{this.state.bcval}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    const gcRatio = this.state.gc ? (
      <React.Fragment>
        <strong>GC Ratio</strong>
        <pre>{this.state.gcval}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    const nBase = this.state.nb ? (
      <React.Fragment>
        <strong>N Bases</strong>
        <pre>
          <span style={{ color: this.state.nbval > 0 ? "red" : "inherit" }}>
            {this.state.nbval}
          </span>{" "}
          N bases and{" "}
          <span style={{ color: this.state.invalid > 0 ? "red" : "inherit" }}>
            {this.state.invalid}
          </span>{" "}
          invalid bases.
        </pre>
      </React.Fragment>
    ) : (
      ""
    );

    const makeNRed = (seq: string) => {
      return seq.split("").map((el: string) => {
        return (
          <span style={{ color: el === "N" ? "red" : "inherit" }}>{el}</span>
        );
      });
    };

    const oSeq = this.state.os ? (
      <React.Fragment>
        <strong>Original Sequence</strong>
        <pre>{makeNRed(this.state.osval)}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    const revSeq = this.state.rs ? (
      <React.Fragment>
        <strong>Reverse Sequence</strong>
        <pre>{makeNRed(this.state.rsval)}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    const compSeq = this.state.cs ? (
      <React.Fragment>
        <strong>Complement Sequence</strong>
        <pre>{makeNRed(this.state.csval)}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    const revCompSeq = this.state.rcs ? (
      <React.Fragment>
        <strong>Reverse Complement Sequence</strong>
        <pre>{makeNRed(this.state.rcsval)}</pre>
      </React.Fragment>
    ) : (
      ""
    );
    return (
      <div className="App" style={{ marginLeft: "40px" }}>
        <h1
          style={{
            margin: "0",
            padding: "10px 0",
          }}
        >
          DNA by <a href="https://www.darshanbaral.com/">Darshan</a>
        </h1>

        <FormGroup>
          <h3 style={{ marginTop: "0" }}>Enter DNA sequence</h3>
          <TextareaAutosize
            style={{
              resize: "vertical",
              minHeight: "20px",
              fontSize: "1em",
            }}
            rows={5}
            value={this.state.seq}
            spellCheck={false}
            aria-label="Enter DNA sequence"
            placeholder="White spaces and line breaks will be ignored. Input is not case sensitive."
            onChange={this.onInputChange}
            onFocus={this.onFocus}
          />
          <OptionList
            checkedState={{
              bc: this.state.bc,
              gc: this.state.gc,
              nb: this.state.nb,
              rs: this.state.rs,
              os: this.state.os,
              cs: this.state.cs,
              rcs: this.state.rcs,
            }}
            onCheckboxToggle={this.handleCheckboxToggle}
            onSliderChange={this.handleSliderChange}
          />
        </FormGroup>

        <div
          style={{
            backgroundColor: "#bbdefb",
            padding: "5px",
            margin: "5px",
            border: "1px solid #1976d2",
            borderRadius: "5px",
          }}
        >
          {baseCount}
          {gcRatio}
          {nBase}
          {oSeq}
          {compSeq}
          {revSeq}
          {revCompSeq}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
