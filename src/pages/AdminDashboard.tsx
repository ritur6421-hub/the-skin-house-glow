import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Users, MessageSquare, CalendarCheck } from "lucide-react";
import { toast } from "sonner";

type Signup = { id: string; name: string; email: string; phone: string; created_at: string };
type Contact = { id: string; name: string; phone: string; message: string; created_at: string };
type Appointment = { id: string; name: string; phone: string; service: string; preferred_date: string; message: string | null; created_at: string };

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signups" | "contacts" | "appointments">("appointments");
  const [signups, setSignups] = useState<Signup[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      await fetchData();
    };
    checkAdmin();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const [s, c, a] = await Promise.all([
      supabase.from("signups").select("*").order("created_at", { ascending: false }),
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("appointments").select("*").order("created_at", { ascending: false }),
    ]);
    if (s.data) setSignups(s.data);
    if (c.data) setContacts(c.data);
    if (a.data) setAppointments(a.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/admin");
  };

  const tabs = [
    { key: "appointments" as const, label: "Appointments", icon: CalendarCheck, count: appointments.length },
    { key: "signups" as const, label: "Users", icon: Users, count: signups.length },
    { key: "contacts" as const, label: "Messages", icon: MessageSquare, count: contacts.length },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">The Skin House — Management Panel</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${tab === t.key ? "gold-gradient text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
              <t.icon size={16} />
              {t.label}
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${tab === t.key ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading data...</div>
        ) : (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              {tab === "appointments" && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-semibold text-foreground">Name</th>
                      <th className="text-left p-4 font-semibold text-foreground">Phone</th>
                      <th className="text-left p-4 font-semibold text-foreground">Service</th>
                      <th className="text-left p-4 font-semibold text-foreground">Date</th>
                      <th className="text-left p-4 font-semibold text-foreground">Message</th>
                      <th className="text-left p-4 font-semibold text-foreground">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No appointments yet</td></tr>
                    ) : appointments.map((a) => (
                      <tr key={a.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-foreground font-medium">{a.name}</td>
                        <td className="p-4 text-muted-foreground">{a.phone}</td>
                        <td className="p-4"><span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">{a.service}</span></td>
                        <td className="p-4 text-muted-foreground">{a.preferred_date}</td>
                        <td className="p-4 text-muted-foreground max-w-[200px] truncate">{a.message || "—"}</td>
                        <td className="p-4 text-muted-foreground text-xs">{new Date(a.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === "signups" && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-semibold text-foreground">Name</th>
                      <th className="text-left p-4 font-semibold text-foreground">Email</th>
                      <th className="text-left p-4 font-semibold text-foreground">Phone</th>
                      <th className="text-left p-4 font-semibold text-foreground">Signed Up</th>
                    </tr>
                  </thead>
                  <tbody>
                    {signups.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No signups yet</td></tr>
                    ) : signups.map((s) => (
                      <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-foreground font-medium">{s.name}</td>
                        <td className="p-4 text-muted-foreground">{s.email}</td>
                        <td className="p-4 text-muted-foreground">{s.phone}</td>
                        <td className="p-4 text-muted-foreground text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === "contacts" && (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-semibold text-foreground">Name</th>
                      <th className="text-left p-4 font-semibold text-foreground">Phone</th>
                      <th className="text-left p-4 font-semibold text-foreground">Message</th>
                      <th className="text-left p-4 font-semibold text-foreground">Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No messages yet</td></tr>
                    ) : contacts.map((c) => (
                      <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-foreground font-medium">{c.name}</td>
                        <td className="p-4 text-muted-foreground">{c.phone}</td>
                        <td className="p-4 text-muted-foreground max-w-[300px]">{c.message}</td>
                        <td className="p-4 text-muted-foreground text-xs">{new Date(c.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
