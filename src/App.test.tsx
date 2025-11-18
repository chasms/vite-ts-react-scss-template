import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/**
 * Tests for App component
 *
 * The App component is the main application container that:
 * - Displays technology logos (Vite, React, TypeScript, Sass)
 * - Provides theme switching functionality
 * - Opens/closes the FontGallery modal
 */
describe("App", () => {
  beforeEach(() => {
    // Clear any font links that might have been added by previous tests
    document.head
      .querySelectorAll('link[href*="fonts.googleapis.com"]')
      .forEach((link) => {
        link.remove();
      });
  });

  /**
   * Basic Rendering
   */
  describe("when rendering the application", () => {
    it("should render the main title", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      expect(screen.getByText("Vite + TS + React + SCSS")).toBeInTheDocument();
    });

    it("should render technology logos", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const viteLogos = screen.getAllByAltText(/vite logo/i);
      expect(viteLogos.length).toBeGreaterThan(0);
      expect(screen.getByAltText(/react logo/i)).toBeInTheDocument();
      expect(screen.getByAltText(/typescript logo/i)).toBeInTheDocument();
    });

    it("should render Fonts button", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      expect(
        screen.getByRole("button", { name: /fonts/i })
      ).toBeInTheDocument();
    });

    it("should render Theme button with initial theme", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      expect(
        screen.getByRole("button", { name: /theme: alt/i })
      ).toBeInTheDocument();
    });
  });

  /**
   * Logo Links
   */
  describe("when displaying logo links", () => {
    it("should link to Vite website", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const links = screen.getAllByRole("link");
      const viteLink = links.find(
        (link) => link.getAttribute("href") === "https://vite.dev"
      );
      expect(viteLink).toBeDefined();
      expect(viteLink).toHaveAttribute("target", "_blank");
    });

    it("should link to React website", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const reactLink = screen.getByRole("link", { name: /react logo/i });
      expect(reactLink).toHaveAttribute("href", "https://react.dev");
      expect(reactLink).toHaveAttribute("target", "_blank");
    });

    it("should link to TypeScript website", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const tsLink = screen.getByRole("link", { name: /typescript logo/i });
      expect(tsLink).toHaveAttribute("href", "https://www.typescriptlang.org/");
      expect(tsLink).toHaveAttribute("target", "_blank");
    });

    it("should link to Sass website", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const links = screen.getAllByRole("link");
      const sassLink = links.find(
        (link) => link.getAttribute("href") === "https://sass-lang.com/"
      );
      expect(sassLink).toBeDefined();
      expect(sassLink).toHaveAttribute("target", "_blank");
    });
  });

  /**
   * Theme Switching
   */
  describe("when switching themes", () => {
    it("should toggle from Alt to Classic theme", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act
      const themeButton = screen.getByRole("button", { name: /theme: alt/i });
      await user.click(themeButton);

      // Assert
      expect(
        screen.getByRole("button", { name: /theme: classic/i })
      ).toBeInTheDocument();
    });

    it("should toggle from Classic back to Alt theme", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act
      const themeButton = screen.getByRole("button", { name: /theme: alt/i });
      await user.click(themeButton); // Alt -> Classic
      await user.click(screen.getByRole("button", { name: /theme: classic/i })); // Classic -> Alt

      // Assert
      expect(
        screen.getByRole("button", { name: /theme: alt/i })
      ).toBeInTheDocument();
    });

    it("should apply correct theme class to root element", async () => {
      // Arrange
      const user = userEvent.setup();
      const { container } = render(<App />);

      // Assert initial state - Alt theme
      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass("alt");
      expect(rootDiv).not.toHaveClass("classic");

      // Act - Switch to Classic
      const themeButton = screen.getByRole("button", { name: /theme: alt/i });
      await user.click(themeButton);

      // Assert - Classic theme applied
      expect(rootDiv).toHaveClass("classic");
      expect(rootDiv).not.toHaveClass("alt");
    });
  });

  /**
   * Font Gallery Modal
   */
  describe("when interacting with font gallery", () => {
    it("should not display font gallery initially", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      expect(screen.queryByText("Font Gallery")).not.toBeInTheDocument();
    });

    it("should open font gallery when Fonts button is clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act
      const fontsButton = screen.getByRole("button", { name: /fonts/i });
      await user.click(fontsButton);

      // Assert
      expect(screen.getByText("Font Gallery")).toBeInTheDocument();
    });

    it("should close font gallery when Close button is clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act - Open gallery
      const fontsButton = screen.getByRole("button", { name: /fonts/i });
      await user.click(fontsButton);

      // Verify it's open
      expect(screen.getByText("Font Gallery")).toBeInTheDocument();

      // Act - Close gallery
      const closeButton = screen.getByRole("button", { name: /close/i });
      await user.click(closeButton);

      // Assert
      expect(screen.queryByText("Font Gallery")).not.toBeInTheDocument();
    });

    it("should display font samples in the gallery", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act
      const fontsButton = screen.getByRole("button", { name: /fonts/i });
      await user.click(fontsButton);

      // Assert - Check for some font names
      expect(screen.getByText("Cinzel Decorative")).toBeInTheDocument();
      expect(screen.getByText("Cormorant SC")).toBeInTheDocument();
    });
  });

  /**
   * Button Variants
   */
  describe("when rendering buttons", () => {
    it("should apply fae variant to Fonts button", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const fontsButton = screen.getByRole("button", { name: /fonts/i });
      expect(fontsButton).toHaveClass("fae");
    });

    it("should apply fae variant to Theme button", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const themeButton = screen.getByRole("button", { name: /theme/i });
      expect(themeButton).toHaveClass("fae");
    });
  });

  /**
   * Sparkles Element
   */
  describe("when rendering decorative elements", () => {
    it("should render sparkles div", () => {
      // Arrange & Act
      const { container } = render(<App />);

      // Assert
      const sparkles = container.querySelector(".sparkles");
      expect(sparkles).toBeInTheDocument();
    });
  });

  /**
   * Accessibility
   */
  describe("accessibility", () => {
    it("should have accessible buttons", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach((button) => {
        expect(button).toHaveAccessibleName();
      });
    });

    it("should have accessible links with rel='noreferrer'", () => {
      // Arrange & Act
      render(<App />);

      // Assert
      const links = screen.getAllByRole("link");
      links.forEach((link) => {
        if (link.getAttribute("target") === "_blank") {
          expect(link).toHaveAttribute("rel", "noreferrer");
        }
      });
    });
  });

  /**
   * State Management
   */
  describe("state management", () => {
    it("should maintain independent states for theme and font gallery", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act - Open font gallery
      await user.click(screen.getByRole("button", { name: /fonts/i }));
      expect(screen.getByText("Font Gallery")).toBeInTheDocument();

      // Act - Change theme while gallery is open
      const themeButton = screen.getByRole("button", { name: /theme: alt/i });
      await user.click(themeButton);

      // Assert - Both states should be maintained
      expect(screen.getByText("Font Gallery")).toBeInTheDocument(); // Gallery still open
      expect(
        screen.getByRole("button", { name: /theme: classic/i })
      ).toBeInTheDocument(); // Theme changed
    });
  });

  /**
   * Edge Cases
   */
  describe("edge cases", () => {
    it("should render without crashing", () => {
      // Arrange & Act
      expect(() => render(<App />)).not.toThrow();
    });

    it("should handle rapid theme switching", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act - Rapidly toggle theme multiple times
      const themeButton = screen.getByRole("button", { name: /theme/i });
      await user.click(themeButton);
      await user.click(screen.getByRole("button", { name: /theme/i }));
      await user.click(screen.getByRole("button", { name: /theme/i }));

      // Assert - Should still function correctly
      expect(
        screen.getByRole("button", { name: /theme/i })
      ).toBeInTheDocument();
    });

    it("should handle rapid font gallery open/close", async () => {
      // Arrange
      const user = userEvent.setup();
      render(<App />);

      // Act - Rapidly open and close gallery
      await user.click(screen.getByRole("button", { name: /fonts/i }));
      await user.click(screen.getByRole("button", { name: /close/i }));
      await user.click(screen.getByRole("button", { name: /fonts/i }));

      // Assert - Gallery should be open
      expect(screen.getByText("Font Gallery")).toBeInTheDocument();
    });
  });
});
