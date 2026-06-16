import { supabase } from "../lib/supabase";

export const contactService = {
  async submitForm({ name, email, phone, subject, message }) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          subject,
          message
        }
      ])
      .select();

    if (error) {
      console.error("Error inserting contact submission:", error);
      throw error;
    }
    return data;
  }
};
