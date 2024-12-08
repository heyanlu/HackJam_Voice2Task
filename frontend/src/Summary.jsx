import { useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";

const clientDetails = ["name", "phone"];

function Summary({ summary, audioUrl, clientData, onFetchStoreSummary, message }) {
  const [localClientData, setLocalClientData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // onFetchStoreSummary() will handle both finding an existing client or creating a new client
    // All it needs is {clientName, clientPhone}, so here we just need to send clientName and clientPhone.
    // If a query has been launched and the client is found, clientData state will contain its info
    // All this is to save the caller some time and effort.

    const clientName = clientData.name;
    const clientPhone = clientData.phone;
    if (clientName && clientPhone) {
      const updatedClientData = {
        ...clientData,
        summary_text: summary,
        url: audioUrl,
      };
      console.log(updatedClientData);
      onFetchStoreSummary(updatedClientData);
      return;
    }

    // Otherwise, clientData is {}. We use localClientData here.
    const updatedLocalClientData = {
      ...localClientData,
      summary_text: summary,
      url: audioUrl, 
    };
    onFetchStoreSummary(updatedLocalClientData);

    // TODO: Add validation that forbids empty strings
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {clientDetails.map((detail) => (
          <TextField
            key={detail}
            id={`client-${detail}`}
            placeholder={`Client ${detail}`}
            variant="standard"
            name={detail}
            value={clientData[detail]}
            onChange={handleChange}
            sx={{ marginRight: 2 }}
          />
        ))}
        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
      <Box mt={2}>
        <p>{summary}</p>
      </Box>
      <Paper elevation={message ? 2 : 0} sx={{ margin: 2, padding: 1 }}>
        {message}
      </Paper>
    </>
  );
}

export default Summary;
