import { useState, useEffect, useCallback } from "react";
import { blogService } from "../services/blogService";

export function useBlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogService.getPublishedPosts();
      setPosts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchPosts();
    });
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}
