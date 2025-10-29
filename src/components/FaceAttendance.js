import React, { useRef, useState } from 'react';

function FaceAttendance() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [message, setMessage] = useState("");

  const startCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    setStream(mediaStream);
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
    }
    setCaptured(false);
    setMessage("");
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    stopCamera(); // ✅ Stop the camera after capturing
    setCaptured(true);
  };

  const submitAttendance = async () => {
    canvasRef.current.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'attendance.jpg');

      const res = await fetch("http://localhost:8090/api/face/attendance/mark", {
        method: 'POST',
        body: formData
      });

      const result = await res.text();
      setMessage(`Server Response: ${result}`);
    }, 'image/jpeg');
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Face Attendance</h2>

      {!captured && (
        <>
          <video ref={videoRef} className="w-full rounded" autoPlay />
          <button onClick={startCamera} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2">Start Camera</button>
          <button onClick={captureImage} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Capture</button>
        </>
      )}

      {captured && (
        <>
          <canvas ref={canvasRef} className="w-full rounded border" />
          <button onClick={submitAttendance} className="bg-purple-500 text-white px-4 py-2 rounded mt-4">Submit Attendance</button>
        </>
      )}

      {message && (
        <p className="mt-4 text-green-600 text-center">{message}</p>
      )}
    </div>
  );
}

export default FaceAttendance;
