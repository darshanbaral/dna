//Options
const ops = [
  {
    value: "base-count",
    label: "Number of Bases",
    retVal: "bc",
  },
  { value: "gc-ratio", label: "GC ratio", retVal: "gc" },
  {
    value: "n-base",
    label: "N Bases (inculding invalid bases)",
    retVal: "nb",
  },
  { value: "original", label: "Original Sequence", retVal: "os" },
  { value: "complement", label: "Complement Sequence", retVal: "cs" },
  { value: "reverse", label: "Reverse Sequence", retVal: "rs" },
  {
    value: "rev-complement",
    label: "Reverse Complement Sequence",
    retVal: "rcs",
  },
];

export default ops;
