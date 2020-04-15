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
    rawValue: "ACTG",
    sanitizedValue: "ACTG",
    os: true, //Original Sequence
    cs: true, //Complement Sequence
    rs: true, //Reverse Sequence
    rcs: true, //Reverse Complement Sequence
    grp: 4, //Groups of letters in the output (eg. ACT GTA CT)
  };

  onInputChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    let value: string = target.value;
    if (!value) {
      value = "";
    }
    this.setState({ rawValue: value });
    this.setState({ sanitizedValue: value.sanitize() });
  };

  onFocusInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    (event.target as HTMLTextAreaElement).select();
  };

  handleCheckboxToggle = (x: string, y: boolean) => {
    this.setState({ [x]: y });
  };

  handleSliderChange = (_event: any, value: any) => {
    this.setState({ grp: value });
  };

  render() {
    let Nbases: number = this.state.rawValue.getNBase();
    let invalidBases: number = this.state.rawValue.getInvalidBase();
    let gcRatio: number = this.state.sanitizedValue.getGCRatio();
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            position: "fixed",
            top: "0",
            backgroundColor: "whitesmoke",
            zIndex: 20,
          }}
        >
          {" "}
          <OptionList
            checkedState={{
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
                padding: "5px",
              }}
              rows={5}
              value={this.state.rawValue}
              spellCheck={false}
              aria-label="Enter DNA sequence"
              placeholder="White spaces and line breaks will be ignored. Input is not case sensitive."
              onChange={this.onInputChange}
              onFocus={this.onFocusInput}
            />
          </FormGroup>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="info">
              Bases: <code>{this.state.sanitizedValue.countBase()}</code>{" "}
            </div>
            <div className="info">
              GC Ratio: <code>{gcRatio > 0 ? gcRatio : 0}</code>{" "}
            </div>
            <div className="info">
              N Bases:{" "}
              <code
                style={{
                  color: Nbases > 0 ? "#dd2c00" : "inherit",
                }}
              >
                {Nbases}
              </code>
            </div>
            <div className="info">
              Invalid Bases:{" "}
              <code
                style={{
                  color: invalidBases > 0 ? "#dd2c00" : "inherit",
                }}
              >
                {invalidBases}
              </code>
            </div>
          </div>

          <h3 style={{ margin: "10px 0 0 0" }}>Outputs</h3>
          <PanelContainer
            label="Original"
            content={
              <SeqPanelContent
                grp={this.state.grp}
                show={this.state.os}
                data={this.state.os ? this.state.sanitizedValue : ""}
              />
            }
            show={this.state.os}
          />
          <PanelContainer
            label="Complement"
            content={
              <SeqPanelContent
                grp={this.state.grp}
                show={this.state.cs}
                data={this.state.cs ? this.state.sanitizedValue.comp() : ""}
              />
            }
            show={this.state.cs}
          />
          <PanelContainer
            label="Reverse"
            content={
              <SeqPanelContent
                grp={this.state.grp}
                show={this.state.rs}
                data={this.state.rs ? this.state.sanitizedValue.rev() : ""}
              />
            }
            show={this.state.rs}
          />
          <PanelContainer
            label="Reverse Complement"
            content={
              <SeqPanelContent
                grp={this.state.grp}
                show={this.state.rcs}
                data={
                  this.state.rcs ? this.state.sanitizedValue.rev().comp() : ""
                }
              />
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
