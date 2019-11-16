import * as React from "react";
import { render } from "react-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Slider from "@material-ui/core/Slider";

import Grid from "@material-ui/core/Grid";

import "./styles.css";

export default class App extends React.Component {
  state = {
    seq: "ACTG",
    bc: true, //base count
    bcval: 4,
    gc: true,
    gcval: 0.5, //GC ratio
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
    grp: 4 //Groups of letters in the output (eg. ACT GTA CT)
  };
  UValue = "ACTG";
  countBase = (seq: string) => {
    this.setState({ bcval: seq.length });
  };
  getGCRatio = (seq: string) => {
    let gc = (seq.match(/G|C/g) || []).length;
    let at = (seq.match(/A|T/g) || []).length;
    let gcRatio = Math.round((100 * gc) / at) / 100;
    this.setState({ gcval: gcRatio });
  };
  getNBase = (seq: string) => {
    console.log(seq.replace(/A|C|T|G|N/g, ""));
    let inValid: number = seq.replace(/A|C|T|G|N/g, "").length;
    console.log(inValid);
    let nBase: number = seq.match(/N/g) ? seq.match(/N/g).length : 0;
    this.setState({ nbval: nBase, invalid: inValid });
  };
  sanitize = (seq: string) => {
    let sanitizedSeq: string;
    sanitizedSeq = seq.replace(/\s/g, "");
    return sanitizedSeq.replace(/[^A|C|T|G|N]/g, "N");
  };
  addSpace = (seq: string) => {
    if (this.state.grp === 0) {
      return seq;
    }
    const re = new RegExp(`.{0,` + this.state.grp + `}`, "g");
    return seq.match(re).join(" ");
  };
  rev = (seq: string) => {
    return seq
      .split("")
      .reverse()
      .join("");
  };
  comp = (seq: string) => {
    const lookup: object = { A: "T", T: "A", C: "G", G: "C", N: "N" };
    return seq
      .split("")
      .map(el => lookup[el])
      .join("");
  };
  displaySeqs = (seq: string) => {
    if (this.state.os) {
      this.setState({ osval: this.addSpace(seq) });
    }
    if (this.state.rs) {
      this.setState({ rsval: this.addSpace(this.rev(seq)) });
    }
    if (this.state.cs) {
      this.setState({ csval: this.addSpace(this.comp(seq)) });
    }
    if (this.state.rcs) {
      this.setState({
        rcsval: this.addSpace(this.rev(this.comp(seq)))
      });
    }
  };
  onSliderChange = (_event: any, value: number) => {
    this.setState({ grp: value }, () => {
      this.displaySeqs(this.UValue);
    });
  };
  onChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    let value: string = target.value;
    if (!value) {
      value = "";
    }
    this.UValue = this.sanitize(value.toUpperCase());
    this.setState({ seq: value });
    this.displaySeqs(this.UValue);
    this.countBase(this.UValue);
    this.getGCRatio(this.UValue);
    this.getNBase(value.toUpperCase());
  };
  onFocus = (event: React.FormEvent<HTMLTextAreaElement>) => {
    (event.target as HTMLTextAreaElement).select();
  };
  onClick = (x: string) => {
    this.setState({ [x]: !this.state[x] });
  };
  render() {
    let baseCount = this.state.bc ? (
      <React.Fragment>
        <strong>Number of Bases</strong>
        <pre>{this.state.bcval}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    let gcRatio = this.state.gc ? (
      <React.Fragment>
        <strong>GC Ratio</strong>
        <pre>{this.state.gcval}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    let nBase = this.state.nb ? (
      <React.Fragment>
        <strong>N Bases</strong>
        <pre>
          {this.state.nbval} N bases and {this.state.invalid} invalid bases.
        </pre>
      </React.Fragment>
    ) : (
      ""
    );

    let oSeq = this.state.os ? (
      <React.Fragment>
        <strong>Original Sequence</strong>
        <pre>{this.state.osval}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    let revSeq = this.state.rs ? (
      <React.Fragment>
        <strong>Reverse Sequence</strong>
        <pre>{this.state.rsval}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    let compSeq = this.state.cs ? (
      <React.Fragment>
        <strong>Complement Sequence</strong>
        <pre>{this.state.csval}</pre>
      </React.Fragment>
    ) : (
      ""
    );

    let revCompSeq = this.state.rcs ? (
      <React.Fragment>
        <strong>Reverse Complement Sequence</strong>
        <pre>{this.state.rcsval}</pre>
      </React.Fragment>
    ) : (
      ""
    );
    return (
      <div className="App">
        <h1 style={{ marginLeft: "none" }}>DNA</h1>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} style={{ padding: "5px" }}>
            <FormGroup>
              <h3 style={{ marginTop: "0" }}>Enter DNA sequence</h3>
              <TextareaAutosize
                style={{
                  resize: "vertical",
                  width: "95%",
                  minHeight: "20px",
                  fontSize: "1em"
                }}
                rows={5}
                value={this.state.seq}
                spellCheck={false}
                aria-label="Enter DNA sequence"
                placeholder="White spaces and line breaks will be ignored. Input is not case sensitive."
                onChange={this.onChange}
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
              <FormControlLabel
                labelPlacement="end"
                control={
                  <Checkbox
                    value="base-count"
                    color="primary"
                    checked={this.state.bc}
                    onClick={() => this.onClick("bc")}
                  />
                }
                label="Number of Bases"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="gc-ratio"
                    color="primary"
                    checked={this.state.gc}
                    onClick={() => this.onClick("gc")}
                  />
                }
                label="GC Ratio"
              />
              <FormControlLabel
                labelPlacement="end"
                control={
                  <Checkbox
                    value="n-base"
                    color="primary"
                    checked={this.state.nb}
                    onClick={() => this.onClick("nb")}
                  />
                }
                label="N Bases (inculding invalid bases)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="original"
                    color="primary"
                    checked={this.state.os}
                    onClick={() => this.onClick("os")}
                  />
                }
                label="Original Sequence"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="complement"
                    color="primary"
                    checked={this.state.cs}
                    onClick={() => this.onClick("cs")}
                  />
                }
                label="Complement Sequence"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="reverse"
                    color="primary"
                    checked={this.state.rs}
                    onClick={() => this.onClick("rs")}
                  />
                }
                label="Reverse Sequence"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="rev-complement"
                    color="primary"
                    checked={this.state.rcs}
                    onClick={() => this.onClick("rcs")}
                  />
                }
                label="Reverse Complement Sequence"
              />
            </FormGroup>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              backgroundColor: "#bbdefb",
              border: "1px solid #1976d2",
              borderRadius: "5px"
            }}
          >
            {baseCount}
            {gcRatio}
            {nBase}
            {oSeq}
            {revSeq}
            {compSeq}
            {revCompSeq}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
