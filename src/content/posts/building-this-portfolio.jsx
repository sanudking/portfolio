/**
 * Body for /writing/building-this-portfolio.
 *
 * Written as JSX rather than markdown so the prose can use real semantic
 * elements without pulling in a parser or a renderer. Long-form typography
 * lives in src/styles/blog.css under `.post-body`.
 */
import { Link } from "react-router-dom";

function BuildingThisPortfolio() {
  return (
    <>
      <p className="post-lede">
        The first version of this site had a nice hero and nothing behind it.
        The planet spun, the gradient text shimmered, and every page below the
        fold was a placeholder. That felt backwards. A portfolio should be the
        proof, not the promise — so the rebuild started with the least visible
        part: the design tokens.
      </p>

      <p>
        This is a tour of what ended up in the current build: a 3D planet that
        doubles as a theme switcher, a canvas starfield that reacts to scroll
        velocity, and a set of motion helpers that quietly switch themselves off
        when they should. It is not a tutorial in the sense of “copy these
        files.” It is closer to the notes I wish I had before I started.
      </p>

      <h2>Start with tokens, not components</h2>

      <p>
        The site has three themes — Earth, Sun and Moon — and every component
        reads from the same small set of custom properties. Nothing in the
        component tree knows which theme is active. It just asks for{" "}
        <code>var(--accent)</code> and gets whatever the current planet decided
        that should be.
      </p>

      <pre>
        <code>{`:root {
  --bg: #08080c;
  --surface: rgba(255, 255, 255, 0.04);
  --accent: #38bdf8;
  --accent-2: #a78bfa;
  --border: rgba(255, 255, 255, 0.1);
}

:root[data-theme="sun"] {
  --bg: #0d0906;
  --accent: #fbbf24;
  --accent-2: #fb7185;
  --border: rgba(255, 210, 165, 0.12);
}

:root[data-theme="moon"] {
  --bg: #06080f;
  --accent: #e2e8f0;
  --accent-2: #a5b4fc;
  --border: rgba(203, 213, 225, 0.12);
}`}</code>
      </pre>

      <p>
        The payoff is that the theme switch is one attribute on the{" "}
        <code>&lt;html&gt;</code> element. The starfield, the buttons, the
        cards, the code blocks in this post — all of it re-skins through the
        cascade. There is no JavaScript color map to keep in sync, and no
        component needs a <code>theme</code> prop.
      </p>

      <p>
        The one thing that does need to run early is the theme itself. A small
        inline script in <code>index.html</code> reads the saved planet from{" "}
        <code>localStorage</code> before React mounts, so the first paint is
        already the right color instead of flashing the default and correcting
        itself a frame later.
      </p>

      <h2>The planet is the theme switcher</h2>

      <p>
        The hero is a <code>model-viewer</code> element pointed at one of three
        GLB files. The camera is locked to a horizontal orbit, zoom and pan are
        disabled, and the model rotates at eight degrees per second. The
        constraints are deliberate: the planet should feel alive, not like
        something you have to fight with the mouse.
      </p>

      <p>
        Choosing a planet does three things in one effect — writes the theme
        attribute, saves the choice, and updates the browser chrome color on
        mobile:
      </p>

      <pre>
        <code>{`useEffect(() => {
  document.documentElement.dataset.theme = activePlanet.id;
  localStorage.setItem("planet", activePlanet.id);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", activePlanet.bg);
}, [activePlanet]);`}</code>
      </pre>

      <p>
        The detail I ended up liking most is the hand-off. When you switch
        planets, both the outgoing and incoming models rotate half a turn, so
        the one you are leaving spins away while the new one arrives. It is a
        small thing, but it makes the switch feel like an exchange rather than a
        hard cut.
      </p>

      <p>
        The switcher is a real button group, not a row of clickable divs: each
        button carries <code>aria-pressed</code>, an <code>aria-label</code> and
        a title, and the group has its own label. The visual state and the
        accessible state are driven by the same value, so they cannot drift.
      </p>

      <h2>Loading 3D without wrecking the first paint</h2>

      <p>
        A 3D library is a lot of JavaScript to hand someone who just wants to
        read a heading. The hero therefore renders its text and a poster image
        first, and only mounts the 3D scene once the browser is idle. The canvas
        component is a lazy import, which means <code>model-viewer</code> lands
        in its own async chunk instead of the entry bundle.
      </p>

      <pre>
        <code>{`const HeroPlanetCanvas = lazy(() => import("./HeroPlanetCanvas"));

// Mount the scene after first paint, with a timeout for browsers
// that do not implement requestIdleCallback.
if (typeof window.requestIdleCallback === "function") {
  idleId = window.requestIdleCallback(start, { timeout: 1500 });
} else {
  timeoutId = window.setTimeout(start, 250);
}`}</code>
      </pre>

      <p>
        The poster stays visible until the model fires its <code>load</code>{" "}
        event, then fades out. That gives the hero a useful first frame
        immediately and avoids the empty box you get when a GLB is still on the
        wire. The poster is marked <code>fetchPriority="high"</code>; the model
        can wait.
      </p>

      <p>
        The Vite config does the rest. <code>model-viewer</code> and its Lit
        dependencies are grouped into one chunk, Framer Motion into another, and
        React plus the router into a third. The result is that the initial
        download is mostly the app shell, and the heavy parts arrive when they
        are actually needed.
      </p>

      <h2>A starfield with mass</h2>

      <p>
        The background is a single <code>&lt;canvas&gt;</code> and no library.
        Particles are seeded from the viewport area — roughly one per 12,500
        pixels, clamped between 36 and 170 — and each one gets a depth value
        between 0.3 and 1. Depth controls radius, opacity and how strongly the
        particle reacts to parallax, which is enough to fake a volume without a
        real 3D scene.
      </p>

      <pre>
        <code>{`const count = clamp(
  Math.floor((width * height) / 12500),
  MIN_PARTICLES, // 36
  MAX_PARTICLES  // 170
);

// Cap DPR so a 3x phone does not render 9x the pixels.
dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = Math.round(width * dpr);
canvas.height = Math.round(height * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);`}</code>
      </pre>

      <p>
        Scrolling feeds velocity into the field. The per-frame delta is clamped
        to ±80 pixels and scaled by depth, so scrolling down pushes the dust
        upward past the viewer and nearer particles move further. When a
        particle gets fast enough, it stretches into a short comet trail. The
        cursor does something similar: it pushes particles away, bends their
        path around itself, and draws faint links between any dust inside a
        210-pixel radius.
      </p>

      <p>
        Shooting stars are the fun part. They spawn every four and a half to
        twelve seconds, and as they pass they push nearby particles out of the
        way, drag them along the direction of travel, and add a little swirl.
        The particles also pick up a flash that decays over the next few frames,
        so the wake glows briefly and then settles.
      </p>

      <p>
        Because the colors come from CSS variables, the starfield does not need
        to know about themes either. It reads <code>--accent</code> and{" "}
        <code>--accent-2</code> with <code>getComputedStyle</code> and listens
        for changes to the <code>data-theme</code> attribute with a{" "}
        <code>MutationObserver</code>. Switch to Sun and the dust turns amber
        without a reload.
      </p>

      <p>
        The performance guards matter as much as the visuals. The loop stops
        when the tab is hidden, renders a single static frame when the user
        prefers reduced motion, and skips the comet trails on coarse pointers.
        Resizing rescales existing particles instead of reseeding them, so
        dragging a mobile URL bar around does not reset the field.
      </p>

      <h2>Scroll velocity as a design material</h2>

      <p>
        The inertial effects all come from one shared value. A provider reads{" "}
        <code>scrollY</code>, derives its velocity, and smooths it with a spring
        so the motion has weight instead of snapping:
      </p>

      <pre>
        <code>{`const { scrollY } = useScroll();
const rawVelocity = useVelocity(scrollY);
const smoothVelocity = useSpring(rawVelocity, {
  stiffness: 160,
  damping: 26,
  mass: 0.6,
});

const y = useTransform(
  smoothVelocity,
  [-2200, 0, 2200],
  [-distance, 0, distance],
  { clamp: true }
);`}</code>
      </pre>

      <p>
        Any element can then opt into the effect with an <code>Inertial</code>{" "}
        wrapper. The wrapper maps velocity to a vertical offset and, optionally,
        a small rotation, scaled by <code>depth</code> and <code>lag</code>.
        Headers use a shallow depth so they drift a little; the hero planet uses
        a deeper one so it moves more. The same velocity also feeds a CSS
        variable that stretches the short line next to section eyebrows by up to
        30 percent.
      </p>

      <p>
        Two multipliers keep this from becoming obnoxious. Reduced motion sets
        the scale to zero, which disables the effect everywhere at once. Coarse
        pointers get 0.55, because the same amount of movement that feels
        playful under a mouse feels like drift on a phone. Neither decision is
        scattered across components — both live in the provider.
      </p>

      <h2>Metadata, routing and the unglamorous accessibility work</h2>

      <p>
        A single <code>RouteEffects</code> component handles the things that
        should happen on every navigation: scroll back to the top, and keep the
        document title, description, social tags and canonical URL in sync with
        the current route. The metadata map is static for fixed pages and
        resolves blog slugs against the post data, so a post gets its own title
        and description without every page repeating the same boilerplate.
      </p>

      <p>
        The rest is a list of small decisions that are easy to skip and annoying
        to retrofit:
      </p>

      <ul>
        <li>
          A skip link that jumps straight to a focusable <code>&lt;main&gt;</code>{" "}
          landmark, with the stray focus ring suppressed only on that landmark.
        </li>
        <li>
          A mobile menu that closes on navigation, on Escape, and on an outside
          click — and hands focus back to the toggle when Escape is used.
        </li>
        <li>
          Background scroll locked while the menu is open, with the lock
          released if the viewport crosses back to desktop.
        </li>
        <li>
          A passive scroll listener that schedules its work with{" "}
          <code>requestAnimationFrame</code>, and a <code>ResizeObserver</code>{" "}
          that keeps the anchor offset in sync with the actual navbar height.
        </li>
        <li>
          Reduced motion honored in three separate places: the scroll provider,
          the inertial wrapper, and the starfield loop.
        </li>
      </ul>

      <p>
        None of this shows up in a screenshot. All of it shows up the moment
        someone navigates the site with a keyboard or a screen reader.
      </p>

      <h2>What I would do differently</h2>

      <p>
        Two things, in order of how much time they would have saved.
      </p>

      <ol>
        <li>
          <strong>Define the tokens before the first component.</strong> I added
          themes halfway through, which meant auditing every hard-coded color.
          Starting with a small set of variables would have made the theme
          switcher almost free.
        </li>
        <li>
          <strong>Set a performance budget for the 3D.</strong> “It looks good on
          my laptop” is not a budget. Deciding up front that the model must
          never block first paint is what led to the lazy import, the poster and
          the chunk split.
        </li>
      </ol>

      <p>
        The through-line is that motion and 3D are layers, not foundations. The
        site has to work as text first — readable, navigable, fast — and the
        planets are what make it memorable once that is true.
      </p>

      <p>
        The source is on{" "}
        <a
          href="https://github.com/sanudking/portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        , and the project write-up is on the{" "}
        <Link to="/projects#portfolio-website">projects page</Link>. If you spot
        something in here that could be simpler, I would genuinely like to hear
        about it.
      </p>
    </>
  );
}

export default BuildingThisPortfolio;
