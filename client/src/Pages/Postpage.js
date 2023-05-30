import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
export default function PostPage() {
  const [posts, setPosts] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, [id]);

  if (!posts) return "";

  return (
    <div className="post-page">
      <h1>{posts.title}</h1>
      <time>
        {format(new Date(posts.updatedAt), "d MMM, yyy HH:mm:ss")}
      </time>{" "}
      <div className="author">by @{posts.author.username}</div>
      <div className="image">
        <img src={`http://localhost:4000/${posts.cover}`} alt="foto of" />
      </div>
      <div
        classname="content"
        dangerouslySetInnerHTML={{ __html: posts.content }}
      />
    </div>
  );
}
