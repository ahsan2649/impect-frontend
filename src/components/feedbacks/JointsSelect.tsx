import { useState } from "react";
import JointsRender from "./JointsRender";
import { LucideCheck } from "lucide-react";

const joints = [
  {
    id: "HandR",
    d: "m 47.3331,56.770246 h -8.199405 v 7.955258 c 0,2.275 1.851047,4.12314 4.127048,4.12314 2.28,0 4.072357,-1.84614 4.072357,-4.12314 z",
  },
  {
    id: "ElbowR",
    d: "M 47.3331,39.363028 H 39.133695 V 55.974733 H 47.3331 Z",
  },
  {
    id: "ShoulderR",
    d: "m 39.112441,22.304433 v 14.299152 h 0.01367 v 1.787149 h 8.199405 v -4.662215 c 0,-5.295747 -3.449917,-9.799316 -8.213077,-11.424086 z",
  },
  {
    id: "HandL",
    d: "M 8.1954974,56.858636 H -5.7216711e-7 v 7.955258 c 0,2.275 1.78945197216711,4.12314 4.06845197216711,4.12314 2.28,0 4.127046,-1.84614 4.127046,-4.12314 z",
  },
  {
    id: "ElbowL",
    d: "M 8.1954974,39.451418 H -5.7216711e-7 V 56.063123 H 8.1954974 Z",
  },
  {
    id: "ShoulderL",
    d: "M 8.2130764,22.392823 C 3.4476554,24.017434 -5.7216711e-7,28.520958 -5.7216711e-7,33.816909 v 4.662215 H 8.1954974 v -1.787149 h 0.01758 z",
  },
  {
    id: "FootL",
    d: "m 11.489152,105.4404 c 0.0033,5.19081 0.0059,8.82476 0.0059,9.75218 0,3.05 2.479329,5.52942 5.533329,5.52942 3.052,0 5.523562,-2.47942 5.523562,-5.52942 v -9.75218 z",
  },
  {
    id: "KneeL",
    d: "m 11.489152,104.37972 h 11.06275 V 88.629388 H 11.479386 c 0.0039,5.896939 0.007,11.376352 0.0098,15.750332 z",
  },
  {
    id: "UpperLegL",
    d: "M 22.551902,87.568702 V 72.568363 H 11.46962 c 0.0034,5.02761 0.0065,10.154929 0.0098,15.000339 z",
  },
  {
    id: "FootR",
    d: "m 24.821485,105.4404 v 9.75218 c 0,3.05 2.473375,5.52942 5.531375,5.52942 3.054001,0 5.548954,-2.47942 5.548954,-5.52942 v -9.75218 z",
  },
  {
    id: "KneeR",
    d: "M 24.821485,104.37972 H 35.901814 V 88.629388 H 24.821485 Z",
  },
  {
    id: "UpperLegR",
    d: "M 35.901814,72.568363 H 24.821485 v 15.000339 h 11.080329 z",
  },
  {
    id: "Hips",
    d: "m 11.461808,57.321696 c 0.0024,3.539036 0.0052,10.364065 0.0078,14.185981 H 22.55189 V 67.42946 h 2.269582 v 4.078217 H 35.901814 V 57.321696 Z",
  },
  {
    id: "Core",
    d: "M 35.901814,39.258785 H 11.450089 c 0.0022,3.225277 0.0056,8.002999 0.01172,17.179006 h 24.440006 z",
  },
  {
    id: "Chest",
    d: "m 13.542023,21.613168 h -0.261725 c -1.368895,0 -2.687956,0.227136 -3.9180576,0.646499 v 12.299107 h 2.0859846 c 0,0 0.0012,2.580672 0.002,3.638754 h 24.451679 v -3.638754 h 2.113329 V 22.259667 C 36.785485,21.840185 35.466997,21.613168 34.099129,21.613168 H 33.790528 A 10.125229,10.18773 0 0 1 23.667252,31.677849 10.125229,10.18773 0 0 1 13.542023,21.613168 Z",
  },
  {
    id: "Neck",
    d: "m 14.683963,21.613168 a 8.9834534,9.0389065 0 0 0 8.983453,8.929733 8.9834534,9.0389065 0 0 0 8.981721,-8.929733 z",
  },
  {
    id: "Head",
    d: "M 23.689443,1.274557e-7 C 18.481447,1.274557e-7 14.265447,4.2191076 14.265447,9.426108 c 10e-4,5.203 4.217,9.424 9.423996,9.424 5.202001,0 9.422001,-4.221 9.422001,-9.424 0,-5.2080004 -4.22,-9.4261078725443 -9.422001,-9.4261078725443 z",
  },
];

export default function (props: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedJoints, setSelectedJoints] = useState<string[]>([]);

  const [hoveredJoint, setHoveredJoint] = useState<string>("");

  function toggleJoint(joint: string) {
    if (selectedJoints.includes(joint)) {
      const newValue = selectedJoints.filter((j) => j !== joint);
      setSelectedJoints(newValue);
      props.setValue(newValue.join(" "));
    } else {
      const newValue = [...selectedJoints, joint];
      setSelectedJoints(newValue);
      props.setValue(newValue.join(" "));
    }
  }

  return (
    <div className="w-full grid grid-cols-2 ">
      <ul className="list bg-base-200 rounded-box w-full overflow-scroll h-80">
        {joints.map((j) => (
          <li
            key={j.id}
            className="list-row hover:bg-base-300 flex justify-between"
            onMouseEnter={() => setHoveredJoint(j.id)}
            onMouseLeave={() => setHoveredJoint("")}
            onClick={() => toggleJoint(j.id)}
          >
            <span>{j.id}</span>
            {selectedJoints.includes(j.id) ? <LucideCheck></LucideCheck> : ""}
          </li>
        ))}
      </ul>
      <div className=" flex items-center justify-center h-80">
        <JointsRender
          joints={joints}
          hoveredJoint={hoveredJoint}
          setHoveredJoint={setHoveredJoint}
          selectedJoints={selectedJoints}
          toggleJoint={toggleJoint}
        />
      </div>
    </div>
  );
}
