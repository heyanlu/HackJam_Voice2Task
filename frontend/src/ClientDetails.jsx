import { useState } from "react";

import {
  Button,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const clientDetails = ["name", "phone"];

function ClientDetails({
  clientData,
  onFetchGetClient,
  onFetchSummaryList,
  error,
}) {
  const [localClientData, setLocalClientData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalClientData({
      ...localClientData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // send the client data object to backend for query
    onFetchGetClient(localClientData);
    onFetchSummaryList(localClientData);

    // Clear form at submit
    setLocalClientData({
      name: "",
      phone: "",
    });
  };

  return (
    <>
      <Typography variant="h6" p={1} sx={{ textAlign: "center" }}>
        Query Client
      </Typography>
      <Box height={250} mt={2}>
        {error ? (
          <p style={{ marginLeft: "1rem" }}>{error}</p>
        ) : (
          Object.entries(clientData).map(([label, item]) => (
            <ListItem key={label}>
              <ListItemText primary={`${label}: ${item}`} />
            </ListItem>
          ))
        )}
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          {clientDetails.map((detail) => (
            <Box
              mb={2}
              pl={2}
              pr={2}
              sx={{ display: "flex", flexDirection: "column" }}
              key={detail}
            >
              <TextField
                type="text"
                name={detail}
                id={detail}
                label={detail}
                value={localClientData[detail]}
                onChange={handleChange}
              ></TextField>
            </Box>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#3FA7D6" }}
            >
              Query
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

export default ClientDetails;
