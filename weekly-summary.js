// Weekly Summary - Yedidim
const { useState, useEffect, useRef, useMemo } = React;
const ORGANIZATION_LOGO_URL = "assets/logo-yedidim.png";
const DEFAULT_APPEARANCE = /*EDITMODE-BEGIN*/ {
  primaryColor: "#1e4d8b",
  accentColor: "#f59e0b",
  fontFamily: "Heebo",
  darkMode: false,
  showHeadline: true,
  showActiveVolunteers: true,
  showEmergency: true,
  showCategories: true,
  showChampion: true,
  showVolunteers: true,
  showAnnouncements: true,
  sectionOrder:
    "headline,sideStats,announcements,categories,champion,volunteers",
}; /*EDITMODE-END*/
const REPORT_STORAGE_KEY = "yedidim-weekly-v1";
function createDefaultReport() {
  return {
    branchName: "תל אביב - יפו - דרום",
    parasha: "פרשת אחרי מות",
    dateRange: "23/04/2026 – 29/04/2026",
    heroImage: "",
    heroHeight: 280,
    heroPosX: 50,
    heroPosY: 50,
    heroFit: "cover",
    branchLogo: "",
    orgLogo: ORGANIZATION_LOGO_URL,
    intro:
      "סיכום פעילות המתנדבים בסניף בשבוע האחרון. הדו״ח כולל פילוח קריאות לפי סוגים, אירועי חירום, מתנדב מצטיין השבוע ורשימת כל המתנדבים שיצאו לסייע.",
    totalCalls: 86,
    totalLabel: "קריאות שטופלו",
    totalSub: "סך הכול קריאות שנסגרו על ידי מתנדבי הסניף השבוע",
    activeVolunteers: 8,
    activeVolunteersLabel: "מתנדבים פעילים",
    emergencyCalls: 0,
    emergencyLabel: "קריאות חירום",
    categoriesTitle: "פילוח לפי סוג קריאה",
    categories: [
      {
        id: "c1",
        icon: "cables",
        label: "הנעה",
        count: 56,
        color: "#ef4444",
      },
      {
        id: "c2",
        icon: "flattire",
        label: "פנצ'ר",
        count: 15,
        color: "#475569",
      },
      {
        id: "c3",
        icon: "keyfob",
        label: "פתיחה",
        count: 8,
        color: "#374151",
      },
      {
        id: "c4",
        icon: "toolbox",
        label: "כללי",
        count: 4,
        color: "#f59e0b",
      },
      {
        id: "c5",
        icon: "jerrycan",
        label: "דלק",
        count: 2,
        color: "#dc2626",
      },
      {
        id: "c6",
        icon: "funnel",
        label: "שאיבה",
        count: 1,
        color: "#f59e0b",
      },
    ],
    championLabel: "מתנדב מצטיין השבוע",
    championName: "איתן עודד",
    championDesc:
      "הוביל את הפעילות השבועית עם 53 אירועים שטופלו במקצועיות ובמסירות.",
    championCount: 53,
    championCountLabel: "אירועים",
    volunteersTitle: "רשימת המתנדבים והיקף הסיוע",
    volunteers: [
      {
        id: "v1",
        name: "איתן עודד",
        count: 53,
      },
      {
        id: "v2",
        name: "תומר ראובני",
        count: 23,
      },
      {
        id: "v3",
        name: "עופר יעקובי",
        count: 2,
      },
      {
        id: "v4",
        name: "אלון קליין",
        count: 2,
      },
      {
        id: "v5",
        name: "אמיר קדיס",
        count: 2,
      },
      {
        id: "v6",
        name: "יחיאל גד שלמה אללוף",
        count: 2,
      },
      {
        id: "v7",
        name: "יוסי פרח",
        count: 1,
      },
      {
        id: "v8",
        name: "מאיה עציוני",
        count: 1,
      },
    ],
    announcementsTitle: "הודעות הנהלה",
    announcements: [
      {
        id: "a1",
        icon: "megaphone",
        title: "תודה לכל המתנדבים",
        body: "תודה ענקית לכל מי שיצא השבוע לסייע. עבודתכם מצילת חיים ומשמעותית.",
      },
    ],
    footerNote: "ידידים — תנועת ידידים בדרכים | קו חירום 1230",
  };
}
function loadSavedReport() {
  try {
    const raw = localStorage.getItem(REPORT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Normalize legacy organization logo paths
      if (
        parsed.orgLogo === "assets/logo-yedidim.png" ||
        (parsed.orgLogo && parsed.orgLogo.startsWith("assets/"))
      ) {
        parsed.orgLogo = ORGANIZATION_LOGO_URL;
      }
      // Strip any branch logo that points to a missing local asset
      if (parsed.branchLogo && parsed.branchLogo.startsWith("assets/")) {
        parsed.branchLogo = "";
      }
      return {
        ...createDefaultReport(),
        ...parsed,
      };
    }
  } catch (event) {}
  return createDefaultReport();
}

// Editable text
function EditableText({
  value,
  onChange,
  multiline,
  className,
  style,
  placeholder,
}) {
  const elementRef = useRef(null);
  const handleBlur = (event) => {
    const nextValue = multiline
      ? event.currentTarget.innerText
      : event.currentTarget.innerText.replace(/\n/g, " ");
    if (nextValue !== value) onChange(nextValue);
  };
  const handleKey = (event) => {
    if (!multiline && event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }
  };
  useEffect(() => {
    if (elementRef.current && document.activeElement !== elementRef.current) {
      const currentText = elementRef.current.innerText;
      if (currentText !== value) elementRef.current.innerText = value || "";
    }
  }, [value]);
  return (
    <span
      ref={elementRef}
      className={"editable " + (className || "")}
      style={style}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKey}
      data-placeholder={placeholder || ""}
    />
  );
}
function EditableNumber({ value, onChange, className, style }) {
  return (
    <EditableText
      value={String(value)}
      onChange={(nextValue) => {
        const numericValue = parseInt(
          String(nextValue).replace(/[^\d-]/g, ""),
          10,
        );
        onChange(isNaN(numericValue) ? 0 : numericValue);
      }}
      className={className}
      style={style}
    />
  );
}

// Logo slot
function LogoSlot({ src, onChange, placeholder }) {
  const inputRef = useRef(null);
  const handleFile = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => onChange(fileReader.result);
    fileReader.readAsDataURL(selectedFile);
  };
  return (
    <div
      className={"logo-slot " + (src ? "has-img" : "")}
      onClick={() => inputRef.current?.click()}
    >
      {src ? <img src={src} alt="" /> : <div className="ph">{placeholder}</div>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
      />
    </div>
  );
}

// Title overlay — text over hero image, with positioning + style
function TitleOverlay({ data: reportData, set: updateReport }) {
  const tx = reportData.titleX ?? 50;
  const ty = reportData.titleY ?? 50;
  const align = reportData.titleAlign || "center";
  const color = reportData.titleColor || "#ffffff";
  const shadow = reportData.titleShadow !== false;
  const wrapRef = useRef(null);
  const dragRef = useRef({
    active: false,
  });
  const onPointerDown = (event) => {
    if (
      event.target.closest("[contenteditable]") ||
      event.target.closest(".title-controls")
    )
      return;
    event.preventDefault();
    dragRef.current = {
      active: true,
      sx: event.clientX,
      sy: event.clientY,
      tx,
      ty,
    };
    wrapRef.current?.setPointerCapture?.(event.pointerId);
  };
  const onPointerMove = (event) => {
    const d = dragRef.current;
    if (!d.active) return;
    const parent = wrapRef.current?.parentElement?.getBoundingClientRect();
    if (!parent) return;
    const deltaX = ((event.clientX - d.sx) / parent.width) * 100;
    const deltaY = ((event.clientY - d.sy) / parent.height) * 100;
    updateReport({
      titleX: Math.max(5, Math.min(95, Math.round(d.tx - deltaX))),
      titleY: Math.max(5, Math.min(95, Math.round(d.ty + deltaY))),
    });
  };
  const onPointerUp = (event) => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      wrapRef.current?.releasePointerCapture?.(event.pointerId);
    }
  };
  const cycleAlign = () => {
    const order = ["start", "center", "end"];
    const next = order[(order.indexOf(align) + 1) % order.length];
    updateReport({
      titleAlign: next,
    });
  };
  return (
    <div
      ref={wrapRef}
      className="doc-title-overlay"
      style={{
        right: 100 - tx + "%",
        top: ty + "%",
        textAlign: align,
        color,
        textShadow: shadow
          ? "0 2px 12px rgba(0,0,0,.55), 0 1px 3px rgba(0,0,0,.65)"
          : "none",
        transform: `translate(${align === "center" ? "50%" : align === "end" ? "0%" : "100%"}, -50%)`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="title-controls no-export">
        <button onClick={cycleAlign} title="יישור">
          ⇆
        </button>
        <button
          onClick={() =>
            updateReport({
              titleColor: color === "#ffffff" ? "#143866" : "#ffffff",
            })
          }
          title="צבע"
        >
          {color === "#ffffff" ? "◐" : "◑"}
        </button>
        <button
          onClick={() =>
            updateReport({
              titleShadow: !shadow,
            })
          }
          title="צל"
        >
          {shadow ? "☁" : "○"}
        </button>
        <button
          onClick={() =>
            updateReport({
              titleX: 50,
              titleY: 50,
              titleAlign: "center",
              titleColor: "#ffffff",
              titleShadow: true,
            })
          }
          title="איפוס"
        >
          ↺
        </button>
      </div>
      <div className="eyebrow">
        <EditableText
          value={reportData.eyebrow || "סיכום שבועי"}
          onChange={(nextValue) =>
            updateReport({
              eyebrow: nextValue,
            })
          }
        />
      </div>
      <div className="doc-title">
        סניף{" "}
        <EditableText
          value={reportData.branchName}
          onChange={(nextValue) =>
            updateReport({
              branchName: nextValue,
            })
          }
        />
      </div>
      <div className="doc-subtitle">
        <EditableText
          value={reportData.intro.split("\n")[0] || reportData.intro}
          onChange={(nextValue) =>
            updateReport({
              intro: nextValue,
            })
          }
          multiline
        />
      </div>
    </div>
  );
}

// Hero with file + URL + resize + reposition
function Hero({ data: reportData, set: updateReport }) {
  const src = reportData.heroImage;
  const panelHeight = reportData.heroHeight ?? 280;
  const px = reportData.heroPosX ?? 50;
  const py = reportData.heroPosY ?? 50;
  const fit = reportData.heroFit || "cover";
  const inputRef = useRef(null);
  const wrapRef = useRef(null);
  const dragRef = useRef({
    active: false,
  });
  const handleFile = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () =>
      updateReport({
        heroImage: fileReader.result,
      });
    fileReader.readAsDataURL(selectedFile);
  };
  const handleUrl = () => {
    const u = prompt(
      "הדבק קישור לתמונה:",
      src && src.startsWith("http") ? src : "",
    );
    if (u)
      updateReport({
        heroImage: u,
      });
  };

  // Drag to reposition (only meaningful for cover)
  const onPointerDown = (event) => {
    if (!src || fit !== "cover") return;
    if (
      event.target.closest(".hero-controls") ||
      event.target.closest(".hero-resize")
    )
      return;
    event.preventDefault();
    dragRef.current = {
      active: true,
      sx: event.clientX,
      sy: event.clientY,
      px,
      py,
    };
    wrapRef.current?.setPointerCapture?.(event.pointerId);
  };
  const onPointerMove = (event) => {
    const d = dragRef.current;
    if (!d.active || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const deltaX = ((event.clientX - d.sx) / rect.width) * 100;
    const deltaY = ((event.clientY - d.sy) / rect.height) * 100;
    // RTL: dragging right should pan image right -> px decreases
    const newX = Math.max(0, Math.min(100, d.px - deltaX));
    const newY = Math.max(0, Math.min(100, d.py - deltaY));
    updateReport({
      heroPosX: Math.round(newX),
      heroPosY: Math.round(newY),
    });
  };
  const onPointerUp = (event) => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      wrapRef.current?.releasePointerCapture?.(event.pointerId);
    }
  };

  // Resize handle (bottom edge)
  const resizeRef = useRef({
    active: false,
  });
  const onResizeDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    resizeRef.current = {
      active: true,
      sy: event.clientY,
      sh: panelHeight,
    };
    const move = (pointerEvent) => {
      if (!resizeRef.current.active) return;
      const deltaY = pointerEvent.clientY - resizeRef.current.sy;
      const nextHeight = Math.max(
        120,
        Math.min(640, resizeRef.current.sh + deltaY),
      );
      updateReport({
        heroHeight: Math.round(nextHeight),
      });
    };
    const up = () => {
      resizeRef.current.active = false;
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };
  const cycleFit = () =>
    updateReport({
      heroFit: fit === "cover" ? "contain" : "cover",
    });
  return (
    <div
      ref={wrapRef}
      className="hero"
      style={{
        height: panelHeight + "px",
        aspectRatio: "auto",
        cursor: src && fit === "cover" ? "move" : "default",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {src ? (
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            objectFit: fit,
            objectPosition: `${px}% ${py}%`,
            background: fit === "contain" ? "#f4f5f7" : "transparent",
            pointerEvents: "none",
          }}
        />
      ) : (
        <div className="hero-empty">
          <div className="icon">🖼️</div>
          <span>תמונה ראשית של השבוע — לחצו "העלאה" או "קישור"</span>
        </div>
      )}
      <div className="hero-controls no-export">
        <button onClick={() => inputRef.current?.click()}>📁 העלאה</button>
        <button onClick={handleUrl}>🔗 קישור</button>
        {src && (
          <button onClick={cycleFit} title="התאמה">
            {fit === "cover" ? "⬜ מילוי" : "🔲 התאמה"}
          </button>
        )}
        {src && (
          <button
            onClick={() =>
              updateReport({
                heroPosX: 50,
                heroPosY: 50,
                heroHeight: 280,
                heroFit: "cover",
              })
            }
            title="איפוס"
          >
            ↺
          </button>
        )}
        {src && (
          <button
            onClick={() =>
              updateReport({
                heroImage: "",
              })
            }
          >
            ✕ הסר
          </button>
        )}
      </div>
      {src && (
        <div
          className="hero-resize no-export"
          onPointerDown={onResizeDown}
          title="גרור לשינוי גובה"
        >
          <div className="hero-resize-bar" />
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{
          display: "none",
        }}
      />
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────
function HeadlineSection({ data: reportData, set: updateReport }) {
  return (
    <div className="headline-stat">
      <div className="big">
        <EditableNumber
          value={reportData.totalCalls}
          onChange={(nextValue) =>
            updateReport({
              totalCalls: nextValue,
            })
          }
        />
      </div>
      <div className="meta">
        <div className="t">סך הכול</div>
        <div className="s">
          <EditableText
            value={reportData.totalLabel}
            onChange={(nextValue) =>
              updateReport({
                totalLabel: nextValue,
              })
            }
          />
        </div>
        <div
          className="s"
          style={{
            fontSize: 13,
            opacity: 0.85,
            fontWeight: 500,
            marginTop: 6,
            lineHeight: 1.5,
          }}
        >
          <EditableText
            value={reportData.totalSub}
            onChange={(nextValue) =>
              updateReport({
                totalSub: nextValue,
              })
            }
            multiline
          />
        </div>
      </div>
    </div>
  );
}
function SideStatsSection({
  data: reportData,
  set: updateReport,
  showActive,
  showEmergency,
}) {
  if (!showActive && !showEmergency) return null;
  const gridColumns = showActive && showEmergency ? "1fr 1fr" : "1fr";
  return (
    <div
      className="side-stats"
      style={{
        gridTemplateColumns: gridColumns,
      }}
    >
      {showActive && (
        <div className="side-stat people">
          <div className="ico">
            <YIcon id="people" size={32} />
          </div>
          <div>
            <div className="num">
              <EditableNumber
                value={reportData.activeVolunteers}
                onChange={(nextValue) =>
                  updateReport({
                    activeVolunteers: nextValue,
                  })
                }
              />
            </div>
            <div className="lbl">
              <EditableText
                value={reportData.activeVolunteersLabel}
                onChange={(nextValue) =>
                  updateReport({
                    activeVolunteersLabel: nextValue,
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
      {showEmergency && (
        <div className="side-stat alert">
          <div className="ico">
            <YIcon id="siren" size={32} />
          </div>
          <div>
            <div className="num">
              <EditableNumber
                value={reportData.emergencyCalls}
                onChange={(nextValue) =>
                  updateReport({
                    emergencyCalls: nextValue,
                  })
                }
              />
            </div>
            <div className="lbl">
              <EditableText
                value={reportData.emergencyLabel}
                onChange={(nextValue) =>
                  updateReport({
                    emergencyLabel: nextValue,
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function CategoriesSection({ data: reportData, set: updateReport }) {
  const updateItem = (id, patch) =>
    updateReport({
      categories: reportData.categories.map((category) =>
        category.id === id
          ? {
              ...category,
              ...patch,
            }
          : category,
      ),
    });
  const removeItem = (id) =>
    updateReport({
      categories: reportData.categories.filter(
        (category) => category.id !== id,
      ),
    });
  const addItem = () => {
    const id = "c" + Date.now();
    updateReport({
      categories: [
        ...reportData.categories,
        {
          id,
          icon: "pin",
          label: "קטגוריה חדשה",
          count: 0,
          color: "#64748b",
        },
      ],
    });
  };
  return (
    <section className="section">
      <div className="section-head">
        <div className="accent-bar"></div>
        <h2>
          <EditableText
            value={reportData.categoriesTitle}
            onChange={(nextValue) =>
              updateReport({
                categoriesTitle: nextValue,
              })
            }
          />
        </h2>
      </div>
      <div className="stat-grid">
        {reportData.categories.map((category) => (
          <div
            key={category.id}
            className="stat-card"
            style={{
              "--card-c": category.color,
            }}
          >
            <button
              className="del no-export"
              onClick={() => removeItem(category.id)}
              title="הסר"
            >
              ✕
            </button>
            <div
              className="color-pick no-export"
              style={{
                background: category.color,
              }}
            >
              <input
                type="color"
                value={category.color}
                onChange={(event) =>
                  updateItem(category.id, {
                    color: event.target.value,
                  })
                }
              />
            </div>
            <div className="ico">
              <IconPicker
                value={category.icon}
                onChange={(nextValue) =>
                  updateItem(category.id, {
                    icon: nextValue,
                  })
                }
                size={26}
              />
            </div>
            <div className="num">
              <EditableNumber
                value={category.count}
                onChange={(nextValue) =>
                  updateItem(category.id, {
                    count: nextValue,
                  })
                }
              />
            </div>
            <div className="lbl">
              <EditableText
                value={category.label}
                onChange={(nextValue) =>
                  updateItem(category.id, {
                    label: nextValue,
                  })
                }
              />
            </div>
          </div>
        ))}
        <button className="add-card no-export" onClick={addItem}>
          <div className="plus">+</div>
          <div>הוסף קטגוריה</div>
        </button>
      </div>
    </section>
  );
}
function ChampionSection({ data: reportData, set: updateReport }) {
  return (
    <section className="section">
      <div className="champion">
        <div className="trophy">
          <YIcon id="trophy" size={44} />
        </div>
        <div>
          <div className="label">
            <EditableText
              value={reportData.championLabel}
              onChange={(nextValue) =>
                updateReport({
                  championLabel: nextValue,
                })
              }
            />
          </div>
          <div className="name">
            <EditableText
              value={reportData.championName}
              onChange={(nextValue) =>
                updateReport({
                  championName: nextValue,
                })
              }
            />
          </div>
          <div className="desc">
            <EditableText
              value={reportData.championDesc}
              onChange={(nextValue) =>
                updateReport({
                  championDesc: nextValue,
                })
              }
              multiline
            />
          </div>
        </div>
        <div className="count-wrap">
          <div className="count">
            <EditableNumber
              value={reportData.championCount}
              onChange={(nextValue) =>
                updateReport({
                  championCount: nextValue,
                })
              }
            />
          </div>
          <div className="count-lbl">
            <EditableText
              value={reportData.championCountLabel}
              onChange={(nextValue) =>
                updateReport({
                  championCountLabel: nextValue,
                })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
function AnnouncementsSection({ data: reportData, set: updateReport }) {
  const updateItem = (id, patch) =>
    updateReport({
      announcements: reportData.announcements.map((announcement) =>
        announcement.id === id
          ? {
              ...announcement,
              ...patch,
            }
          : announcement,
      ),
    });
  const removeItem = (id) =>
    updateReport({
      announcements: reportData.announcements.filter(
        (announcement) => announcement.id !== id,
      ),
    });
  const addItem = () => {
    const id = "a" + Date.now();
    updateReport({
      announcements: [
        ...(reportData.announcements || []),
        {
          id,
          icon: "📢",
          title: "כותרת ההודעה",
          body: "תוכן ההודעה...",
        },
      ],
    });
  };
  return (
    <section className="section">
      <div className="section-head">
        <div
          className="accent-bar"
          style={{
            background: "var(--accent)",
          }}
        ></div>
        <h2>
          <EditableText
            value={reportData.announcementsTitle}
            onChange={(nextValue) =>
              updateReport({
                announcementsTitle: nextValue,
              })
            }
          />
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {(reportData.announcements || []).map((announcement) => (
          <div
            key={announcement.id}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: 14,
              alignItems: "flex-start",
              padding: "16px 18px",
              borderRadius: 14,
              background:
                "color-mix(in srgb, var(--accent) 8%, var(--surface))",
              border:
                "1px solid color-mix(in srgb, var(--accent) 30%, var(--line))",
              borderInlineStart: "4px solid var(--accent)",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background:
                  "color-mix(in srgb, var(--accent) 18%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              <IconPicker
                value={announcement.icon}
                onChange={(nextValue) =>
                  updateItem(announcement.id, {
                    icon: nextValue,
                  })
                }
                size={24}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "var(--ink)",
                  marginBottom: 4,
                }}
              >
                <EditableText
                  value={announcement.title}
                  onChange={(nextValue) =>
                    updateItem(announcement.id, {
                      title: nextValue,
                    })
                  }
                />
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: "var(--ink-soft)",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                <EditableText
                  value={announcement.body}
                  onChange={(nextValue) =>
                    updateItem(announcement.id, {
                      body: nextValue,
                    })
                  }
                  multiline
                />
              </div>
            </div>
            <button
              className="no-export"
              onClick={() => removeItem(announcement.id)}
              title="הסר"
              style={{
                background: "transparent",
                border: 0,
                color: "var(--ink-soft)",
                cursor: "pointer",
                padding: 4,
                borderRadius: 6,
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button className="add-vol-btn no-export" onClick={addItem}>
          + הוסף הודעה
        </button>
      </div>
    </section>
  );
}
function VolunteersSection({ data: reportData, set: updateReport }) {
  const updateItem = (id, patch) =>
    updateReport({
      volunteers: reportData.volunteers.map((volunteer) =>
        volunteer.id === id
          ? {
              ...volunteer,
              ...patch,
            }
          : volunteer,
      ),
    });
  const removeItem = (id) =>
    updateReport({
      volunteers: reportData.volunteers.filter(
        (volunteer) => volunteer.id !== id,
      ),
    });
  const addItem = () => {
    const id = "v" + Date.now();
    updateReport({
      volunteers: [
        ...reportData.volunteers,
        {
          id,
          name: "מתנדב חדש",
          count: 0,
        },
      ],
    });
  };
  const volunteersByCallCount = [...reportData.volunteers].sort(
    (firstItem, secondItem) => (secondItem.count || 0) - (firstItem.count || 0),
  );
  const highestCallCount = Math.max(
    ...volunteersByCallCount.map((volunteer) => volunteer.count || 0),
    1,
  );
  return (
    <section className="section">
      <div className="section-head">
        <div className="accent-bar"></div>
        <h2>
          <EditableText
            value={reportData.volunteersTitle}
            onChange={(volunteer) =>
              updateReport({
                volunteersTitle: volunteer,
              })
            }
          />
        </h2>
      </div>
      <table className="vol-table">
        <thead>
          <tr>
            <th className="rank">#</th>
            <th>שם המתנדב</th>
            <th>היקף</th>
            <th className="num-cell">אירועים</th>
            <th className="actions no-export"></th>
          </tr>
        </thead>
        <tbody>
          {volunteersByCallCount.map((volunteer, index) => (
            <tr key={volunteer.id}>
              <td className={"rank rank-" + (index + 1)}>{index + 1}</td>
              <td>
                <EditableText
                  value={volunteer.name}
                  onChange={(nextValue) =>
                    updateItem(volunteer.id, {
                      name: nextValue,
                    })
                  }
                />
              </td>
              <td>
                <div className="vol-bar">
                  <div
                    className="vol-bar-fill"
                    style={{
                      width:
                        ((volunteer.count || 0) / highestCallCount) * 100 + "%",
                    }}
                  ></div>
                </div>
              </td>
              <td className="num-cell">
                <EditableNumber
                  value={volunteer.count}
                  onChange={(nextValue) =>
                    updateItem(volunteer.id, {
                      count: nextValue,
                    })
                  }
                />
              </td>
              <td className="actions no-export">
                <button
                  className="del-row"
                  onClick={() => removeItem(volunteer.id)}
                  title="הסר"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-vol-btn no-export" onClick={addItem}>
        + הוסף מתנדב
      </button>
    </section>
  );
}

// Main App
function WeeklySummaryApp() {
  const [appearance, updateAppearance] = useTweaks(DEFAULT_APPEARANCE);
  const [reportData, setReportData] = useState(loadSavedReport);
  useEffect(() => {
    try {
      localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(reportData));
    } catch (event) {}
  }, [reportData]);
  const updateReport = (patch) =>
    setReportData((previousReport) => ({
      ...previousReport,
      ...patch,
    }));

  // Apply tweaks
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary",
      appearance.primaryColor,
    );
    document.documentElement.style.setProperty(
      "--accent",
      appearance.accentColor,
    );
    const fontMap = {
      Heebo: "'Heebo', sans-serif",
      Assistant: "'Assistant', sans-serif",
      Rubik: "'Rubik', sans-serif",
      "Frank Ruhl Libre": "'Frank Ruhl Libre', serif",
    };
    document.documentElement.style.setProperty(
      "--font",
      fontMap[appearance.fontFamily] || "'Heebo', sans-serif",
    );
    document.documentElement.setAttribute(
      "data-theme",
      appearance.darkMode ? "dark" : "light",
    );
  }, [
    appearance.primaryColor,
    appearance.accentColor,
    appearance.fontFamily,
    appearance.darkMode,
  ]);
  const handlePrint = () => {
    document.body.classList.add("exporting");
    setTimeout(() => {
      window.print();
      setTimeout(() => document.body.classList.remove("exporting"), 800);
    }, 100);
  };
  const handleExportPNG = async () => {
    const reportElement = document.getElementById("doc-card");
    if (!reportElement || !window.html2canvas) {
      alert("html2canvas לא זמין");
      return;
    }
    const A4_WIDTH = 794,
      A4_HEIGHT = 1123;
    document.body.classList.add("exporting");
    await new Promise((resolve) => setTimeout(resolve, 250));
    try {
      // Render the doc at its natural width, then we'll scale/fit on output.
      // First measure full natural size:
      const rect = reportElement.getBoundingClientRect();
      const naturalWidth = rect.width;
      const naturalHeight = reportElement.scrollHeight;

      // Capture the full natural document
      const canvas = await window.html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        width: naturalWidth,
        height: naturalHeight,
        windowWidth: naturalWidth,
        windowHeight: naturalHeight,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          // Force RTL on cloned doc — html2canvas sometimes drops dir attr
          clonedDoc.documentElement.setAttribute("dir", "rtl");
          clonedDoc.body.setAttribute("dir", "rtl");
          // Sanitize unsupported color functions.
          const sanitizeCss = (css) => {
            if (!css) return css;
            // Special: gradients with var(--primary) -> dark blue
            css = css.replace(
              /linear-gradient\(([^)]*?)color-mix\(in srgb,\s*var\(--primary\)[^)]*\)([^)]*)\)/gi,
              "linear-gradient($1#143866$2)",
            );
            css = css.replace(
              /linear-gradient\(([^)]*?)color-mix\(in srgb,\s*var\(--accent\)[^)]*\)([^)]*)\)/gi,
              "linear-gradient($1#d97706$2)",
            );
            // Strip all unsupported modern color functions
            css = css.replace(/color-mix\s*\([^)]*\)/gi, "rgba(0,0,0,0.08)");
            css = css.replace(/oklch\s*\([^)]*\)/gi, "#888");
            css = css.replace(/oklab\s*\([^)]*\)/gi, "#888");
            css = css.replace(/lab\s*\([^)]*\)/gi, "#888");
            css = css.replace(/lch\s*\([^)]*\)/gi, "#888");
            css = css.replace(/hwb\s*\([^)]*\)/gi, "#888");
            // color(...) with color spaces - replace with neutral grey
            css = css.replace(
              /color\(\s*(?:srgb|display-p3|rec2020|a98-rgb|prophoto-rgb|xyz|xyz-d50|xyz-d65)[^)]*\)/gi,
              "#888",
            );
            return css;
          };
          clonedDoc.querySelectorAll("style").forEach((styleElement) => {
            styleElement.textContent = sanitizeCss(
              styleElement.textContent || "",
            );
          });
          clonedDoc.querySelectorAll("[style]").forEach((el) => {
            const inline = el.getAttribute("style");
            if (
              inline &&
              /color-mix|oklch|oklab|lab\(|lch\(|hwb\(|color\(/i.test(inline)
            ) {
              el.setAttribute("style", sanitizeCss(inline));
            }
          });
          // Sanitize external/cross-origin stylesheets we can read (Google Fonts often emits color() in font-display rules — rare but possible)
          try {
            for (const sheet of clonedDoc.styleSheets) {
              try {
                const rules = sheet.cssRules || [];
                for (let index = 0; index < rules.length; index++) {
                  const cssRule = rules[index];
                  if (
                    cssRule.cssText &&
                    /color-mix|oklch|oklab|lab\(|lch\(|hwb\(|color\(/i.test(
                      cssRule.cssText,
                    )
                  ) {
                    // Replace the whole rule
                    sheet.deleteRule(index);
                    sheet.insertRule(sanitizeCss(cssRule.cssText), index);
                  }
                }
              } catch (event) {
                /* CORS-blocked sheet; skip */
              }
            }
          } catch (event) {}
          // Restore color fidelity for known design tokens
          const override = clonedDoc.createElement("style");
          override.textContent = `
            *{color-scheme:light}
            html,body{direction:rtl!important}
            .doc-head-overlay{direction:rtl!important}
            .logo-slot{background:#f3f4f6!important}
            .hero{background:linear-gradient(135deg,#dbe5f0,#fde9c4)!important}
            .date-strip{background:#eaf0f8!important;border-right:4px solid var(--primary)!important}
            .headline-stat{background:linear-gradient(135deg,var(--primary),#143866)!important;color:#fff!important}
            .headline-stat .big,.headline-stat .meta .t,.headline-stat .meta .s{color:#fff!important}
            .champion{background:linear-gradient(135deg,#fef3c7,#fde68a)!important}
            .side-stat.alert{background:#fee9e9!important;border-color:#fca5a5!important}
            .side-stat.people{background:#e3faf0!important;border-color:#86efac!important}
            .side-stat.alert .ico{background:#fecaca!important}
            .side-stat.people .ico{background:#bbf7d0!important}
            .stat-card .ico{background:rgba(30,77,139,.12)!important}
            .vol-table thead th{background:#eaf0f8!important}
            .vol-bar{background:#dbe5f0!important}
            .vol-table tbody tr:hover{background:transparent!important}
            [contenteditable]{outline:none!important;background:transparent!important}
            .toolbar,.twk-panel,.no-export,.add-card,.add-vol-btn,.del,.del-row,.hero-controls,.hero-resize,.title-controls{display:none!important}
          `;
          clonedDoc.head.appendChild(override);
        },
      });

      // Compose onto a portrait canvas. Fit by width (no horizontal margins).
      // If content is taller than A4 ratio, extend the canvas height to fit
      // everything without scaling down — wide and full.
      const targetWidth = A4_WIDTH * 2;
      const widthScale = targetWidth / canvas.width;
      const drawWidth = targetWidth;
      const drawHeight = canvas.height * widthScale;
      const targetHeight = Math.max(A4_HEIGHT * 2, drawHeight);
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = targetWidth;
      outputCanvas.height = targetHeight;
      const context = outputCanvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
      context.drawImage(canvas, 0, 0, drawWidth, drawHeight);
      const link = document.createElement("a");
      link.download = `סיכום-שבועי-${(reportData.dateRange || "").replace(/[\/\s–]/g, "-")}.png`;
      link.href = outputCanvas.toDataURL("image/png");
      link.click();
    } catch (event) {
      console.error(event);
      alert("שגיאה ביצוא: " + event.message);
    } finally {
      document.body.classList.remove("exporting");
    }
  };
  const handleReset = () => {
    if (confirm("לאפס את כל הנתונים לערכי ברירת מחדל?"))
      setReportData(createDefaultReport());
  };
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `סיכום-${(reportData.dateRange || "").replace(/[\/\s–]/g, "-")}.json`;
    downloadLink.click();
    URL.revokeObjectURL(url);
  };
  const handleImportJSON = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json,.json";
    fileInput.onchange = (event) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        try {
          const parsed = JSON.parse(fileReader.result);
          setReportData({
            ...createDefaultReport(),
            ...parsed,
          });
        } catch (err) {
          alert("שגיאה בקריאת הקובץ: " + err.message);
        }
      };
      fileReader.readAsText(selectedFile);
    };
    fileInput.click();
  };
  const handleImportEmail = () => {
    const overlay = document.createElement("div");
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;direction:rtl;font-family:inherit";
    overlay.appendChild(
      document.getElementById("email-import-template").content.cloneNode(true),
    );
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    overlay.querySelector("#emi-close").onclick = close;
    overlay.querySelector("#emi-cancel").onclick = close;
    overlay.onclick = (event) => {
      if (event.target === overlay) close();
    };
    const emailTextarea = overlay.querySelector("#emi-input");
    setTimeout(() => emailTextarea.focus(), 50);
    const parseEmailReport = () => {
      const text = emailTextarea.value;
      if (!text.trim()) return null;
      const result = {};
      // Branch name + date range from header
      const branchMatch = text.match(
        /ספירה\s+שבועית\s+עבור\s+סניף\s+([^\n,]+?)(?:,|\n|$)/,
      );
      if (branchMatch) result.branchName = branchMatch[1].trim();
      // Date range — DD/MM/YYYY-DD/MM/YYYY or DD/MM/YYYY ועד DD/MM/YYYY
      let dateRange = null;
      const compactDateRangeMatch = text.match(
        /(\d{2}\/\d{2}\/\d{4})\s*[-–]\s*(\d{2}\/\d{2}\/\d{4})/,
      );
      const writtenDateRangeMatch = text.match(
        /מהתאריך\s+(\d{2}\/\d{2}\/\d{4})\s+ועד\s+התאריך\s+(\d{2}\/\d{2}\/\d{4})/,
      );
      if (writtenDateRangeMatch)
        dateRange = `${writtenDateRangeMatch[1]} – ${writtenDateRangeMatch[2]}`;
      else if (compactDateRangeMatch)
        dateRange = `${compactDateRangeMatch[1]} – ${compactDateRangeMatch[2]}`;
      if (dateRange) result.dateRange = dateRange;
      // Active volunteers count
      const volunteerCountMatch = text.match(/(\d+)\s+מתנדבים\s+השתתפו/);
      if (volunteerCountMatch)
        result.activeVolunteers = parseInt(volunteerCountMatch[1], 10);
      // Total calls
      const totalCallsMatch = text.match(/סך\s+הכל\s+(\d+)\s+קריאות/);
      if (totalCallsMatch) result.totalCalls = parseInt(totalCallsMatch[1], 10);

      // Category mapping (label -> {icon, color}). Order matters for fuzzy match — longer/specific keys first.
      const categoryAppearanceByLabel = {
        התנעה: {
          icon: "cables",
          color: "#ef4444",
        },
        הנעה: {
          icon: "cables",
          color: "#ef4444",
        },
        סוללה: {
          icon: "cables",
          color: "#ef4444",
        },
        בוסטר: {
          icon: "cables",
          color: "#ef4444",
        },
        "פנצ'ר": {
          icon: "flattire",
          color: "#475569",
        },
        פנצר: {
          icon: "flattire",
          color: "#475569",
        },
        גלגל: {
          icon: "flattire",
          color: "#475569",
        },
        צמיג: {
          icon: "flattire",
          color: "#475569",
        },
        "החלפת גלגל": {
          icon: "flattire",
          color: "#475569",
        },
        "רכב נעול": {
          icon: "keyfob",
          color: "#374151",
        },
        "פתיחת רכב": {
          icon: "keyfob",
          color: "#374151",
        },
        פתיחה: {
          icon: "keyfob",
          color: "#374151",
        },
        מפתחות: {
          icon: "keyfob",
          color: "#374151",
        },
        דלק: {
          icon: "jerrycan",
          color: "#dc2626",
        },
        תדלוק: {
          icon: "jerrycan",
          color: "#dc2626",
        },
        "שמן+מים": {
          icon: "funnel",
          color: "#f59e0b",
        },
        "שמן ומים": {
          icon: "funnel",
          color: "#f59e0b",
        },
        שמן: {
          icon: "funnel",
          color: "#f59e0b",
        },
        מים: {
          icon: "funnel",
          color: "#0ea5e9",
        },
        "נוזל קירור": {
          icon: "funnel",
          color: "#0ea5e9",
        },
        שאיבה: {
          icon: "funnel",
          color: "#f59e0b",
        },
        גרירה: {
          icon: "toolbox",
          color: "#7c3aed",
        },
        תקלה: {
          icon: "toolbox",
          color: "#f59e0b",
        },
        "תקלת מנוע": {
          icon: "toolbox",
          color: "#f59e0b",
        },
        תאונה: {
          icon: "pin",
          color: "#dc2626",
        },
        חילוץ: {
          icon: "pin",
          color: "#dc2626",
        },
        "נסיעת מבחן": {
          icon: "pin",
          color: "#0ea5e9",
        },
        ביקור: {
          icon: "pin",
          color: "#10b981",
        },
        הדרכה: {
          icon: "pin",
          color: "#10b981",
        },
        אחר: {
          icon: "toolbox",
          color: "#f59e0b",
        },
        כללי: {
          icon: "toolbox",
          color: "#f59e0b",
        },
        שונות: {
          icon: "toolbox",
          color: "#f59e0b",
        },
      };
      // Color palette to assign to unknown categories
      const fallbackColors = [
        "#64748b",
        "#0891b2",
        "#7c3aed",
        "#10b981",
        "#ec4899",
        "#f97316",
        "#6366f1",
        "#84cc16",
      ];
      const fallbackIcons = ["pin", "toolbox", "funnel", "cables", "keyfob"];
      let fallbackIndex = 0;
      const findCategoryAppearance = (label) => {
        const trimmed = label.trim();
        if (categoryAppearanceByLabel[trimmed])
          return categoryAppearanceByLabel[trimmed];
        // Fuzzy match — check longer keys first for better matches
        const keys = Object.keys(categoryAppearanceByLabel).sort(
          (firstItem, secondItem) => secondItem.length - firstItem.length,
        );
        for (const categoryLabel of keys)
          if (
            trimmed.includes(categoryLabel) ||
            categoryLabel.includes(trimmed)
          )
            return categoryAppearanceByLabel[categoryLabel];
        // Unknown category — assign a unique color/icon from the fallback pool
        const categoryAppearance = {
          icon: fallbackIcons[fallbackIndex % fallbackIcons.length],
          color: fallbackColors[fallbackIndex % fallbackColors.length],
        };
        fallbackIndex++;
        return categoryAppearance;
      };

      // Categories — section format "label - N" before per-category breakdown
      // Parse the summary list: lines like "התנעה - 56" between total line and first per-category section
      const categories = [];
      const categoryLinePattern = /^([^\n\-:]+?)\s*[-–]\s*(\d+)\s*$/;
      const lines = text.split(/\r?\n/);
      let inSummary = false;
      for (let index = 0; index < lines.length; index++) {
        const line = lines[index].trim();
        if (/סך\s+הכל\s+\d+\s+קריאות/.test(line)) {
          inSummary = true;
          continue;
        }
        if (!inSummary) continue;
        // Stop at "תודה" or empty section break
        if (/^תודה/.test(line)) break;
        // Stop when per-category breakdown begins (any "label:" header line, not "label - N")
        if (/^[^\d\-–\n]{2,30}:\s*$/.test(line)) break;
        if (/^רשימת/.test(line)) break;
        const lineMatch = line.match(categoryLinePattern);
        if (lineMatch) {
          const label = lineMatch[1].trim();
          const count = parseInt(lineMatch[2], 10);
          if (!isNaN(count) && label.length > 0 && label.length < 25) {
            const categoryAppearance = findCategoryAppearance(label);
            categories.push({
              id: "c" + (categories.length + 1),
              label,
              count,
              ...categoryAppearance,
            });
          }
        }
      }
      if (categories.length > 0) {
        result.categories = categories;
        result.totalCalls = categories.reduce(
          (styleElement, category) => styleElement + category.count,
          0,
        );
      }

      // Volunteers list — section "רשימת כל המתנדבים שיצאו לסייע:" followed by "name count" lines
      const volunteerSectionIndex = text.indexOf("רשימת כל המתנדבים");
      if (volunteerSectionIndex >= 0) {
        const volunteerLines = text
          .slice(volunteerSectionIndex)
          .split(/\r?\n/)
          .slice(1);
        const volunteers = [];
        for (const raw of volunteerLines) {
          const line = raw.trim();
          if (!line) {
            if (volunteers.length > 0) break;
            else continue;
          }
          if (/^עד כאן|^בברכה|^צוות/.test(line)) break;
          // Match: "name 53" or "name - 53"
          const lineMatch = line.match(/^(.+?)\s+[-–]?\s*(\d+)\s*$/);
          if (lineMatch) {
            const name = lineMatch[1].trim().replace(/\s*[-–]\s*$/, "");
            const count = parseInt(lineMatch[2], 10);
            if (name && !isNaN(count)) {
              volunteers.push({
                id: "v" + (volunteers.length + 1),
                name,
                count,
              });
            }
          }
        }
        if (volunteers.length > 0) {
          result.volunteers = volunteers;
          // Champion = top volunteer
          const topVolunteer = [...volunteers].sort(
            (firstItem, secondItem) => secondItem.count - firstItem.count,
          )[0];
          result.championName = topVolunteer.name;
          result.championCount = topVolunteer.count;
          result.championDesc = `הוביל את הפעילות השבועית עם ${topVolunteer.count} אירועים שטופלו במקצועיות ובמסירות.`;
        }
      }
      return result;
    };
    overlay.querySelector("#emi-preview-btn").onclick = () => {
      const parsed = parseEmailReport();
      const previewElement = overlay.querySelector("#emi-preview");
      if (!parsed) {
        previewElement.style.display = "block";
        previewElement.innerHTML =
          '<div style="color:#dc2626">לא נמצא תוכן לעיבוד. הדביקו את גוף המייל.</div>';
        return;
      }
      previewElement.style.display = "block";
      const lines = [];
      if (parsed.branchName)
        lines.push(`<div><b>סניף:</b> ${parsed.branchName}</div>`);
      if (parsed.dateRange)
        lines.push(`<div><b>תאריכים:</b> ${parsed.dateRange}</div>`);
      if (parsed.totalCalls != null)
        lines.push(`<div><b>סך קריאות:</b> ${parsed.totalCalls}</div>`);
      if (parsed.activeVolunteers != null)
        lines.push(
          `<div><b>מתנדבים פעילים:</b> ${parsed.activeVolunteers}</div>`,
        );
      if (parsed.categories)
        lines.push(
          `<div><b>קטגוריות (${parsed.categories.length}):</b> ${parsed.categories.map((category) => `${category.label} (${category.count})`).join(", ")}</div>`,
        );
      if (parsed.volunteers)
        lines.push(
          `<div><b>מתנדבים (${parsed.volunteers.length}):</b> ${parsed.volunteers.map((volunteer) => `${volunteer.name} (${volunteer.count})`).join(", ")}</div>`,
        );
      if (parsed.championName)
        lines.push(
          `<div><b>מצטיין:</b> ${parsed.championName} — ${parsed.championCount}</div>`,
        );
      previewElement.innerHTML =
        lines.join("") ||
        '<div style="color:#dc2626">לא חולצו נתונים. בדוק את פורמט המייל.</div>';
    };
    overlay.querySelector("#emi-apply").onclick = () => {
      const parsed = parseEmailReport();
      if (!parsed || Object.keys(parsed).length === 0) {
        alert("לא נמצאו נתונים לייבוא. הדביקו את גוף המייל המלא.");
        return;
      }
      setReportData((previousReport) => ({
        ...previousReport,
        ...parsed,
      }));
      close();
    };
  };
  const sectionOrder = (
    appearance.sectionOrder ||
    "headline,sideStats,announcements,categories,champion,volunteers"
  ).split(",");
  const sectionVisibility = {
    headline: appearance.showHeadline,
    sideStats: appearance.showActiveVolunteers || appearance.showEmergency,
    categories: appearance.showCategories,
    champion: appearance.showChampion,
    volunteers: appearance.showVolunteers,
    announcements: appearance.showAnnouncements,
  };
  const renderSection = (key) => {
    if (!sectionVisibility[key]) return null;
    if (key === "headline")
      return <HeadlineSection key={key} data={reportData} set={updateReport} />;
    if (key === "sideStats")
      return (
        <SideStatsSection
          key={key}
          data={reportData}
          set={updateReport}
          showActive={appearance.showActiveVolunteers}
          showEmergency={appearance.showEmergency}
        />
      );
    if (key === "categories")
      return (
        <CategoriesSection key={key} data={reportData} set={updateReport} />
      );
    if (key === "champion")
      return <ChampionSection key={key} data={reportData} set={updateReport} />;
    if (key === "volunteers")
      return (
        <VolunteersSection key={key} data={reportData} set={updateReport} />
      );
    if (key === "announcements")
      return (
        <AnnouncementsSection key={key} data={reportData} set={updateReport} />
      );
    return null;
  };
  const moveSection = (key, direction) => {
    const reorderedSections = sectionOrder.slice();
    const index = reorderedSections.indexOf(key);
    if (index < 0) return;
    const destinationIndex = index + direction;
    if (destinationIndex < 0 || destinationIndex >= reorderedSections.length)
      return;
    [reorderedSections[index], reorderedSections[destinationIndex]] = [
      reorderedSections[destinationIndex],
      reorderedSections[index],
    ];
    updateAppearance("sectionOrder", reorderedSections.join(","));
  };
  const sectionLabels = {
    headline: "סטטיסטיקה ראשית",
    sideStats: "סטטיסטיקות צד",
    announcements: "הודעות הנהלה",
    categories: "פילוח קטגוריות",
    champion: "מתנדב מצטיין",
    volunteers: "רשימת מתנדבים",
  };
  return (
    <div className="page-wrap">
      <div className="doc" id="doc-card">
        <div className="hero-banner">
          <Hero data={reportData} set={updateReport} />
          <header className="doc-head-overlay">
            <LogoSlot
              src={reportData.orgLogo}
              onChange={(nextValue) =>
                updateReport({
                  orgLogo: nextValue,
                })
              }
              placeholder="לוגו ידידים"
            />
            <TitleOverlay data={reportData} set={updateReport} />
            <LogoSlot
              src={reportData.branchLogo}
              onChange={(nextValue) =>
                updateReport({
                  branchLogo: nextValue,
                })
              }
              placeholder="לוגו הסניף"
            />
          </header>
        </div>

        <div className="date-strip">
          <span className="icon">
            <YIcon id="calendar" size={22} />
          </span>
          <span className="label">לתאריכים:</span>
          <span className="range">
            <EditableText
              value={reportData.dateRange}
              onChange={(nextValue) =>
                updateReport({
                  dateRange: nextValue,
                })
              }
            />
          </span>
          <span className="parasha">
            <EditableText
              value={reportData.parasha}
              onChange={(nextValue) =>
                updateReport({
                  parasha: nextValue,
                })
              }
            />
          </span>
        </div>

        {sectionOrder.map(renderSection)}

        <footer className="doc-foot">
          <span>
            <EditableText
              value={reportData.footerNote}
              onChange={(nextValue) =>
                updateReport({
                  footerNote: nextValue,
                })
              }
            />
          </span>
          <span>
            תודה לכל המתנדבים <span className="heart">❤</span>
          </span>
        </footer>
      </div>

      <div className="toolbar no-export">
        <button onClick={handleExportPNG}>📷 הורד תמונה</button>
        <button onClick={handlePrint}>📄 הדפסה / PDF</button>
        <button onClick={handleExportJSON}>💾 שמור JSON</button>
        <button onClick={handleImportJSON}>📂 טען JSON</button>
        <button
          onClick={handleImportEmail}
          style={{
            background: "#1e4d8b",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          📧 ייבוא ממייל
        </button>
        <button onClick={handleReset}>↺ איפוס</button>
      </div>

      <TweaksPanel>
        <TweakSection label="מראה" />
        <TweakColor
          label="צבע ראשי"
          value={appearance.primaryColor}
          onChange={(nextValue) => updateAppearance("primaryColor", nextValue)}
        />
        <TweakColor
          label="צבע מותג"
          value={appearance.accentColor}
          onChange={(nextValue) => updateAppearance("accentColor", nextValue)}
        />
        <TweakSelect
          label="פונט"
          value={appearance.fontFamily}
          options={["Heebo", "Assistant", "Rubik", "Frank Ruhl Libre"]}
          onChange={(nextValue) => updateAppearance("fontFamily", nextValue)}
        />
        <TweakToggle
          label="מצב כהה"
          value={appearance.darkMode}
          onChange={(nextValue) => updateAppearance("darkMode", nextValue)}
        />

        <TweakSection label="הצגת סקציות" />
        <TweakToggle
          label="סטטיסטיקה ראשית"
          value={appearance.showHeadline}
          onChange={(nextValue) => updateAppearance("showHeadline", nextValue)}
        />
        <TweakToggle
          label="מתנדבים פעילים"
          value={appearance.showActiveVolunteers}
          onChange={(nextValue) =>
            updateAppearance("showActiveVolunteers", nextValue)
          }
        />
        <TweakToggle
          label="קריאות חירום"
          value={appearance.showEmergency}
          onChange={(nextValue) => updateAppearance("showEmergency", nextValue)}
        />
        <TweakToggle
          label="פילוח קטגוריות"
          value={appearance.showCategories}
          onChange={(nextValue) =>
            updateAppearance("showCategories", nextValue)
          }
        />
        <TweakToggle
          label="מתנדב מצטיין"
          value={appearance.showChampion}
          onChange={(nextValue) => updateAppearance("showChampion", nextValue)}
        />
        <TweakToggle
          label="רשימת מתנדבים"
          value={appearance.showVolunteers}
          onChange={(nextValue) =>
            updateAppearance("showVolunteers", nextValue)
          }
        />
        <TweakToggle
          label="הודעות הנהלה"
          value={appearance.showAnnouncements}
          onChange={(nextValue) =>
            updateAppearance("showAnnouncements", nextValue)
          }
        />

        <TweakSection label="סדר סקציות" />
        {sectionOrder.map((key, index) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 0",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {sectionLabels[key] || key}
            </span>
            <button
              onClick={() => moveSection(key, -1)}
              disabled={index === 0}
              style={{
                width: 24,
                height: 24,
                border: "1px solid rgba(0,0,0,.1)",
                background: "rgba(255,255,255,.7)",
                borderRadius: 6,
                cursor: index === 0 ? "default" : "pointer",
                opacity: index === 0 ? 0.3 : 1,
                fontSize: 11,
                padding: 0,
              }}
            >
              ▲
            </button>
            <button
              onClick={() => moveSection(key, 1)}
              disabled={index === sectionOrder.length - 1}
              style={{
                width: 24,
                height: 24,
                border: "1px solid rgba(0,0,0,.1)",
                background: "rgba(255,255,255,.7)",
                borderRadius: 6,
                cursor:
                  index === sectionOrder.length - 1 ? "default" : "pointer",
                opacity: index === sectionOrder.length - 1 ? 0.3 : 1,
                fontSize: 11,
                padding: 0,
              }}
            >
              ▼
            </button>
          </div>
        ))}
      </TweaksPanel>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <WeeklySummaryApp />,
);
