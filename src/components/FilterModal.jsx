import { useEffect, useState } from "react";
import "./filter-modal.css";

export default function FilterModal({ open, onClose, onApply, value }) {
  const [local, setLocal] = useState(value);

  // Sync incoming value whenever modal opens
  useEffect(() => {
    if (open) setLocal(value);
  }, [open, value]);

  // Close on ESC
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggleInArray = (key, item) => {
    setLocal((prev) => {
      const set = new Set(prev[key] || []);
      set.has(item) ? set.delete(item) : set.add(item);
      return { ...prev, [key]: Array.from(set) };
    });
  };

  const toggleNestedBool = (path) => {
    setLocal((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      const last = path[path.length - 1];
      obj[last] = !obj[last];
      return next;
    });
  };

  const setSlider = (key, val) => setLocal((p) => ({ ...p, [key]: val }));
  const apply = () => onApply?.(local);

  return (
    <div className="ppm-modal-overlay" onClick={onClose}>
      <div
        className="ppm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Centered close button */}
        <button className="ppm-close" aria-label="Close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 id="filter-title" className="ppm-modal-title">Filters</h2>

        <div className="ppm-modal-body">
          <div className="section">
            <label className="form-check">
              <input
                type="checkbox"
                checked={!!local.byProximity}
                onChange={() => setLocal((p) => ({ ...p, byProximity: !p.byProximity }))}
              />{" "}
              By proximity
            </label>
          </div>

          <div className="section">
            <span className="section-title">Species</span>
            <div className="checkbox-group">
              {["Dog", "Cat", "Rabbit", "Bird", "Other"].map((s) => (
                <label key={s}>
                  <input
                    type="checkbox"
                    checked={local.species.includes(s)}
                    onChange={() => toggleInArray("species", s)}
                  />{" "}
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="section-title">Sex</span>
            <div className="checkbox-group">
              {["Male", "Female"].map((s) => (
                <label key={s}>
                  <input
                    type="checkbox"
                    checked={local.sex.includes(s)}
                    onChange={() => toggleInArray("sex", s)}
                  />{" "}
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="section-title">Age</span>
            <div className="checkbox-group">
              {["Baby", "Adult", "Senior"].map((a) => (
                <label key={a}>
                  <input
                    type="checkbox"
                    checked={local.ageBands.includes(a)}
                    onChange={() => toggleInArray("ageBands", a)}
                  />{" "}
                  {a}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="section-title">Size</span>
            <div className="checkbox-group">
              {["Small", "Med", "Large"].map((s) => (
                <label key={s}>
                  <input
                    type="checkbox"
                    checked={local.size.includes(s)}
                    onChange={() => toggleInArray("size", s)}
                  />{" "}
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="section-title">Adoption Fee</span>
            <div className="checkbox-group">
              {["$0", "Under $50", "$50+"].map((f) => (
                <label key={f}>
                  <input
                    type="checkbox"
                    checked={local.fee.includes(f)}
                    onChange={() => toggleInArray("fee", f)}
                  />{" "}
                  {f}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="section-title">Open to special needs?</span>
            <div className="checkbox-group">
              {["Yes", "No"].map((opt) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    checked={local.specialNeeds.includes(opt)}
                    onChange={() => toggleInArray("specialNeeds", opt)}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="section">
            <span className="section-title">Other</span>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={local.other.hypoallergenic}
                  onChange={() => toggleNestedBool(["other", "hypoallergenic"])}
                />{" "}
                Hypoallergenic
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={local.other.goodWithKids}
                  onChange={() => toggleNestedBool(["other", "goodWithKids"])}
                />{" "}
                Good with kids/other animals
              </label>
            </div>
          </div>

          <div className="section">
            <span className="section-title">Time Commitment</span>
            <div className="slider-labels">
              <span>0 hrs</span>
              <span>24 hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={local.timeCommitmentHrs}
              onChange={(e) => setSlider("timeCommitmentHrs", Number(e.target.value))}
              className="time-slider"
              aria-label="Time commitment"
            />
            <div className="slider-value">
              Selected: <span>{local.timeCommitmentHrs}</span> hrs
            </div>
          </div>
        </div>

        <div className="ppm-modal-footer">
          <button className="ppm-apply" onClick={apply}>Apply Filter</button>
        </div>
      </div>
    </div>
  );
}