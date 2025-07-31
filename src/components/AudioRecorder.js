import { useState, useRef } from "react";

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        try {
          const response = await fetch("http://localhost:8090/api/speech/transcribe", {
            method: "POST",
            body: formData,
          });

          const contentType = response.headers.get("content-type");

          if (!response.ok) {
            const errorText = await response.text();
            setError("Server Error: " + errorText);
            setText("");
            return;
          }

          if (contentType && contentType.includes("application/json")) {
            const result = await response.json();
            setText(result.text || "No text found.");
            setError("");
          } else {
            const resultText = await response.text();
            setText(resultText || "No text found.");
            setError("");
          }
        } catch (err) {
          setError("Request failed: " + err.message);
          setText("");
        }
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setText("");
      setError("");
    } catch (err) {
      setError("Microphone access denied or not available.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-2 rounded-xl font-semibold shadow-md text-white transition duration-300 ${
          recording ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Transcript:</h3>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-md bg-gray-50 text-gray-800"
          rows={6}
          value={text}
          readOnly
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default AudioRecorder;
