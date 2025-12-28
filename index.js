import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div>
      <Navbar />

      <main className="text-center p-4">
        <h1 className="text-2xl font-bold mb-4">
          Snaperase — Background Remover
        </h1>

        <UploadCard onResult={setResult} />

        {result && (
          <div className="mt-6">
            <h3 className="font-semibold">Result</h3>
            <img
              src={result.output_url}
              alt="Result"
              className="mx-auto max-w-xs"
            />

            <a
              href={result.output_url}
              download
              className="block bg-green-600 text-white p-2 rounded mt-2"
            >
              Download
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
