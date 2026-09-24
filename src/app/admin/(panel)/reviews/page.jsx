"use client";
import { useEffect, useState } from "react";

function StarRating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-1 text-[#ff6b1a]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "fill-current" : "text-white/10 fill-current"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ author: "", role: "", company: "", content: "", rating: 5 });

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowAddModal(false);
        setForm({ author: "", role: "", company: "", content: "", rating: 5 });
        fetchReviews();
      }
    } catch (err) {
      console.error("Error creating review:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this endorsement?")) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Recent Verification";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "Recent Verification" : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight font-mono">
            Client & Peer Endorsements
          </h1>
          <p className="text-xs text-white/40 font-mono mt-1">
            {reviews.length} total endorsements active on live portfolio
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#ff6b1a] hover:bg-[#ff8c42] text-black text-xs font-bold font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-2 w-fit"
        >
          <span>+</span> Add New Review
        </button>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-white/40">
          Loading endorsements...
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-20 text-center text-xs font-mono text-white/30 border border-dashed border-white/10 rounded-2xl">
          No endorsements registered yet.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r, idx) => (
            <div
              key={r.id || idx}
              className="bg-[#111] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-colors space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {r.author || r.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Live
                    </span>
                  </div>
                  <p className="text-xs text-white/50 font-mono">
                    {r.role} <span className="text-white/20 mx-1.5">•</span> <span className="text-[#ff6b1a]">{r.company}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <StarRating rating={r.rating || 5} />
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    className="text-xs font-mono text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm text-white/70 font-light leading-relaxed italic">
                &ldquo;{r.content}&rdquo;
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/30">
                <span>{formatDate(r.created_at)}</span>
                <span>ID: {r.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add New Endorsement */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white font-mono">Add Client Endorsement</h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-white/40 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-white/50 uppercase tracking-wider text-[10px]">Author / Signatory</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kennedy Onjiro"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/50 uppercase tracking-wider text-[10px]">Role / Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Managing Director"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/50 uppercase tracking-wider text-[10px]">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Enterprise Client"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/50 uppercase tracking-wider text-[10px]">Endorsement Feedback</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the recommendation or feedback statement..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/50 uppercase tracking-wider text-[10px]">Rating (1 to 5 Stars)</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#ff6b1a]"
                >
                  <option value={5} className="bg-black">5 Stars (Exceptional)</option>
                  <option value={4} className="bg-black">4 Stars (Great)</option>
                  <option value={3} className="bg-black">3 Stars (Standard)</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#ff6b1a] text-black font-bold uppercase tracking-wider hover:bg-[#ff8c42]"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}