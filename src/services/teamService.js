import { supabase } from "../lib/supabase";

export const teamService = {
  async getTeamMembers() {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }

    return data;
  }
};
