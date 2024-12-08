const API_BASE_URL = "http://localhost:3000"; // To update at production

function chainPromise(promise) {
  return promise
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

// Store audio file to S3
export function storeAudioToS3(blob, file) {
  const formData = new FormData();
  formData.append("audioFile", blob, file);
  
  const fetched = fetch(`${API_BASE_URL}/api/store-audio-file`, {
    method: "POST",
    body: formData,
  });

  return chainPromise(fetched);
}

// Convert audio to text: start transcription. But this only starts, we don't know when it ends
export function transcribeAudioToText(audioFileName) {
  const fetched = fetch(`${API_BASE_URL}/api/transcribe-audio-file`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ audioFileName }),
  });
  return chainPromise(fetched);
}

// Get transcription status. But api will let us know when the transcription is finished
export function fetchTranscriptionStatus(jobName) {
  const fetched = fetch(`${API_BASE_URL}/api/transcription-status`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ jobName }),
  });
  return chainPromise(fetched);
}

// Get summary
export function fetchSummary(fileName) {
  //   const fetched = fetch(`${API_BASE_URL}/api/get-summary`);
  //   return chainPromise(fetched);

  const url = new URL(`${API_BASE_URL}/api/get-summary`);
  url.searchParams.append("fileName", fileName);

  const fetched = fetch(url);
  return chainPromise(fetched);
}

// DB operations
export function fetchGetClient(clientObj) {
  const fetched = fetch(`${API_BASE_URL}/api/get-client`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(clientObj),
  });
  return chainPromise(fetched);
}

export function fetchCreateClient(clientObj) {
  const fetched = fetch(`${API_BASE_URL}/api/create-client`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(clientObj),
  });
  return chainPromise(fetched);
}

export function fetchStoreSummary(clientObj) {
  const fetched = fetch(`${API_BASE_URL}/api/store-summary`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(clientObj),
  });
  return chainPromise(fetched);
}

export function fetchGetSummaryList(clientObj) {
  const fetched = fetch(`${API_BASE_URL}/api/get-summary-list`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(clientObj),
  });
  return chainPromise(fetched);
}
