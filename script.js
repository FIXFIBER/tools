// Register GSAP Plugins
gsap.registerPlugin(MotionPathPlugin);

// Select elements
const startClick = document.getElementById("startClick");
const restartClick = document.getElementById("restartClick");
const lines = document.querySelectorAll(".line");

// Helper to set up dashed lines for drawing effect (simulating DrawSVG)
function setupMaskDraw(pathId) {
    const path = document.querySelector(pathId);
    if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        return length;
    }
    return 0;
}

// Setup all mask paths
const maskPaths = [
    "#path1_m", "#path2_m", "#path2_1_m", "#path3_m", "#path4_m", 
    "#path5_m", "#path6_m", "#path8_m", 
    "#path9_m", "#path10_m", "#path11_m"
];
maskPaths.forEach(id => setupMaskDraw(id));

// Timelines
const mainTl = gsap.timeline({ paused: true });
const startTl = gsap.timeline({ paused: true });
const restartTl = gsap.timeline({ paused: true });

// Initial States
gsap.set("#ball", { xPercent: -50, yPercent: -50 });
gsap.set("#paths", { opacity: 1 });
gsap.set("#restartText", { autoAlpha: 0 });
gsap.set("#restartClick", { autoAlpha: 0 });
gsap.set("#com_circle", { autoAlpha: 0 });
gsap.set("#i", { opacity: 0, fill: "rgba(255,255,255,0.5)" });
gsap.set("#shine", { opacity: 0 });
gsap.set("#subText", { autoAlpha: 0, x: 100 }); // Prepare Triad text to slide in

// Idle Animation (Pulse)
const idleBall = gsap.to("#ball", {
    scale: 1.3,
    duration: 0.6,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
});

// --- Animation Logic ---

// 1. Start to R
// Drop with gravity (power2.in) and stretch
mainTl.to("#ball", {
    duration: 1.5,
    motionPath: { path: "#path1", align: "#path1", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "power2.in",
    onStart: () => gsap.to("#ball", { scaleX: 0.6, scaleY: 1.4, duration: 1.5 }) // Stretch falling
}, 0);
mainTl.to("#path1_m", { duration: 1.5, strokeDashoffset: 0, ease: "power2.in" }, 0);
mainTl.add(() => letterTouch("#mainText", { rotation: 2, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 1.5);
mainTl.to("#r_circle", { duration: 2, attr: { r: 200 } }, 1.5);
mainTl.to("#path1_m", { duration: 0.3, opacity: 0 }, 1.8);

// 2. R to C1/C2
// Arc physics (Fast -> Slow -> Fast) using 'slow' ease
mainTl.to("#ball", {
    duration: 1.4,
    motionPath: { path: "#path2", align: "#path2", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "slow(0.3, 0.7, false)",
    onStart: () => gsap.to("#ball", { scaleX: 1.3, scaleY: 0.7, duration: 1.4 }) // Stretch horizontal
}, 1.5);
mainTl.to("#path2_m", { duration: 1.4, strokeDashoffset: 0, ease: "slow(0.3, 0.7, false)" }, 1.5);
mainTl.add(() => letterTouch("#mainText", { rotation: -2, scaleY: 0.95, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 1.5);
mainTl.add(() => letterTouch("#mainText", { rotation: 2, scaleY: 0.95, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 1.6);
mainTl.to("#path2_m", { duration: 0.5, opacity: 0 }, 2.9);

// 3. C1 to E
mainTl.to("#ball", {
    duration: 0.6,
    motionPath: { path: "#path2_1", align: "#path2_1", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "slow(0.3, 0.7, false)",
    onStart: () => gsap.to("#ball", { scaleX: 1.3, scaleY: 0.7, duration: 0.6 })
}, 2.9);
mainTl.to("#path2_1_m", { duration: 0.6, strokeDashoffset: 0, ease: "slow(0.3, 0.7, false)" }, 2.9);
mainTl.add(() => letterTouch("#mainText", { rotation: 2, scaleY: 0.95, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 2.9);
mainTl.to("#e_circle", { duration: 2, attr: { r: 200 } }, 2.9);
mainTl.to("#path2_1_m", { duration: 0.5, opacity: 0 }, 3.5);

// 4. E to T (Impact 1)
mainTl.to("#ball", {
    duration: 0.5,
    motionPath: { path: "#path3", align: "#path3", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "slow(0.3, 0.7, false)",
    onStart: () => gsap.to("#ball", { scaleX: 1.3, scaleY: 0.7, duration: 0.5 })
}, 3.5);
mainTl.to("#path3_m", { duration: 0.5, strokeDashoffset: 0, ease: "slow(0.3, 0.7, false)" }, 3.5);
mainTl.add(() => letterTouch("#mainText", { scaleY: 0.9, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 3.5);
mainTl.to("#path3_m", { duration: 0.4, opacity: 0 }, 4.0);

// 5. T Impact 2
mainTl.to("#ball", {
    duration: 0.4,
    motionPath: { path: "#path4", align: "#path4", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "slow(0.3, 0.7, false)",
    onStart: () => gsap.to("#ball", { scaleX: 1.3, scaleY: 0.7, duration: 0.4 })
}, 4.0);
mainTl.to("#path4_m", { duration: 0.4, strokeDashoffset: 0, ease: "slow(0.3, 0.7, false)" }, 4.0);
mainTl.add(() => letterTouch("#mainText", { rotation: 1, scaleY: 0.95, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 4.0);
mainTl.to("#tHide", { duration: 0.2, y: 67, ease: "elastic.out(1, 0.3)" }, 4.0);
mainTl.to("#path4_m", { duration: 0.3, opacity: 0 }, 4.4);

// 6. T to C (com)
mainTl.to("#ball", {
    duration: 0.3,
    motionPath: { path: "#path5", align: "#path5", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "power1.in",
    onStart: () => gsap.to("#ball", { scaleX: 1.2, scaleY: 0.8, duration: 0.3 })
}, 4.4);
mainTl.to("#path5_m", { duration: 0.3, strokeDashoffset: 0, ease: "power1.in" }, 4.4);
mainTl.add(() => letterTouch("#mainText", { scaleY: 0.95, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 4.4);
mainTl.to("#tHide", { duration: 0.3, y: 134, ease: "elastic.out(1, 0.3)" }, 4.4);
mainTl.to("#path5_m", { duration: 0.3, opacity: 0 }, 4.7);

// 7. C (com) to M
mainTl.to("#ball", {
    duration: 0.2,
    motionPath: { path: "#path6", align: "#path6", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "power1.out"
}, 4.7);
mainTl.to("#path6_m", { duration: 0.2, strokeDashoffset: 0, ease: "power1.out" }, 4.7);
mainTl.set("#com_circle", { autoAlpha: 1 }, 5.2);
mainTl.to("#com_circle", { duration: 1.5, attr: { r: 200 } }, 5.2);
mainTl.to("#path6_m", { duration: 0.3, opacity: 0 }, 5.0);

// 8. Bounce on M
mainTl.to("#ball", { duration: 0.3, y: "-=80", ease: "power1.out" }, 4.9);
mainTl.to("#ball", { duration: 0.6, y: "+=80", ease: "bounce.out" }, 5.2);
mainTl.to("#subText", { duration: 1.2, autoAlpha: 1, x: 0, ease: "power3.out" }, 5.0); // Slide in Triad smoothly

// 9. Falling Dot
gsap.set("#dot_com", { y: -1000 });
mainTl.to("#dot_com", { duration: 0.7, y: 0, ease: "bounce.out" }, 5.5);

// 10. M to O
mainTl.to("#ball", {
    duration: 0.6,
    motionPath: { path: "#path8", align: "#path8", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "slow(0.3, 0.7, false)",
    onStart: () => gsap.to("#ball", { scaleX: 1.3, scaleY: 0.7, duration: 0.6 })
}, 5.8);
mainTl.to("#path8_m", { duration: 0.6, strokeDashoffset: 0, ease: "slow(0.3, 0.7, false)" }, 5.8);
mainTl.to("#mainText", { duration: 0.15, scaleY: 0.95, transformOrigin: "50% 50%", yoyo: true, repeat: 1 }, 6.6);
mainTl.to("#path8_m", { duration: 0.3, opacity: 0 }, 6.4);

// 11. Path 9 (Curve to Zig Zag)
mainTl.to("#ball", {
    duration: 0.6,
    motionPath: { path: "#path9", align: "#path9", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "slow(0.3, 0.7, false)",
    onStart: () => gsap.to("#ball", { scaleX: 1.3, scaleY: 0.7, duration: 0.6 })
}, 6.4);
mainTl.to("#path9_m", { duration: 0.6, strokeDashoffset: 0, ease: "slow(0.3, 0.7, false)" }, 6.4);

// 12. Zig Zag (H)
mainTl.to("#ball", {
    duration: 0.6,
    motionPath: { path: "#path10", align: "#path10", alignOrigin: [0.5, 0.5], autoRotate: true },
    ease: "none",
    onStart: () => gsap.to("#ball", { scaleX: 1.2, scaleY: 0.8, duration: 0.6 })
}, 7.0);
mainTl.to("#path10_m", { duration: 0.6, strokeDashoffset: 0, ease: "none" }, 7.0);
mainTl.add(() => letterTouch("#mainText", { rotation: 2, scaleY: 0.95, transformOrigin: "50% 50%", ease: "elastic.out(1, 0.5)" }), 7.0);
mainTl.to("#h_circle", { duration: 0.3, attr: { r: 200 } }, 7.0);
mainTl.to("#path9_m", { duration: 0.3, opacity: 0 }, 7.0);
mainTl.to("#path10_m", { duration: 0.3, opacity: 0 }, 7.6);

// 13. H to i (Axis) - Jump to the 'i'
mainTl.to("#ball", {
    duration: 1.2,
    x: 665, // Absolute X: ~861 (Calculated to land on 'i')
    ease: "power1.out"
}, 7.6);

mainTl.to("#ball", {
    duration: 0.5,
    y: 221.2, // Jump peak Y: 300 (Calculated from start cy 78.8)
    ease: "circ.out"
}, 7.6);

// 14. Land on i
mainTl.to("#ball", {
    duration: 0.7,
    y: 361.2, // Land Y: 440 (Dot position)
    ease: "bounce.out"
}, 8.1);

// Ball becomes the dot - no restart text needed immediately
mainTl.to("#ball", { duration: 0.2, scale: 1, fill: "red" }, 8.8);

// 15. Show Glitch Overlay (CVE / Fed Territory)
mainTl.to("#glitchOverlay", { duration: 1.0, autoAlpha: 1, pointerEvents: "all" }, 9.2);

// Redirect to tools.html after 2 seconds
mainTl.add(() => {
    window.location.href = "tools.html";
}, "+=2");

// 16. Restart Text
// (Optional: You can enable this if you want the restart button to appear later)
// mainTl.set("#restartClick", { autoAlpha: 1 }, 11.1);
// mainTl.to("#restartText", { duration: 1, autoAlpha: 1 }, 11.1);

// --- Start Button Animation ---
// Wiggle "Click Start"
gsap.to("#arrow_click", { 
    duration: 0.5, 
    rotation: 5, 
    scaleY: 0.8, 
    x: 5, 
    transformOrigin: "50% 50%", 
    delay: 1.2, 
    ease: "elastic.out(1, 0.3)" 
});

// Start Text Shake
startTl.fromTo("#startText", { x: -1 }, { 
    duration: 0.3, 
    x: 1, 
    ease: "elastic.out(1, 0.5)", 
    clearProps: "x" 
});
startTl.to("#startText", { duration: 0.5, autoAlpha: 0 });
startTl.set("#startClick", { autoAlpha: 0 });

// --- Restart Button Animation ---
restartTl.set("#restartText", { autoAlpha: 1 });
// restartTl.to("#r_restart", { duration: 0.5, scale: 0, transformOrigin: "50% 50%" }); // Removed old restart path logic
restartTl.fromTo("#restartText", { x: -2 }, { 
    duration: 0.3, 
    x: 2, 
    ease: "elastic.out(1, 0.5)", 
    clearProps: "x" 
});
restartTl.to("#restartText", { duration: 1, autoAlpha: 0 });

// --- Event Listeners ---
idleBall.kill();
startTl.restart();
mainTl.timeScale(1).play();
gsap.to("#arrow_click", { duration: 0.5, autoAlpha: 0 });

restartClick.addEventListener("mousedown", () => {
    restartTl.restart();
    mainTl.restart();
});

// --- Helper Functions ---
function letterTouch(letter, wiggleVars) {
    // Removed fill animation to maintain knockout effect
    gsap.to(letter, { duration: 0.3, ...wiggleVars });
    gsap.to("#ball", { duration: 0.05, scaleX: 1.4, scaleY: 0.6, fill: "#faa9a9", yoyo: true, repeat: 1 }); // Squash on impact
    // gsap.to("#ball", { duration: 0.06, scaleY: 0.5, yoyo: true, repeat: 1 });

    // Impact Lines
    gsap.set("#lines", { opacity: 1 });
    // Reset lines
    gsap.set(lines[0], { attr: { x2: 197 } });
    gsap.set(lines[1], { attr: { x1: 203 } });
    gsap.set(lines[2], { attr: { y2: 407 } });
    gsap.set(lines[3], { attr: { y2: 406.5, x2: 196.4 } });
    gsap.set(lines[4], { attr: { y2: 407, x2: 202.8 } });

    // Animate lines out
    gsap.to(lines[0], { duration: 0.5, attr: { x2: 183 } });
    gsap.to(lines[1], { duration: 0.5, attr: { x1: 216.2 } });
    gsap.to(lines[2], { duration: 0.5, attr: { y2: 421 } });
    gsap.to(lines[3], { duration: 0.5, attr: { y2: 416.2, x2: 186.7 } });
    gsap.to(lines[4], { duration: 0.5, attr: { y2: 416.6, x2: 212.5 } });
    gsap.to("#lines", { duration: 0.5, opacity: 0, delay: 0.1 });
}