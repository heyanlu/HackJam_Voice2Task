import { useRef, useState } from "react";

import { ACTIONS } from "./constants";

import { PhoneDisabled, PhoneForwarded } from "@mui/icons-material";
import { Box, Button, Paper, Stack } from "@mui/material";

const AudioRecorder = ({
  fileName,
  summarizePhoneCall,
  dispatch,
  loadingStatus,
}) => {
  const currentFileName = useRef(fileName);

  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const newFileName = `phone-audio-${Date.now()}.mp3`;
      currentFileName.current = newFileName;
      dispatch({ type: ACTIONS.SET_FILE_NAME, payload: newFileName });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/mp3" });

        // Extract metadata
        const durationInSeconds = Math.ceil(
          chunks.current.reduce((acc, chunk) => acc + chunk.duration, 0)
        );
        recordedBlob.duration = durationInSeconds;

        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];

        // Trigger the entire summary logic
        summarizePhoneCall(recordedBlob, currentFileName.current);
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper elevation={loadingStatus? 2 : 0} sx={{ margin: 2, padding: 1 }}>
        {loadingStatus}
      </Paper>
      <audio controls src={recordedUrl} />
      <Stack direction={"row"} spacing={2} mt={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#EE6352" }}
          onClick={stopRecording}
        >
          <PhoneDisabled />
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#59CD90" }}
          onClick={startRecording}
        >
          <PhoneForwarded />
        </Button>
      </Stack>
    </Box>
  );
};

export default AudioRecorder;
