import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .as-page {
    min-height: 100vh;
    background: #f0ebe3;
    font-family: 'Outfit', sans-serif;
  }

  .as-topbar {
    background: #1a1a2e;
    padding: 18px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 16px rgba(0,0,0,0.18);
  }

  .as-topbar-left {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .as-back-btn {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: #fff;
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 13px;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 0.2s;
  }
  .as-back-btn:hover { background: rgba(255,255,255,0.14); }
  .as-back-btn svg { width: 15px; height: 15px; }

  .as-topbar-title {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
  }
  .as-topbar-title span { color: #c8973a; }

  .as-admin-badge {
    background: rgba(200,151,58,0.18);
    border: 1px solid rgba(200,151,58,0.35);
    color: #e8c06a;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 14px;
    border-radius: 20px;
    letter-spacing: 0.06em;
  }

  .as-content {
    padding: 36px;
    max-width: 1300px;
    margin: 0 auto;
  }

  .as-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 14px;
  }

  .as-info h2 {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a2e;
  }

  .as-info p {
    font-size: 13px;
    color: #999;
    margin-top: 3px;
  }

  .as-count-pill {
    display: inline-block;
    background: #c8973a;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 2px 11px;
    border-radius: 20px;
    margin-left: 10px;
    vertical-align: middle;
  }

  .as-search-wrap {
    position: relative;
  }
  .as-search-wrap svg {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    width: 15px;
    height: 15px;
    color: #aaa;
    pointer-events: none;
  }
  .as-search {
    padding: 10px 16px 10px 38px;
    border-radius: 30px;
    border: 1.5px solid #ddd;
    font-size: 13px;
    font-family: 'Outfit', sans-serif;
    outline: none;
    width: 280px;
    background: #fff;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .as-search:focus {
    border-color: #c8973a;
    box-shadow: 0 0 0 3px rgba(200,151,58,0.10);
  }

  .as-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 22px;
  }

  .as-card {
    background: #fff;
    border-radius: 18px;
    padding: 26px 22px 20px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.07);
    border: 1px solid #ece9e3;
    transition: transform 0.22s, box-shadow 0.22s;
    position: relative;
    overflow: hidden;
  }
  .as-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #c8973a, #e8c06a);
    border-radius: 18px 18px 0 0;
  }
  .as-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.13);
  }

  .as-card-top {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
  }

  .as-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c8973a 0%, #e8c06a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(200,151,58,0.30);
  }

  .as-card-name {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a2e;
    line-height: 1.3;
  }
  .as-card-username {
    font-size: 12px;
    color: #bbb;
    margin-top: 2px;
  }

  .as-divider {
    border: none;
    border-top: 1px solid #f2ede6;
    margin-bottom: 14px;
  }

  .as-field {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 9px;
    font-size: 13px;
    color: #555;
    word-break: break-all;
  }
  .as-field svg {
    width: 14px;
    height: 14px;
    color: #c8973a;
    flex-shrink: 0;
  }

  .as-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
  }

  .as-role-badge {
    display: inline-block;
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    background: rgba(200,151,58,0.10);
    color: #c8973a;
    border: 1px solid rgba(200,151,58,0.22);
    text-transform: uppercase;
    letter-spacing: 0.09em;
  }

  .as-delete-btn {
    background: rgba(220, 53, 69, 0.08);
    border: 1px solid rgba(220, 53, 69, 0.22);
    color: #dc3545;
    border-radius: 8px;
    padding: 5px 13px;
    font-size: 12px;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: background 0.2s, border 0.2s;
  }
  .as-delete-btn:hover {
    background: rgba(220, 53, 69, 0.16);
    border-color: rgba(220, 53, 69, 0.45);
  }
  .as-delete-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .as-delete-btn svg { width: 13px; height: 13px; }

  /* ── Confirm Modal ── */
  .as-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
  }

  .as-modal {
    background: #fff;
    border-radius: 20px;
    padding: 34px 32px 28px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0,0,0,0.18);
    text-align: center;
    animation: modalIn 0.22s ease;
  }
  @keyframes modalIn {
    from { transform: scale(0.92); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }

  .as-modal-icon {
    width: 56px;
    height: 56px;
    background: rgba(220,53,69,0.10);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
  }
  .as-modal-icon svg {
    width: 26px;
    height: 26px;
    color: #dc3545;
  }

  .as-modal h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 8px;
  }

  .as-modal p {
    font-size: 13px;
    color: #888;
    margin-bottom: 26px;
    line-height: 1.6;
  }
  .as-modal p strong {
    color: #1a1a2e;
    font-weight: 600;
  }

  .as-modal-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  .as-modal-cancel {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1.5px solid #ddd;
    background: #fff;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    color: #555;
    cursor: pointer;
    transition: background 0.2s;
  }
  .as-modal-cancel:hover { background: #f5f5f5; }

  .as-modal-confirm {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: #dc3545;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s;
  }
  .as-modal-confirm:hover { background: #b02a37; }
  .as-modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }

  /* ── Toast ── */
  .as-toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 13px 22px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Outfit', sans-serif;
    color: #fff;
    box-shadow: 0 6px 24px rgba(0,0,0,0.15);
    z-index: 2000;
    animation: toastIn 0.3s ease;
  }
  @keyframes toastIn {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  .as-toast.success { background: #1e7e34; }
  .as-toast.error   { background: #dc3545; }

  .as-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 320px;
    gap: 14px;
    color: #aaa;
    font-size: 14px;
  }
  .as-spinner {
    width: 36px; height: 36px;
    border: 3px solid #e8c06a33;
    border-top-color: #c8973a;
    border-radius: 50%;
    animation: spin 0.85s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .as-error {
    background: #fff3f3;
    color: #c0392b;
    border-radius: 12px;
    padding: 16px 22px;
    font-size: 14px;
    margin-top: 20px;
    border: 1px solid #fdd;
  }

  .as-empty {
    text-align: center;
    color: #bbb;
    font-size: 14px;
    padding: 60px 0;
    grid-column: 1 / -1;
  }

  @media (max-width: 600px) {
    .as-content { padding: 18px; }
    .as-topbar { padding: 14px 18px; }
    .as-search { width: 100%; }
    .as-toolbar { flex-direction: column; align-items: flex-start; }
  }
`;

const AllStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Delete modal state
  const [confirmTarget, setConfirmTarget] = useState(null); // student object to delete
  const [deleting, setDeleting] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null); // { msg, type }

  useEffect(() => {
    axios
      .get("http://localhost:9595/lostfound/students", { withCredentials: true })
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load students. Make sure the backend is running.");
        setLoading(false);
      });
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteConfirm = () => {
    if (!confirmTarget) return;
    setDeleting(true);
    axios
      .delete(`http://localhost:9595/lostfound/login/${confirmTarget.username}`, {
        withCredentials: true,
      })
      .then(() => {
        setStudents((prev) => prev.filter((s) => s.username !== confirmTarget.username));
        showToast(`"${confirmTarget.personalName}" deleted successfully.`, "success");
        setConfirmTarget(null);
        setDeleting(false);
      })
      .catch(() => {
        showToast("Failed to delete student. Please try again.", "error");
        setDeleting(false);
      });
  };

  const getInitial = (name) => {
    const s = String(name || "").trim();
    return s.length > 0 ? s.charAt(0).toUpperCase() : "?";
  };

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.personalName?.toLowerCase().includes(q) ||
      s.username?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <style>{styles}</style>
      <div className="as-page">

        {/* ── Top Bar ── */}
        <div className="as-topbar">
          <div className="as-topbar-left">
            <button className="as-back-btn" onClick={() => navigate("/admin-menu")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="as-topbar-title">Lost <span>&amp;</span> Found</div>
          </div>
          <div className="as-admin-badge">ADMIN</div>
        </div>

        <div className="as-content">

          {/* ── Toolbar ── */}
          <div className="as-toolbar">
            <div className="as-info">
              <h2>
                All Students
                {!loading && <span className="as-count-pill">{filtered.length}</span>}
              </h2>
              <p>All registered students in the system</p>
            </div>

            <div className="as-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                className="as-search"
                type="text"
                placeholder="Search name, username, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="as-loading">
              <div className="as-spinner" />
              Loading students...
            </div>
          )}

          {/* ── Error ── */}
          {error && <div className="as-error">⚠️ {error}</div>}

          {/* ── Grid ── */}
          {!loading && !error && (
            <div className="as-grid">
              {filtered.length === 0 ? (
                <div className="as-empty">No students found.</div>
              ) : (
                filtered.map((student, idx) => (
                  <div className="as-card" key={idx}>

                    <div className="as-card-top">
                      <div className="as-avatar">{getInitial(student.personalName)}</div>
                      <div>
                        <div className="as-card-name">{student.personalName}</div>
                        <div className="as-card-username">@{student.username}</div>
                      </div>
                    </div>

                    <hr className="as-divider" />

                    <div className="as-field">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {student.email}
                    </div>

                    <div className="as-field">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {student.username}
                    </div>

                    <div className="as-field">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {student.role}
                    </div>

                    {/* ── Card Footer: Role Badge + Delete Button ── */}
                    <div className="as-card-footer">
                      <div className="as-role-badge">{student.role}</div>
                      <button
                        className="as-delete-btn"
                        onClick={() => setConfirmTarget(student)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1m-4 0h10" />
                        </svg>
                        Delete
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ── Confirm Delete Modal ── */}
        {confirmTarget && (
          <div className="as-modal-overlay" onClick={() => !deleting && setConfirmTarget(null)}>
            <div className="as-modal" onClick={(e) => e.stopPropagation()}>
              <div className="as-modal-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1m-4 0h10" />
                </svg>
              </div>
              <h3>Delete Student?</h3>
              <p>
                Are you sure you want to delete{" "}
                <strong>{confirmTarget.personalName}</strong> (@{confirmTarget.username})?
                <br />This action cannot be undone.
              </p>
              <div className="as-modal-actions">
                <button
                  className="as-modal-cancel"
                  onClick={() => setConfirmTarget(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="as-modal-confirm"
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Toast Notification ── */}
        {toast && (
          <div className={`as-toast ${toast.type}`}>
            {toast.type === "success" ? "✅" : "❌"} {toast.msg}
          </div>
        )}

      </div>
    </>
  );
};

export default AllStudents;
