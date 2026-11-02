// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const updateAppearance = React.useCallback((keyOrEdits, nextValue) => {
    const edits =
      typeof keyOrEdits === "object" && keyOrEdits !== null
        ? keyOrEdits
        : {
            [keyOrEdits]: nextValue,
          };
    setValues((previousReport) => ({
      ...previousReport,
      ...edits,
    }));
    window.parent.postMessage(
      {
        type: "__edit_mode_set_keys",
        edits,
      },
      "*",
    );
  }, []);
  return [values, updateAppearance];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = "Tweaks", children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16,
  });
  const VIEWPORT_PADDING = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const panelWidth = panel.offsetWidth,
      panelHeight = panel.offsetHeight;
    const maxRight = Math.max(
      VIEWPORT_PADDING,
      window.innerWidth - panelWidth - VIEWPORT_PADDING,
    );
    const maxBottom = Math.max(
      VIEWPORT_PADDING,
      window.innerHeight - panelHeight - VIEWPORT_PADDING,
    );
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(VIEWPORT_PADDING, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(VIEWPORT_PADDING, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + "px";
    panel.style.bottom = offsetRef.current.y + "px";
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", clampToViewport);
      return () => window.removeEventListener("resize", clampToViewport);
    }
    const resizeObserver = new ResizeObserver(clampToViewport);
    resizeObserver.observe(document.documentElement);
    return () => resizeObserver.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = (event) => {
      const appearance = event?.data?.type;
      if (appearance === "__activate_edit_mode") setOpen(true);
      else if (appearance === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", onMsg);
    try {
      window.parent.postMessage(
        {
          type: "__edit_mode_available",
        },
        "*",
      );
    } catch (event) {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Standalone mode: when not inside the Claude host iframe, expose a floating
  // toggle button so users still get access to the Tweaks panel.
  const isStandalone =
    typeof window !== "undefined" && window.parent === window;
  const dismiss = () => {
    setOpen(false);
    try {
      window.parent.postMessage(
        {
          type: "__edit_mode_dismissed",
        },
        "*",
      );
    } catch (event) {}
  };
  const onDragStart = (event) => {
    const panel = dragRef.current;
    if (!panel) return;
    const boundingRect = panel.getBoundingClientRect();
    const startX = event.clientX,
      startY = event.clientY;
    const startRight = window.innerWidth - boundingRect.right;
    const startBottom = window.innerHeight - boundingRect.bottom;
    const move = (pointerEvent) => {
      offsetRef.current = {
        x: startRight - (pointerEvent.clientX - startX),
        y: startBottom - (pointerEvent.clientY - startY),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  return (
    <>
      {isStandalone && !open && (
        <button
          onClick={() => setOpen(true)}
          data-noncommentable=""
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 9999,
            background: "#1e4d8b",
            color: "#fff",
            border: 0,
            borderRadius: 999,
            padding: "12px 18px",
            fontFamily: "inherit",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,.25)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          title="פתח לוח בקרה"
        >
          ⚙️ הגדרות
        </button>
      )}
      {open && (
        <div
          ref={dragRef}
          className="twk-panel"
          data-noncommentable=""
          style={{
            right: offsetRef.current.x,
            bottom: offsetRef.current.y,
          }}
        >
          <div className="twk-hd" onMouseDown={onDragStart}>
            <b>{title}</b>
            <button
              className="twk-x"
              aria-label="Close tweaks"
              onMouseDown={(event) => event.stopPropagation()}
              onClick={dismiss}
            >
              ✕
            </button>
          </div>
          <div className="twk-body">{children}</div>
        </div>
      )}
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}
function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? "twk-row twk-row-h" : "twk-row"}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max: highestCallCount = 100,
  step = 1,
  unit = "",
  onChange,
}) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input
        type="range"
        className="twk-slider"
        min={min}
        max={highestCallCount}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </TweakRow>
  );
}
function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl">
        <span>{label}</span>
      </div>
      <button
        type="button"
        className="twk-toggle"
        data-on={value ? "1" : "0"}
        role="switch"
        aria-checked={!!value}
        onClick={() => onChange(!value)}
      >
        <i />
      </button>
    </div>
  );
}
function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const normalizedOptions = options.map((option) =>
    typeof option === "object"
      ? option
      : {
          value: option,
          label: option,
        },
  );
  const optionIndex = Math.max(
    0,
    normalizedOptions.findIndex((option) => option.value === value),
  );
  const numericValue = normalizedOptions.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const segAt = (clientX) => {
    const boundingRect = trackRef.current.getBoundingClientRect();
    const inner = boundingRect.width - 4;
    const index = Math.floor(
      ((clientX - boundingRect.left - 2) / inner) * numericValue,
    );
    return normalizedOptions[Math.max(0, Math.min(numericValue - 1, index))]
      .value;
  };
  const onPointerDown = (event) => {
    setDragging(true);
    const v0 = segAt(event.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (pointerEvent) => {
      if (!trackRef.current) return;
      const nextValue = segAt(pointerEvent.clientX);
      if (nextValue !== valueRef.current) onChange(nextValue);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  return (
    <TweakRow label={label}>
      <div
        ref={trackRef}
        role="radiogroup"
        onPointerDown={onPointerDown}
        className={dragging ? "twk-seg dragging" : "twk-seg"}
      >
        <div
          className="twk-seg-thumb"
          style={{
            left: `calc(2px + ${optionIndex} * (100% - 4px) / ${numericValue})`,
            width: `calc((100% - 4px) / ${numericValue})`,
          }}
        />
        {normalizedOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={option.value === value}
          >
            {option.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}
function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select
        className="twk-field"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => {
          const nextValue = typeof option === "object" ? option.value : option;
          const l = typeof option === "object" ? option.label : option;
          return (
            <option key={nextValue} value={nextValue}>
              {l}
            </option>
          );
        })}
      </select>
    </TweakRow>
  );
}
function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input
        className="twk-field"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </TweakRow>
  );
}
function TweakNumber({
  label,
  value,
  min,
  max: highestCallCount,
  step = 1,
  unit = "",
  onChange,
}) {
  const clamp = (numericValue) => {
    if (min != null && numericValue < min) return min;
    if (highestCallCount != null && numericValue > highestCallCount)
      return highestCallCount;
    return numericValue;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0,
  });
  const onScrubStart = (event) => {
    event.preventDefault();
    startRef.current = {
      x: event.clientX,
      val: value,
    };
    const decimals = (String(step).split(".")[1] || "").length;
    const move = (pointerEvent) => {
      const deltaX = pointerEvent.clientX - startRef.current.x;
      const raw = startRef.current.val + deltaX * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>
        {label}
      </span>
      <input
        type="number"
        value={value}
        min={min}
        max={highestCallCount}
        step={step}
        onChange={(event) => onChange(clamp(Number(event.target.value)))}
      />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}
function TweakColor({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl">
        <span>{label}</span>
      </div>
      <input
        type="color"
        className="twk-swatch"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button
      type="button"
      className={secondary ? "twk-btn secondary" : "twk-btn"}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton,
});
