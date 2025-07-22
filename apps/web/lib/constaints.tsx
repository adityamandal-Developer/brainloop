import {
  Atom,
  Brain,
  ChartNoAxesCombined,
  Code,
  SquarePi,
  Workflow,
} from "lucide-react";

export const AI_MODELS = [
  "Auto",
  "Think Longer",
  "Reasoning",
  "Maths",
  "code",
  "Analytics",
];

export const MODEL_ICONS: Record<string, React.ReactNode> = {
  "Think Longer": <Brain />,
  Reasoning: <Atom />,
  Maths: <SquarePi />,
  code: <Code />,
  Analytics: <ChartNoAxesCombined />,
  Auto: <Workflow />,
};
