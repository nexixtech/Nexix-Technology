import { supabase } from "../lib/supabase";

export const blogService = {
  async getPublishedPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching published blog posts:", error);
      throw error;
    }
    return data;
  }
};
