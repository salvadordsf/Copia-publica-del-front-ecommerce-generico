interface ActionStepCounterProps {
  step: number;
  stepCount: number;
}

export default function ActionStepCounter({
  step,
  stepCount,
}: ActionStepCounterProps) {
  return (
    <div className="mr-5 mt-1 text-sm text-neutral-400">
      Paso {step - 1} / {stepCount}
    </div>
  );
}
