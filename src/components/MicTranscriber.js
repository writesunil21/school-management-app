import { useState, useRef } from "react";

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
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
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch("http://localhost:5001/transcribe", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setText(result.text);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 text-white ${recording ? "bg-red-600" : "bg-green-600"}`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      <div className="mt-4">
        <h3 className="text-md font-bold mb-1">Transcript:</h3>
        <textarea className="w-full border p-2" rows={6} value={text} readOnly />
      </div>
    </div>
  );
}

export default AudioRecorder;
