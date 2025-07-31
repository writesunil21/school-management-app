import React, { useState } from "react";

const OcrConverter = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setText("");
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8090/api/ocr/extract", {
        method: "POST",
        body: formData,
      });

      const data = await response.text();
      if (response.ok) {
        setText(data);
      } else {
        setText("Error: " + data.error);
      }
    } catch (error) {
      setText("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 600, margin: "auto" }}>
      <h2>🖼️ OCR Image to Text</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <br /><br />
      <button
  onClick={handleUpload}
  disabled={loading}
  className={`px-6 py-2 rounded-2xl font-semibold text-white transition-all duration-300 shadow-md 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"}`}
>
  {loading ? (
    <span className="flex items-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"
        />
      </svg>
      Extracting...
    </span>
  ) : (
    "Upload & Extract Text"
  )}
</button>


      <br /><br />
      {image && (
        <div>
          <h4>Preview:</h4>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

      <br />
      {text && (
        <div>
          <h4>📝 Extracted Text:</h4>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
};

export default OcrConverter;
