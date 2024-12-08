import AudioRecorder from "./AudioRecorder";

import { List, ListItem, ListItemText, Box } from "@mui/material";

const listItems = [
  "Verify first name, last name",
  "Verify phone and email",
  "Verify date and time",
  "Verify any quantity",
];

function Conversation({
  fileName,
  summarizePhoneCall,
  dispatch,
  loadingStatus,
}) {
  return (
    <div>
      <Box sx={{ width: "100%", height: 300 }}>
        <List>
          {listItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText>{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <AudioRecorder
        dispatch={dispatch}
        fileName={fileName}
        summarizePhoneCall={summarizePhoneCall}
        loadingStatus={loadingStatus}
      />
    </div>
  );
}

export default Conversation;
