import { supabase } from "../lib/supabase";

export const careerService = {
  async getActiveJobs() {
    const { data, error } = await supabase
      .from("job_openings")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching job openings:", error);
      throw error;
    }
    return data;
  }
};
