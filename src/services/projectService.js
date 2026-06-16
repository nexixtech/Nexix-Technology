import { supabase } from "../lib/supabase";

export const projectService = {
  async getAllProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    
    if (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
    return data;
  }
};
