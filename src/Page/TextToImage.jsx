import React, { useState } from "react";
import { motion } from "framer-motion";

const TextToImage = () => {
  const [prompt, setPrompt] = useState("nebulas in all directions");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImage(null);

    const API_KEY = import.meta.env.VITE_NEBIUS_API_KEY;

    try {
      const response = await fetch("https://api.studio.nebius.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "black-forest-labs/flux-schnell",
          response_format: "b64_json",
          response_extension: "png",
          width: 1024,
          height: 1024,
          num_inference_steps: 4,
          negative_prompt: "",
          seed: -1,
          loras: null,
          prompt,
        }),
      });

      const data = await response.json();
      const b64 = data?.data?.[0]?.b64_json;
      if (b64) {
        const imgSrc = `data:image/png;base64,${b64}`;
        setImage(imgSrc);
        setGallery((prev) => [imgSrc, ...prev.slice(0, 5)]); // last 6
      } else {
        console.error("No image returned:", data);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10 px-4 my-14">
      <div className="max-w-xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-yellow-400 mb-6"
        >
          <span className="text-white">AI – Text to</span> Image Generator
        </motion.h1>

        <input
          className="w-full p-3 rounded-md border border-yellow-400 bg-transparent text-yellow-200 focus:outline-none focus:ring focus:ring-yellow-500"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your imagination..."
        />

        <button
          onClick={generateImage}
          className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition duration-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 shadow-lg"
          >
            <img src={image} alt="Generated" className="rounded-xl w-full" />
          </motion.div>
        )}
      </div>

      {/* 🎨 Gallery Section */}
      {gallery.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl text-yellow-300 font-semibold mb-4 text-center">
            🖼️ Gallery (Last {gallery.length} Images)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`Generated ${idx}`}
                className="rounded-lg shadow-md hover:scale-105 transition duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToImage;
