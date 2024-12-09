import { useState, useEffect } from "react";

export const useStateGraph = (steps) => {
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const [comps, setComps] = useState([]);

  useEffect(() => {
    if (steps.length > 0 && !play) {
      setComps(steps.filter((s) => s.type === "component").map((s) => s.scc));
    }
  }, [steps, play]);

  const next = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setStep((prev) => Math.max(prev - 1, 0));
  const togglePlay = () => setPlay(!play);
  const restart = () => {
    setStep(0);
    setPlay(false);
    setComps([]);
  };

  return { step, play, comps, next, prev, togglePlay, restart };
};
