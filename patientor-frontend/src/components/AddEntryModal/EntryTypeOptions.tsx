import { Diagnosis, NewEntry, EntryType } from '../../types';

export interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[]
}

export interface EntryOptions {
  value: EntryType;
  label: string;
}

export const entryOptions: EntryOptions[] = Object.values(EntryType).map(
  v => ({
    value: v,
    label: v.toString()
  })
);

export const ratingOptions = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low Risk' },
  { value: 2, label: 'High Risk' },
  { value: 3, label: 'Critical Risk' }
];
