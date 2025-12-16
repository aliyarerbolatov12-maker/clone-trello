export const CompletedSelect = {
  All: "All",
  Done: true,
  NotDone: false,
} as const;

export const completedOptions = [
  { label: "All", value: CompletedSelect.All },
  { label: "Done", value: CompletedSelect.Done },
  { label: "Not done", value: CompletedSelect.NotDone },
];

export type CompletedValueSelect =
  (typeof CompletedSelect)[keyof typeof CompletedSelect];
