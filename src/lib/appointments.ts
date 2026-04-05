import { supabase } from "@/integrations/supabase/client";

export interface AppointmentFormValues {
  name: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

const WHATSAPP_NUMBER = "919709703638";

export const openWhatsApp = ({ name, phone, service, date, message }: AppointmentFormValues) => {
  const text = `New Appointment Booking:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nMessage: ${message || "N/A"}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
};

export const submitAppointment = async ({
  name,
  phone,
  service,
  date,
  message,
}: AppointmentFormValues) => {
  const payload = {
    name: name.trim(),
    phone: phone.trim(),
    service,
    preferred_date: date,
    message: message.trim() || null,
  };

  try {
    const response = await supabase
      .from("appointments")
      .insert([payload])
      .select()
      .single();
    console.log("Data inserted", response);
    return response;
  } catch (err) {
    console.warn("DB save failed, continuing to WhatsApp", err);
    return { data: null, error: err };
  }
};