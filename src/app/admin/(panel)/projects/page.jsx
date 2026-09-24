"use client";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEye, FiEyeOff, FiEdit3, FiExternalLink, FiSearch, FiMonitor } from "react-icons/fi";

const CATEGORIES = [
  "Healthcare Informatics",
  "Institutional Systems",
  "Enterprise Web Application",
  "Systems & Telemetry",
  "Digital Growth & E-Commerce",
  "Infrastructure & Networking"
];

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "Healthcare Informatics",
  tech: "",
  client: "",
  month: "September",
  year: "2026",
  services: "",
  image_url: "/photo/about.webp",
  link: "https://github.com/MarkTechKe-design",
  sort_order: 1,
  visible: true,
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects?all=true");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        setFiltered(data);
      }
    } catch (err) {
      console.error("Failed loading projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(projects);
    } else {
      const q = search.toLowerCase();
      setFiltered(
        projects.filter(
          (p) =>
            p.title?.toLowerCase().includes(q) ||
            p.category?.toLowerCase().includes(q) ||
            p.tech?.toLowerCase().includes(q)
        )
      );
    }
  }, [search, projects]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title || "",
      description: p.description || p.tagline || "",
      category: p.category || "Healthcare Informatics",
      tech: p.tech || (Array.isArray(p.tags) ? p.tags.join(", ") : ""),
      client: p.client || "",
      month: p.month || "September",
      year: p.year || "2026",
      services: p.services || "",
      image_url: p.image_url || "/photo/about.webp",
      link: p.link || p.live_url || "",
      sort_order: p.sort_order || 1,
      visible: p.visible !== false,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        // Update
        const res = await fetch("/api/projects", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form }),
        });
        if (res.ok) {
          setShowModal(false);
          fetchProjects();
        }
      } else {
        // Create
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setShowModal(false);
          fetchProjects();
        }
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (p) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, visible: !p.visible }),
      });
      if (res.ok) {
        setProjects(projects.map((x) => (x.id === p.id ? { ...x, visible: !x.visible } : x)));
      }
    } catch (err) {
      console.error("Toggle visibility error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this system architecture entry?")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
            Systems & Platforms Registry
          </h1>
          <p className="text-xs text-white/40 font-mono mt-1">
            {projects.length} registered platforms · Live database synchronization
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-[#ff6b1a] hover:bg-[#ff8c42] text-black text-xs font-bold font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-2 w-fit shadow-lg shadow-orange-500/10"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New System / Platform</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 max-w-md">
        <FiSearch className="w-4 h-4 text-white/40 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by title, category, or stack..."
          className="bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none w-full font-mono"
        />
        {search && (
          <button onClick={() => setSearch("")} className="text-white/40 hover:text-white text-xs font-mono">
            Clear
          </button>
        )}
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-white/40">
          Loading platform registry...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-xs font-mono text-white/30 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3">
          <FiMonitor className="w-8 h-8 text-white/20" />
          <p>No systems found matching the query.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((p, idx) => (
            <div
              key={p.id || idx}
              className="bg-[#111] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-[#ff6b1a]/10 text-[#ff6b1a] border border-[#ff6b1a]/20">
                    {p.category}
                  </span>
                  <span className="text-xs font-mono text-white/30">Order: #{p.sort_order}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      p.visible ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-white/5 text-white/40"
                    }`}
                  >
                    {p.visible ? "Publicly Live" : "Draft / Hidden"}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {p.title}
                </h3>

                <p className="text-xs text-white/60 font-light leading-relaxed">
                  {p.description || p.tagline}
                </p>

                <p className="text-[11px] font-mono text-white/40">
                  <span className="text-white/60">Tech:</span> {p.tech || (Array.isArray(p.tags) ? p.tags.join(" · ") : "Standard Stack")}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(p)}
                  title={p.visible ? "Hide from portfolio" : "Publish to portfolio"}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  {p.visible ? <FiEye className="w-4 h-4 text-emerald-400" /> : <FiEyeOff className="w-4 h-4 text-white/30" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(p)}
                  title="Edit System Parameters"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-[#ff6b1a] transition-colors"
                >
                  <FiEdit3 className="w-4 h-4" />
                </button>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Live / Code Repository"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  title="Delete Entry"
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors ml-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add / Edit System */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-lg font-bold text-white font-mono">
                {editingId ? "Edit System Architecture" : "Register New Platform / Architecture"}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-white/40 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/50 uppercase tracking-wider text-[10px]">Platform Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MarkCare HMS Core"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/50 uppercase tracking-wider text-[10px]">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-black">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/50 uppercase tracking-wider text-[10px]">System Scope & Tagline</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe architectural challenges, multi-tenancy, transactional scope..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 uppercase tracking-wider text-[10px]">Technical Stack (Comma-Separated)</label>
                <input
                  type="text"
                  required
                  placeholder="Next.js 15, TypeScript, Laravel, PostgreSQL"
                  value={form.tech}
                  onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/50 uppercase tracking-wider text-[10px]">Target Audience / Client</label>
                  <input
                    type="text"
                    placeholder="e.g. Healthcare Networks"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/50 uppercase tracking-wider text-[10px]">Live Demo or Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/MarkTechKe-design/repo"
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/50 uppercase tracking-wider text-[10px]">Display Sort Order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                  />
                </div>

                <div className="space-y-1 flex flex-col justify-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer text-white/80">
                    <input
                      type="checkbox"
                      checked={form.visible}
                      onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                      className="accent-[#ff6b1a] w-4 h-4"
                    />
                    <span>Visible on Live Portfolio</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-1/2 py-3 rounded-xl bg-[#ff6b1a] text-black font-bold uppercase tracking-wider hover:bg-[#ff8c42] disabled:opacity-50"
                >
                  {saving ? "Synchronizing..." : editingId ? "Save Changes" : "Publish to Registry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}