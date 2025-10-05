import { classNamesFunc } from "classnames-generics";
import React from "react";
import styles from "./App.module.scss";
import reactLogo from "./assets/react.svg";
import sassLogo from "./assets/sass-logo.svg";
import typescriptLogo from "./assets/typescript-logo.png";
import viteLogo from "./assets/vite.svg";
import { Button } from "./components/Button";
import { FontGallery } from "./components/FontGallery";
const classNames = classNamesFunc<keyof typeof styles>();

function App() {
  const [showFonts, setShowFonts] = React.useState(false);
  const [fontTheme, setFontTheme] = React.useState<"classic" | "alt">("alt");

  return (
    <div
      className={classNames(
        styles.root,
        fontTheme === "classic" ? styles.classic : styles.alt
      )}
    >
      <section className={styles["main-section"]}>
        <div className={styles["flex-row"]}>
          <div className={styles["logos-wrapper"]}>
            <a href="https://vite.dev" target="_blank" rel="noreferrer">
              <img src={viteLogo} className={styles.logo} alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer">
              <img
                src={reactLogo}
                className={classNames(styles.logo, styles["spinning-logo"])}
                alt="React logo"
              />
            </a>
            <a
              href="https://www.typescriptlang.org/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={typescriptLogo}
                className={styles.logo}
                alt="Typescript logo"
              />
            </a>
            <a
              href="https://sass-lang.com/"
              target="_blank"
              rel="noreferrer"
              className={styles.logo}
            >
              <img src={sassLogo} className={styles.logo} alt="Vite logo" />
            </a>
          </div>
        </div>

        <div className={styles["flex-row"]}>
          <h1 className={styles.title}>Vite + TS + React + SCSS</h1>
        </div>

        <div className={styles["flex-row"]}>
          <div
            style={{ position: "relative", display: "flex", gap: "0.75rem" }}
          >
            <Button
              className={styles["fae-btn"]}
              variant="fae"
              onClick={() => {
                setShowFonts(true);
              }}
            >
              Fonts
            </Button>
            <Button
              className={styles["fae-btn"]}
              variant="fae"
              onClick={() => {
                setFontTheme((t) => (t === "classic" ? "alt" : "classic"));
              }}
            >
              Theme: {fontTheme === "classic" ? "Classic" : "Alt"}
            </Button>
          </div>
        </div>
      </section>

      {showFonts && (
        <FontGallery
          onClose={() => {
            setShowFonts(false);
          }}
        />
      )}

      <div className="sparkles" />
    </div>
  );
}

export default App;
