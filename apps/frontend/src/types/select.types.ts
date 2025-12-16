export type SelectOption<T> = {
  value: T;
  label: string;
};

export type SelectProps<T> = {
  value?: T;
  defaultValue: T;
  options: SelectOption<T>[];
  title: string;
  onChange: (value: T) => void;
};
