import { id } from "date-fns/locale";
import Post from "../Components/post";
import { useEffect, useState } from "react";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={index} {...post} />)}
    </>
  );
}
