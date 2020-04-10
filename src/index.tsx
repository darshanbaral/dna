import * as React from "react";
import { render } from "react-dom";

import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormGroup from "@material-ui/core/FormGroup";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

import Options from "./components/options";
import ops from "./components/selectionOptions";
import { addSpace } from "./components/helperFunctions";

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

  UValue = "ACTG";

  displaySeqs = (seq: string) => {
    if (this.state.os) {
      this.setState({ osval: addSpace(seq, this.state.grp) });
    }
    if (this.state.rs) {
      this.setState({ rsval: addSpace(seq.rev(), this.state.grp) });
    }
    if (this.state.cs) {
      this.setState({ csval: addSpace(seq.comp(), this.state.grp) });
    }
    if (this.state.rcs) {
      this.setState({
        rcsval: addSpace(seq.rev().comp(), this.state.grp),
      });
    }
  };

  onSliderChange = (_event: any, value: any) => {
    this.setState({ grp: value }, () => {
      this.displaySeqs(this.UValue);
    });
  };

  onInputChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    let value: string = target.value;
    if (!value) {
      value = "";
    }
    this.UValue = value.sanitize();
    this.setState({ seq: value });
    this.displaySeqs(this.UValue);
    this.setState({ bcval: this.UValue.countBase() });
    this.setState({ gcval: this.UValue.getGCRatio() });
    this.setState({ nbval: value.getNBase(), invalid: value.getInvalidBase() });
  };

  onFocus = (event: React.FormEvent<HTMLTextAreaElement>) => {
    (event.target as HTMLTextAreaElement).select();
  };

  retFunc = (x: string, y: boolean) => {
    this.setState({ [x]: y });
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
      <div className="App">
        <Grid container spacing={4}>
          <h1 style={{ marginLeft: "none" }}>
            DNA by <a href="https://www.darshanbaral.com/">Darshan</a>
          </h1>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} style={{ padding: "5px" }}>
            <FormGroup>
              <h3 style={{ marginTop: "0" }}>Enter DNA sequence</h3>
              <TextareaAutosize
                style={{
                  resize: "vertical",
                  width: "95%",
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
              <h3 style={{ marginTop: "0.5em" }}>Chunk Size</h3>
              <Slider
                defaultValue={4}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChange={this.onSliderChange}
                step={1}
                marks={true}
                min={0}
                max={6}
                style={{ width: "95%" }}
              />
              <h3>Options</h3>
              {ops.map((el) => {
                return (
                  <Options
                    value={el.value}
                    label={el.label}
                    retVal={el.retVal}
                    retFunc={this.retFunc}
                  />
                );
              })}
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              backgroundColor: "#bbdefb",
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
