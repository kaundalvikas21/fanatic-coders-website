import type { CSSProperties } from "react"

/**
 * Decorative 3D "robotics" scene for the Web Development service hero (md+ only).
 * A robot arm holds a holographic build panel. Sits directly on the hero's aurora
 * background (no card), with ambient CSS keyframes only (no pointer interaction).
 * Purely visual, so the root is aria-hidden. Keyframes live in globals.css (.wd-*).
 */
export default function WebDevHeroVisual() {
  const joint: CSSProperties = {
    position: "absolute", borderRadius: "50%",
    background: "radial-gradient(circle at 38% 32%,#4c4a6a,#191826 70%)",
    border: "1px solid rgba(160,150,225,.3)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.25),0 4px 10px rgba(0,0,0,.5)",
  }
  const segment: CSSProperties = {
    position: "absolute", inset: 0,
    background: "linear-gradient(180deg,#3c3b54,#23222f 48%,#161522)",
    boxShadow: "inset 0 1.5px 0 rgba(255,255,255,.2),inset 0 -3px 5px rgba(0,0,0,.45),0 8px 18px -8px rgba(0,0,0,.6)",
  }

  return (
    <div
      aria-hidden
      className="cv-robot shrink-0 origin-center scale-[0.72] lg:scale-[0.8] xl:scale-[0.88]"
      style={{ width: 470, perspective: 1500, perspectiveOrigin: "50% 44%", fontFamily: "var(--font-mono)" }}
    >
      {/* extra top room so the held panel + chips (which sit above the stage) never clip */}
      <div style={{ position: "relative", paddingTop: 90 }}>
        <div style={{ position: "relative", width: 470, height: 380, transformStyle: "preserve-3d" }}>
          {/* soft glow slab behind robot + contact shadow */}
          <div style={{ position: "absolute", left: 50, top: 70, width: 380, height: 240, borderRadius: 24, background: "linear-gradient(135deg,var(--wd-blue),var(--wd-violet))", filter: "blur(40px)", opacity: 0.3, transform: "translateZ(-90px)" }} />
          <div style={{ position: "absolute", left: 24, bottom: 8, width: 170, height: 26, borderRadius: "50%", background: "radial-gradient(closest-side,rgba(0,0,0,.6),transparent)", filter: "blur(4px)" }} />

          {/* robot base */}
          <div style={{ position: "absolute", left: 10, bottom: 26, width: 140, height: 80, borderRadius: 14, background: "linear-gradient(180deg,#2c2b40,#1d1c2c 46%,#121120)", border: "1px solid rgba(150,140,215,.22)", boxShadow: "0 22px 44px -18px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.08),inset 0 -4px 8px rgba(0,0,0,.45)" }}>
            <div style={{ position: "absolute", left: 14, top: 14, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ width: 54, height: 3, borderRadius: 2, background: "rgba(150,140,215,.2)" }} />
              <span style={{ width: 42, height: 3, borderRadius: 2, background: "rgba(150,140,215,.16)" }} />
              <span style={{ width: 48, height: 3, borderRadius: 2, background: "rgba(150,140,215,.16)" }} />
            </div>
            <div className="wd-core" style={{ position: "absolute", right: 14, top: 14, width: 18, height: 18, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%,var(--wd-cyan),#0c2b30)" }} />
            <div style={{ position: "absolute", right: 16, bottom: 12, fontSize: 9, letterSpacing: 1, color: "#6a6494" }}>UNIT-07</div>
            <span style={{ position: "absolute", left: 10, bottom: 10, width: 7, height: 7, borderRadius: "50%", background: "#332f4a", boxShadow: "inset 0 1px 1px rgba(255,255,255,.3)" }} />
          </div>

          {/* arm chain */}
          <div style={{ position: "absolute", left: 72, top: 270, width: 0, height: 0, transformStyle: "preserve-3d" }}>
            {/* shoulder joint */}
            <div style={{ ...joint, left: -19, top: -19, width: 38, height: 38, zIndex: 5 }}>
              <span style={{ position: "absolute", inset: 10, borderRadius: "50%", border: "1.5px solid rgba(91,124,255,.55)", boxShadow: "0 0 8px rgba(91,124,255,.45)" }} />
              <span style={{ position: "absolute", left: "50%", top: "50%", width: 6, height: 6, margin: -3, borderRadius: "50%", background: "var(--wd-blue)", boxShadow: "0 0 8px var(--wd-blue)" }} />
            </div>

            {/* upper arm */}
            <div className="wd-arm" style={{ position: "absolute", left: -8, top: -15, width: 156, height: 30, transformOrigin: "16px 15px", transform: "rotate(-43deg)" }}>
              <div style={{ ...segment, borderRadius: 10, border: "1px solid rgba(165,155,230,.26)" }} />
              <div style={{ position: "absolute", left: 18, right: 16, top: "50%", height: 3, marginTop: -1.5, borderRadius: 2, background: "linear-gradient(90deg,var(--wd-blue),var(--wd-violet))", boxShadow: "0 0 8px rgba(91,124,255,.5)", opacity: 0.85 }} />
              <span style={{ position: "absolute", left: 10, top: "50%", width: 6, height: 6, marginTop: -3, borderRadius: "50%", background: "#272636", boxShadow: "inset 0 1px 1px rgba(255,255,255,.35)" }} />

              {/* elbow joint */}
              <div style={{ position: "absolute", left: 140, top: 15, width: 0, height: 0 }}>
                <div style={{ ...joint, left: -16, top: -16, width: 32, height: 32, zIndex: 4 }}>
                  <span style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "1.5px solid rgba(139,92,246,.55)", boxShadow: "0 0 8px rgba(139,92,246,.45)" }} />
                  <span style={{ position: "absolute", left: "50%", top: "50%", width: 5, height: 5, margin: -2.5, borderRadius: "50%", background: "var(--wd-violet)", boxShadow: "0 0 8px var(--wd-violet)" }} />
                </div>

                {/* forearm */}
                <div className="wd-elbow" style={{ position: "absolute", left: -6, top: -13, width: 138, height: 26, transformOrigin: "6px 13px", transform: "rotate(36deg)" }}>
                  <div style={{ ...segment, borderRadius: 9, border: "1px solid rgba(165,155,230,.24)", boxShadow: "inset 0 1.5px 0 rgba(255,255,255,.18),inset 0 -3px 5px rgba(0,0,0,.45),0 8px 16px -8px rgba(0,0,0,.6)" }} />
                  <div style={{ position: "absolute", left: 14, right: 14, top: "50%", height: 3, marginTop: -1.5, borderRadius: 2, background: "linear-gradient(90deg,var(--wd-violet),var(--wd-blue))", boxShadow: "0 0 8px rgba(139,92,246,.5)", opacity: 0.85 }} />

                  {/* gripper + held panel */}
                  <div style={{ position: "absolute", left: 128, top: 13, width: 0, height: 0, transform: "rotate(7deg)" }}>
                    <div style={{ position: "absolute", left: -12, top: -17, width: 24, height: 34, borderRadius: 7, background: "linear-gradient(180deg,#3a3954,#1f1e2e)", border: "1px solid rgba(160,150,225,.3)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.2)" }} />
                    <div style={{ position: "absolute", left: 6, top: -26, width: 34, height: 9, borderRadius: 5, transformOrigin: "left center", transform: "rotate(-22deg)", background: "linear-gradient(180deg,#3a3954,#1d1c2c)", border: "1px solid rgba(165,155,230,.3)" }} />
                    <div style={{ position: "absolute", left: 6, top: 18, width: 34, height: 9, borderRadius: 5, transformOrigin: "left center", transform: "rotate(22deg)", background: "linear-gradient(180deg,#3a3954,#1d1c2c)", border: "1px solid rgba(165,155,230,.3)" }} />

                    {/* holographic UI panel */}
                    <div style={{ position: "absolute", left: 30, top: -62, width: 182, height: 124, borderRadius: 13, overflow: "hidden", background: "linear-gradient(165deg,rgba(24,22,44,.95),rgba(13,12,24,.97))", border: "1px solid rgba(91,124,255,.4)", boxShadow: "0 26px 60px -22px rgba(0,0,0,.85),0 0 30px rgba(91,124,255,.2),inset 0 1px 0 rgba(255,255,255,.07)", backdropFilter: "blur(10px)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", borderBottom: "1px solid rgba(150,140,230,.12)" }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} />
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#febc2e" }} />
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840" }} />
                        <span style={{ marginLeft: 4, flex: 1, height: 11, borderRadius: 6, background: "rgba(150,140,230,.1)" }} />
                      </div>
                      <div style={{ padding: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 9 }}>
                          <span style={{ width: 15, height: 15, borderRadius: 5, background: "linear-gradient(135deg,var(--wd-blue),var(--wd-violet))" }} />
                          <span style={{ width: 28, height: 6, borderRadius: 3, background: "rgba(205,206,230,.4)" }} />
                          <span style={{ flex: 1 }} />
                          <span style={{ width: 34, height: 13, borderRadius: 7, background: "linear-gradient(135deg,var(--wd-blue),var(--wd-violet))" }} />
                        </div>
                        <div style={{ height: 48, borderRadius: 8, background: "linear-gradient(120deg,rgba(91,124,255,.26),rgba(139,92,246,.3) 70%)", border: "1px solid rgba(150,160,255,.16)", padding: 9, display: "flex", flexDirection: "column", gap: 5, justifyContent: "center", marginBottom: 8 }}>
                          <span style={{ width: "64%", height: 7, borderRadius: 4, background: "rgba(244,245,255,.85)" }} />
                          <span style={{ width: "42%", height: 7, borderRadius: 4, background: "linear-gradient(90deg,var(--wd-blue),var(--wd-cyan))" }} />
                        </div>
                        <div style={{ display: "flex", gap: 7 }}>
                          <div style={{ flex: 1, height: 24, borderRadius: 7, background: "rgba(150,140,230,.08)", border: "1px solid rgba(150,140,230,.12)" }} />
                          <div style={{ flex: 1, height: 24, borderRadius: 7, background: "rgba(150,140,230,.08)", border: "1px solid rgba(150,140,230,.12)" }} />
                          <div style={{ flex: 1, height: 24, borderRadius: 7, background: "rgba(150,140,230,.08)", border: "1px solid rgba(150,140,230,.12)" }} />
                        </div>
                      </div>
                      <div className="wd-scan" style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30, background: "linear-gradient(rgba(52,210,232,0),rgba(52,210,232,.3))", borderBottom: "1.5px solid var(--wd-cyan)", boxShadow: "0 0 16px rgba(52,210,232,.6)", pointerEvents: "none" }} />
                      <span className="wd-tick" style={{ position: "absolute", left: 5, top: 5, width: 13, height: 13, borderLeft: "2px solid var(--wd-cyan)", borderTop: "2px solid var(--wd-cyan)" }} />
                      <span className="wd-tick" style={{ position: "absolute", right: 5, top: 5, width: 13, height: 13, borderRight: "2px solid var(--wd-cyan)", borderTop: "2px solid var(--wd-cyan)", animationDelay: ".3s" }} />
                      <span className="wd-tick" style={{ position: "absolute", left: 5, bottom: 5, width: 13, height: 13, borderLeft: "2px solid var(--wd-cyan)", borderBottom: "2px solid var(--wd-cyan)", animationDelay: ".6s" }} />
                      <span className="wd-tick" style={{ position: "absolute", right: 5, bottom: 5, width: 13, height: 13, borderRight: "2px solid var(--wd-cyan)", borderBottom: "2px solid var(--wd-cyan)", animationDelay: ".9s" }} />
                    </div>
                    <div style={{ position: "absolute", left: 30, top: -78, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, letterSpacing: 1, color: "#5fd8ec", whiteSpace: "nowrap", textShadow: "0 0 8px rgba(52,210,232,.5)" }}>
                      <span className="wd-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--wd-cyan)", boxShadow: "0 0 8px var(--wd-cyan)" }} />
                      RENDERING · Hero.jsx
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* telemetry HUD */}
          <div className="wd-telemetry" style={{ position: "absolute", left: -26, top: 14, transform: "translateZ(60px)", width: 158, padding: "11px 13px", borderRadius: 11, background: "rgba(14,12,26,.82)", border: "1px solid rgba(139,92,246,.34)", boxShadow: "0 0 26px rgba(139,92,246,.16)", backdropFilter: "blur(8px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 9.5, letterSpacing: 1, color: "#b3a6f0", marginBottom: 8 }}>
              <span>▸ BUILD QUEUE</span><span style={{ color: "var(--wd-cyan)" }}>98%</span>
            </div>
            <div style={{ height: 6, borderRadius: 4, background: "rgba(150,140,230,.12)", overflow: "hidden", marginBottom: 9 }}>
              <div className="wd-prog" style={{ width: "100%", height: "100%", transformOrigin: "left", borderRadius: 4, background: "linear-gradient(90deg,var(--wd-blue),var(--wd-violet))" }} />
            </div>
            <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 22 }}>
              <span style={{ flex: 1, height: "40%", background: "rgba(91,124,255,.5)", borderRadius: 1 }} />
              <span style={{ flex: 1, height: "75%", background: "rgba(91,124,255,.6)", borderRadius: 1 }} />
              <span style={{ flex: 1, height: "55%", background: "rgba(139,92,246,.6)", borderRadius: 1 }} />
              <span style={{ flex: 1, height: "90%", background: "rgba(139,92,246,.7)", borderRadius: 1 }} />
              <span style={{ flex: 1, height: "65%", background: "rgba(52,210,232,.6)", borderRadius: 1 }} />
              <span style={{ flex: 1, height: "48%", background: "rgba(91,124,255,.5)", borderRadius: 1 }} />
            </div>
          </div>

          {/* floating chips */}
          <div className="wd-chip-a" style={{ position: "absolute", top: -14, right: 24, transform: "translateZ(80px)", display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 999, background: "rgba(18,20,40,.94)", border: "1px solid rgba(91,124,255,.4)", color: "#9db2ff", fontSize: 12, whiteSpace: "nowrap", boxShadow: "0 0 24px rgba(91,124,255,.22)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--wd-blue)", boxShadow: "0 0 8px var(--wd-blue)" }} />SERVO 98%
          </div>
          <div className="wd-chip-b" style={{ position: "absolute", bottom: -6, right: 54, transform: "translateZ(50px)", display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 999, background: "rgba(14,28,32,.94)", border: "1px solid rgba(52,210,232,.4)", color: "#5fd8ec", fontSize: 12, whiteSpace: "nowrap", boxShadow: "0 0 24px rgba(52,210,232,.22)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--wd-cyan)", boxShadow: "0 0 8px var(--wd-cyan)" }} />0.4s LCP
          </div>
        </div>
      </div>
    </div>
  )
}
