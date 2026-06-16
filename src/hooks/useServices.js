import { useState, useEffect, useCallback } from "react";
import { serviceService } from "../services/serviceService";

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceService.getAllServices();
      setServices(data);
    } catch (err) {
      setError(err.message || "Failed to fetch services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}
