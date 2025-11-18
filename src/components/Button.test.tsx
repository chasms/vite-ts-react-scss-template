import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

/**
 * Tests for Button component
 *
 * The Button component is a flexible UI element that supports:
 * - Multiple visual variants (primary, secondary, ghost, fae)
 * - Custom dimensions (width, height)
 * - Busy/loading state
 * - Standard HTML button attributes
 */
describe("Button", () => {
  /**
   * Basic Rendering
   */
  describe("when rendering basic button", () => {
    it("should render children content", () => {
      // Arrange & Act
      render(<Button>Click me</Button>);

      // Assert
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("should apply default secondary variant", () => {
      // Arrange & Act
      const { container } = render(<Button>Default</Button>);

      // Assert
      const button = container.querySelector("button");
      expect(button).toHaveClass("secondary");
    });
  });

  /**
   * Variant Styling
   */
  describe("when applying variants", () => {
    it("should apply primary variant class", () => {
      // Arrange & Act
      const { container } = render(<Button variant="primary">Primary</Button>);

      // Assert
      const button = container.querySelector("button");
      expect(button).toHaveClass("primary");
    });

    it("should apply ghost variant class", () => {
      // Arrange & Act
      const { container } = render(<Button variant="ghost">Ghost</Button>);

      // Assert
      const button = container.querySelector("button");
      expect(button).toHaveClass("ghost");
    });

    it("should apply fae variant class", () => {
      // Arrange & Act
      const { container } = render(<Button variant="fae">Fae</Button>);

      // Assert
      const button = container.querySelector("button");
      expect(button).toHaveClass("fae");
    });
  });

  /**
   * Custom Dimensions
   */
  describe("when setting custom dimensions", () => {
    it("should apply numeric width as pixels", () => {
      // Arrange & Act
      render(<Button width={200}>Sized Button</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ width: "200px" });
    });

    it("should apply string width directly", () => {
      // Arrange & Act
      render(<Button width="100%">Full Width</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ width: "100%" });
    });

    it("should apply numeric height as pixels", () => {
      // Arrange & Act
      render(<Button height={50}>Tall Button</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ height: "50px" });
    });

    it("should apply string height directly", () => {
      // Arrange & Act
      render(<Button height="3rem">Tall Button</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ height: "3rem" });
    });

    it("should merge width and height with other styles", () => {
      // Arrange & Act
      render(
        <Button width={150} height={40} style={{ padding: "10px" }}>
          Custom Styled
        </Button>
      );

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveStyle({
        width: "150px",
        height: "40px",
        padding: "10px",
      });
    });
  });

  /**
   * Busy State
   */
  describe("when in busy state", () => {
    it("should disable button when busy is true", () => {
      // Arrange & Act
      render(<Button busy={true}>Loading</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should set aria-busy attribute when busy", () => {
      // Arrange & Act
      render(<Button busy={true}>Loading</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("should not set aria-busy when not busy", () => {
      // Arrange & Act
      render(<Button busy={false}>Not Loading</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("aria-busy");
    });
  });

  /**
   * Disabled State
   */
  describe("when disabled", () => {
    it("should be disabled when disabled prop is true", () => {
      // Arrange & Act
      render(<Button disabled={true}>Disabled</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should use disabled prop when explicitly set even if busy", () => {
      // Arrange & Act
      // Note: The implementation uses ?? (nullish coalescing), so explicit false takes precedence
      render(
        <Button busy={true} disabled={false}>
          Busy but not disabled
        </Button>
      );

      // Assert
      const button = screen.getByRole("button");
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
    });
  });

  /**
   * User Interactions
   */
  describe("when user interacts with button", () => {
    it("should call onClick handler when clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click Me</Button>);

      // Act
      const button = screen.getByRole("button");
      await user.click(button);

      // Assert
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} disabled={true}>
          Disabled
        </Button>
      );

      // Act
      const button = screen.getByRole("button");
      await user.click(button);

      // Assert
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should not call onClick when busy", async () => {
      // Arrange
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} busy={true}>
          Busy
        </Button>
      );

      // Act
      const button = screen.getByRole("button");
      await user.click(button);

      // Assert
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  /**
   * Custom ClassName
   */
  describe("when applying custom className", () => {
    it("should merge custom className with default classes", () => {
      // Arrange & Act
      const { container } = render(
        <Button className="custom-class" variant="primary">
          Custom
        </Button>
      );

      // Assert
      const button = container.querySelector("button");
      expect(button).toHaveClass("custom-class");
      expect(button).toHaveClass("primary");
    });
  });

  /**
   * HTML Button Attributes
   */
  describe("when using standard HTML attributes", () => {
    it("should forward type attribute", () => {
      // Arrange & Act
      render(<Button type="submit">Submit</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("should forward name attribute", () => {
      // Arrange & Act
      render(<Button name="action-button">Action</Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("name", "action-button");
    });

    it("should forward aria-label attribute", () => {
      // Arrange & Act
      render(<Button aria-label="Close dialog">×</Button>);

      // Assert
      const button = screen.getByRole("button", { name: /close dialog/i });
      expect(button).toBeInTheDocument();
    });
  });

  /**
   * Edge Cases
   */
  describe("edge cases", () => {
    it("should handle undefined dimensions gracefully", () => {
      // Arrange & Act
      render(
        <Button width={undefined} height={undefined}>
          No Dimensions
        </Button>
      );

      // Assert
      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("style");
    });

    it("should not apply style when both dimensions are zero", () => {
      // Arrange & Act
      // Note: 0 is falsy, so width || height || style = false, resulting in no style
      render(
        <Button width={0} height={0}>
          Zero Size
        </Button>
      );

      // Assert
      const button = screen.getByRole("button");
      expect(button).not.toHaveAttribute("style");
    });

    it("should render with empty children", () => {
      // Arrange & Act
      render(<Button></Button>);

      // Assert
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
    });
  });
});
