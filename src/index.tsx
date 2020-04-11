import * as React from "react";
import { render } from "react-dom";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormGroup from "@material-ui/core/FormGroup";
import OptionList from "./components/optionList";
import PanelContainer from "./components/panelContainer";
import SeqPanelContent from "./components/seqPanelContent";
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

  onFocusInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
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
    return (
      <div className="App" style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "50px",
            height: "100vh",
            position: "fixed",
            top: "0",
          }}
        >
          {" "}
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
            grp={this.state.grp}
          />
        </div>
        <div
          style={{
            width: "calc(100% - 50px)",
            marginLeft: "50px",
          }}
        >
          <h1
            style={{
              margin: "0",
              padding: "10px 0",
            }}
          >
            DNA
          </h1>

          <FormGroup>
            <h3 style={{ margin: "10px 0 10px 0" }}>Input DNA Data</h3>
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
              onFocus={this.onFocusInput}
            />
          </FormGroup>

          <h3 style={{ margin: "10px 0 0 0" }}>Outputs</h3>
          <PanelContainer
            label="Base Count"
            content={
              this.state.bc ? (
                <React.Fragment>
                  <pre>{this.state.bcval}</pre>
                </React.Fragment>
              ) : (
                ""
              )
            }
            show={this.state.bc}
          />
          <PanelContainer
            label="GC Ratio"
            content={
              this.state.gc ? (
                <React.Fragment>
                  <pre>{this.state.gcval}</pre>
                </React.Fragment>
              ) : (
                ""
              )
            }
            show={this.state.gc}
          />
          <PanelContainer
            label="N Bases"
            content={
              this.state.nb ? (
                <React.Fragment>
                  <pre>
                    <span
                      style={{
                        color: this.state.nbval > 0 ? "red" : "inherit",
                      }}
                    >
                      {this.state.nbval}
                    </span>{" "}
                    N bases and{" "}
                    <span
                      style={{
                        color: this.state.invalid > 0 ? "red" : "inherit",
                      }}
                    >
                      {this.state.invalid}
                    </span>{" "}
                    invalid bases.
                  </pre>
                </React.Fragment>
              ) : (
                ""
              )
            }
            show={this.state.nb}
          />
          <PanelContainer
            label="Original Sequence"
            content={
              <SeqPanelContent val={this.state.osval} show={this.state.os} />
            }
            show={this.state.os}
          />
          <PanelContainer
            label="Complement Sequence"
            content={
              <SeqPanelContent val={this.state.csval} show={this.state.cs} />
            }
            show={this.state.cs}
          />
          <PanelContainer
            label="Reverse Sequence"
            content={
              <SeqPanelContent val={this.state.rsval} show={this.state.rs} />
            }
            show={this.state.rs}
          />
          <PanelContainer
            label="Reverse Complement Sequence"
            content={
              <SeqPanelContent val={this.state.rcsval} show={this.state.rcs} />
            }
            show={this.state.rcs}
          />
        </div>
        <footer style={{ height: "50px", marginTop: "30px" }}>
          Made by <a href="https://www.darshanbaral.com/">Darshan</a>. Fork{" "}
          <a href="https://github.com/darshanbaral/dna">here</a>.
        </footer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
