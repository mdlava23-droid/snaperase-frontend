import { useState } from "react";
import axios from "axios";

export default function UploadCard({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      formData
    );

    onResult(res.data);
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={upload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Upload & Remove BG"}
      </button>
    </div>
  );
}
