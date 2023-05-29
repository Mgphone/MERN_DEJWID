import { format } from "date-fns";
export default function Post({
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
      <div className="image">
        <img src={"http://localhost:4000/" + filepath} alt="foto of " />
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(updatedAt), "d MMM, yyy HH:mm:ss")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
