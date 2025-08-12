"use client";
import { useState } from "react";

export default function Page() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    alert("上传成功");
  };

  return (
    <div className="p-4 space-y-4">
      <input type="file" accept="image/*" onChange={handleChange} />
      {previewUrl && <img src={previewUrl} alt="preview" className="w-40" />}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        上传
      </button>
    </div>
  );
}
