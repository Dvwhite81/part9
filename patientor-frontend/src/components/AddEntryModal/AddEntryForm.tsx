import { useState, SyntheticEvent } from 'react';
import { TextField, Grid, Button, InputLabel, Input, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Props, entryOptions, ratingOptions } from './EntryTypeOptions';
import { EntryType, HealthCheckRating } from '../../types';

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const typeFields = (type: EntryType) => {
    switch (type) {
      case 'Hospital':
        return (
          <div>
            <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
            <Input
              type='date'
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label='Discharge Criteria'
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </div>
        );

      case 'OccupationalHealthcare':
        return (
          <div>
            <TextField
              label='Employer'
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave Start Date</InputLabel>
            <Input
              type='date'
              name='startDate'
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave End Date</InputLabel>
            <Input
              type='date'
              name='endDate'
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </div>
        );

      case 'HealthCheck':
        return (
          <div>
            <InputLabel style={{ marginTop: 20 }}>HealthCheck Rating</InputLabel>
            <Select
              label='HealthCheck Rating'
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            >
              {ratingOptions.map(option =>
                <MenuItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              )}
            </Select>
          </div>
        );
    }
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(EntryType).find(v => v.toString() === value);

      if (type) {
        setType(type);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case 'Hospital':
        const discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria
        };
        onSubmit({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge
        });
        break;

      case 'OccupationalHealthcare':
        const sickLeave = {
          startDate,
          endDate
        };
        onSubmit({
          type,
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          sickLeave
        });
        break;

      case 'HealthCheck':
        onSubmit({
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating,
          type: 'HealthCheck'
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
        <Select
          label='Entry Type'
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {entryOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          )}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField
          label='Any details about the entry...'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          type='date'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField
          label='Diagnosis made by...'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(
            typeof target.value === 'string'
              ? target.value.split(',')
              : target.value
          )}
        >
          {diagnoses.map(d =>
            <MenuItem
              key={d.code}
              value={d.code}
            >
              {d.code} {d.name}
            </MenuItem>
          )}
        </Select>
        {typeFields(type)}
        <Grid>
          <Grid item>
            <Button
              color='secondary'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
