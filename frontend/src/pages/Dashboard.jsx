import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const res = await API.get("/api/links");
      setLinks(res.data);
    } catch (err) {
      console.error("Error fetching links:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (links.length === 0)
    return <p>No links created yet. <Link to="/create">Create one</Link></p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Tiny Links</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Code</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Created</th>
            <th>Visit</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link) => (
            <tr key={link.code}>
              <td>
                <Link to={`/link/${link.code}`}>{link.code}</Link>
              </td>
              <td>{link.targetUrl}</td>
              <td>{link.clicks}</td>
              <td>{new Date(link.createdAt).toLocaleString()}</td>
              <td>
                <a href={`${link.targetUrl}`} target="_blank">Open</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
