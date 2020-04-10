import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Slider from "@material-ui/core/Slider";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Options from "./options";
import ops from "./selectionOptions";

export default function OptionList(props: any) {
  const [open, setOpen] = React.useState(false);
  let currentCheckedState: { [key: string]: boolean } = props.checkedState;
  const [checkedState, setCheckedState] = React.useState(currentCheckedState);

  const handleToggle = (retVal: string, checked: boolean) => {
    currentCheckedState[retVal] = checked;
    setCheckedState(currentCheckedState);
    props.onCheckboxToggle(retVal, checked);
  };

  const handleSliderChange = (_event: any, value: any) => {
    props.onSliderChange(_event, value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          fontSize: "45px",
        }}
        onClick={handleOpen}
      >
        <MenuRoundedIcon
          color="primary"
          fontSize="inherit"
          style={{ cursor: "pointer" }}
        />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Options"
        aria-describedby="Options"
        style={{ overflowY: "scroll" }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "5px",
            width: "95vw",
            maxWidth: "350px",
            border: "solid 1px red",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ margin: "0" }}>Options</h2>
            <CloseRoundedIcon
              color="primary"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </div>

          <h3 style={{ margin: "0.5em 0 0 0" }}>Chunk Size</h3>
          <Slider
            defaultValue={4}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            step={1}
            marks={true}
            min={0}
            max={6}
          />
          <h3 style={{ margin: "0.5em 0 0 0" }}>Outputs</h3>
          {ops.map((el) => {
            return (
              <Options
                value={el.value}
                label={el.label}
                retVal={el.retVal}
                checked={checkedState[el.retVal]}
                toggle={handleToggle}
              />
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
