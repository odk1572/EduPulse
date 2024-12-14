import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };

  return (
    <div className="mx-auto max-w-5xl p-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-black shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">
        Edit Your Content
      </h2>
      <ReactQuill
        theme="snow"
        value={input.description}
        onChange={handleChange}
        className="custom-quill bg-white border-2 border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:outline-none p-4"
        placeholder="Start writing your content here..."
      />
    </div>
  );
};

export default RichTextEditor;
