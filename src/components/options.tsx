import * as React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Options(props: any) {
  const [val, setVal] = React.useState(props.checked);
  const handleClick = () => {
    let newVal = !val;
    setVal(newVal);
    props.toggle(props.retVal, newVal);
  };
  return (
    <FormControlLabel
      control={
        <Checkbox
          value={props.value}
          color="primary"
          checked={val}
          onClick={handleClick}
        />
      }
      label={props.label}
    />
  );
}
