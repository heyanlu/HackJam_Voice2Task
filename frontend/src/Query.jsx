import { useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { VolumeUp } from "@mui/icons-material";

function Query({ allSummaries, clientData, onFetchSummaryList, error }) {
  useEffect(() => {
    if (clientData.length > 0) {
      onFetchSummaryList(clientData);
    }
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (allSummaries.length === 0) {
    return <p>No summary is found.</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  return (
    <List>
      {allSummaries
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((listObj, index) => {
          const formattedDate = formatDate(listObj.created_at);
          return (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" component="span">
                      {formattedDate}
                    </Typography>
                    <a
                      href={listObj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <VolumeUp sx={{ color: "#3FA7D6" }} />
                    </a>
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body1" component="span">
                      {listObj.summary_text}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          );
        })}
    </List>
  );
}

export default Query;
