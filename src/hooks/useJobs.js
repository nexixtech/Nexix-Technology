import { useState, useEffect, useCallback } from "react";
import { careerService } from "../services/careerService";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await careerService.getActiveJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message || "Failed to fetch job openings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchJobs();
    });
  }, [fetchJobs]);

  return { jobs, loading, error, refetch: fetchJobs };
}
