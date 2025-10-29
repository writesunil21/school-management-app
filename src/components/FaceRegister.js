import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function RegisterFace() {
  const webcamRef = useRef(null);
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");

  const captureAndSend = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then(res => res.blob());

    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("image", blob, "face.jpg");

    const response = await fetch("http://localhost:8090/api/faces/register", {
      method: "POST",
      body: formData,
    });

    const result = await response.text();
    setMessage(result);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Enter Student ID"
        className="border p-2 mb-2"
      />
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
        className="mb-2"
      />
      <button
        onClick={captureAndSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register Face
      </button>
      <div className="mt-4 text-green-600">{message}</div>
    </div>
  );
}

export default RegisterFace;
