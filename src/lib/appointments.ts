import { supabase } from "@/integrations/supabase/client";

export interface AppointmentFormValues {
  name: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

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

  console.log(
    payload.name,
    payload.phone,
    payload.service,
    payload.preferred_date,
    payload.message,
  );

  const response = await supabase
    .from("appointments")
    .insert([payload])
    .select()
    .single();

  console.log("Data inserted", response);

  return response;
};