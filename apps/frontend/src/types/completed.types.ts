export type CompletedSelectProps<T> = {
  value: T;
  onChange: (value: T) => void;
  options: { label: string; value: T }[];
};
