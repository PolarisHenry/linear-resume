import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileTabBar } from "./MobileTabBar";

const mockItems = [
  { id: "overview", label: "总览", icon: <span data-testid="icon-overview" /> },
  { id: "skills", label: "技能", icon: <span data-testid="icon-skills" /> },
];

describe("MobileTabBar", () => {
  it("renders all nav items", () => {
    render(<MobileTabBar items={mockItems} activeSection="overview" onNavigate={vi.fn()} lang="zh" onToggleLang={vi.fn()} />);
    expect(screen.getByText("总览")).toBeInTheDocument();
    expect(screen.getByText("技能")).toBeInTheDocument();
  });

  it("highlights active item", () => {
    render(<MobileTabBar items={mockItems} activeSection="skills" onNavigate={vi.fn()} lang="zh" onToggleLang={vi.fn()} />);
    const activeBtn = screen.getByRole("button", { name: "技能" });
    expect(activeBtn.className).toContain("text-[#5E6AD2]");
  });

  it("calls onNavigate when a tab is clicked", () => {
    const onNav = vi.fn();
    render(<MobileTabBar items={mockItems} activeSection="overview" onNavigate={onNav} lang="zh" onToggleLang={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "技能" }));
    expect(onNav).toHaveBeenCalledWith("skills");
  });

  it("calls onToggleLang when language button clicked", () => {
    const onToggleLang = vi.fn();
    render(<MobileTabBar items={mockItems} activeSection="overview" onNavigate={vi.fn()} lang="zh" onToggleLang={onToggleLang} />);
    fireEvent.click(screen.getByLabelText("Switch to English"));
    expect(onToggleLang).toHaveBeenCalled();
  });
});
