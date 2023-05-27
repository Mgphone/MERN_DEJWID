import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("context", content);
    data.set("file", files[0]);
    e.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
    });
    console.log(await response.json());
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
};
export default CreatePost;
