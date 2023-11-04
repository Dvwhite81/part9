import axios from 'axios';
import { useState } from "react";
import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";
import patientService from "../../services/patients";

interface Props {
  patients : Patient[]
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients } : Props ) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
      setSuccess(`Added a new patient: ${patient.name}!`);
      setTimeout(() => {
        setSuccess(undefined);
      }, 5000);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <Button component={Link} to='/' variant='contained' color='primary'>
        Home
      </Button>
      <Button className='add-button' variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
      <Box>
      {success && <Alert severity="success">{success}</Alert>}
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>Patient: {patient.averageRating}</TableCell>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={true} rating={patient.averageRating} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientListPage;
