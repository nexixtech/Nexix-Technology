import { supabase } from "../lib/supabase";

export const serviceService = {
  async getAllServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    
    if (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
    return data;
  }
};
