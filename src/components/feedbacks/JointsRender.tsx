const style = {
  fill: "#217255",
  fillOpacity: "1",
};

const altStyle = {
  fill: "#722155",
  fillOpacity: "1",
};

export default function (props: {
  joints: { id: string; d: string }[];
  hoveredJoint: string;
  selectedJoints: string[];
  setHoveredJoint: React.Dispatch<React.SetStateAction<string>>;
  toggleJoint: (joint: string) => void;
}) {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 124.189 132.243"
      viewBox="0 0 47.333098 120.72199"
      id="svg1"
      height={"100%"}
      preserveAspectRatio="true"
    >
      {props.joints.map((j) => (
        <path
          key={j.id}
          d={j.d}
          id={j.id}
          style={
            props.hoveredJoint === j.id || props.selectedJoints.includes(j.id)
              ? altStyle
              : style
          }
          onMouseEnter={() => props.setHoveredJoint(j.id)}
          onMouseLeave={() => props.setHoveredJoint("")}
          onClick={() => props.toggleJoint(j.id)}
        ></path>
      ))}
    </svg>
  );
}
