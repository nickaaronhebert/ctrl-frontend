import React, { useState } from "react";

interface LabelConfig {
  title: string;
  value: string | number | boolean;
}

interface Labels {
  left: LabelConfig;
  center: LabelConfig;
  right: LabelConfig;
}

interface TripleToggleSwitchProps {
  labels?: Labels;
  onChange?: (value: string) => void;
}

const defaultLabels: Labels = {
  left: { title: "24h", value: "24h" },
  center: { title: "1m", value: "1m" },
  right: { title: "7d", value: "7d" },
};

const TripleToggleSwitch: React.FC<TripleToggleSwitchProps> = ({
  labels = defaultLabels,
  onChange,
}) => {
  const [switchPosition, setSwitchPosition] = useState<string>("left");
  const [animation, setAnimation] = useState<string | null>(null);

  const getSwitchAnimation = (value: string) => {
    let animationClass = null;
    if (value === "center" && switchPosition === "left") {
      animationClass = "animate-left-to-center";
    } else if (value === "right" && switchPosition === "center") {
      animationClass = "animate-center-to-right";
    } else if (value === "center" && switchPosition === "right") {
      animationClass = "animate-right-to-center";
    } else if (value === "left" && switchPosition === "center") {
      animationClass = "animate-center-to-left";
    } else if (value === "right" && switchPosition === "left") {
      animationClass = "animate-left-to-right";
    } else if (value === "left" && switchPosition === "right") {
      animationClass = "animate-right-to-left";
    }

    if (onChange) {
      onChange(value);
    }
    setSwitchPosition(value);
    setAnimation(animationClass);
  };

  const getSwitchPositionClass = () => {
    switch (switchPosition) {
      case "left":
        return "left-1";
      case "center":
        return "left-[85px]";
      case "right":
        return "left-[167px]";
      default:
        return "left-1";
    }
  };

  return (
    <div className="inline-block align-middle w-[250px] h-[50px] rounded-full bg-[#F0ECF4] relative shadow-lg">
      <div
        className={`h-11 w-20 bg-primary rounded-full absolute top-0.5 transition-all duration-500 ease-in-out ${getSwitchPositionClass()} ${
          animation || ""
        }`}
      />

      <input
        defaultChecked
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="toggle-switch"
        id="left"
        type="radio"
        value="left"
        className="hidden"
      />
      <label
        className={`absolute left-0 top-0 flex items-center justify-center h-[50px] w-20 rounded-full cursor-pointer z-10 `}
        htmlFor="left"
      >
        <h4
          className={`m-0 font-medium ${
            switchPosition === "left" ? "text-white" : "text-black"
          }`}
        >
          {labels.left.title}
        </h4>
      </label>

      <input
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="toggle-switch"
        id="center"
        type="radio"
        value="center"
        className="hidden"
      />
      <label
        className={`absolute left-[85px] top-0 flex items-center justify-center h-[50px] w-20 rounded-full cursor-pointer z-10`}
        htmlFor="center"
      >
        <h4
          className={`m-0 font-medium ${
            switchPosition === "center" ? "text-white" : "text-black"
          }`}
        >
          {labels.center.title}
        </h4>
      </label>

      <input
        onChange={(e) => getSwitchAnimation(e.target.value)}
        name="toggle-switch"
        id="right"
        type="radio"
        value="right"
        className="hidden"
      />
      <label
        className={`absolute right-0.5 top-0 flex items-center justify-center h-[50px] w-20 rounded-full cursor-pointer z-10`}
        htmlFor="right"
      >
        <h4
          className={`m-0 font-medium ${
            switchPosition === "right" ? "text-white" : "text-black"
          }`}
        >
          {labels.right.title}
        </h4>
      </label>
    </div>
  );
};

export default TripleToggleSwitch;
