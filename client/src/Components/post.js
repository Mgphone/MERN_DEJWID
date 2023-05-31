import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  updatedAt,
  author,
}) {
  let filepath = cover.replace(/\\/g, "/");
  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
        <div className="image">
          <img src={"http://localhost:4000/" + filepath} alt="foto of " />
        </div>
      </Link>

      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <ab className="author">{author.username}</ab>
          <time>{format(new Date(updatedAt), "d MMM, yyy HH:mm:ss")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
