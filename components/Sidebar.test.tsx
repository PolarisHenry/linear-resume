import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

const mockItems = [
  { id: "overview", label: "总览", icon: <span data-testid="icon-overview" /> },
  { id: "skills", label: "技能", icon: <span data-testid="icon-skills" /> },
];

function getNavClass(wrapper: Element) {
  const nav = wrapper.querySelector("nav[role='navigation']")!;
  return nav.className;
}

describe("Sidebar", () => {
  it("renders collapsed by default (w-[56px])", () => {
    const { container } = render(
      <Sidebar items={mockItems} activeSection="overview" onNavigate={vi.fn()} lang="zh" onToggleLang={vi.fn()} />
    );
    const navClass = getNavClass(container);
    expect(navClass).toContain("w-[56px]");
  });

  it("expands on mouse enter to w-[220px]", () => {
    const { container } = render(
      <Sidebar items={mockItems} activeSection="overview" onNavigate={vi.fn()} lang="zh" onToggleLang={vi.fn()} />
    );
    const nav = container.querySelector("nav[role='navigation']")!;
    fireEvent.mouseEnter(nav);
    expect(nav.className).toContain("w-[220px]");
  });

  it("collapses on mouse leave when not locked", () => {
    const { container } = render(
      <Sidebar items={mockItems} activeSection="overview" onNavigate={vi.fn()} lang="zh" onToggleLang={vi.fn()} />
    );
    const nav = container.querySelector("nav[role='navigation']")!;
    fireEvent.mouseEnter(nav);
    fireEvent.mouseLeave(nav);
    expect(nav.className).toContain("w-[56px]");
  });

  it("stays expanded when lock is toggled on, even after mouse leave", () => {
    const { container } = render(
      <Sidebar items={mockItems} activeSection="overview" onNavigate={vi.fn()} lang="zh" onToggleLang={vi.fn()} />
    );
    const toggleBtn = screen.getByLabelText("展开侧边栏");
    fireEvent.click(toggleBtn);
    // locked: should stay expanded even after mouse leave
    const nav = container.querySelector("nav[role='navigation']")!;
    expect(nav.className).toContain("w-[220px]");
    fireEvent.mouseLeave(nav);
    expect(nav.className).toContain("w-[220px]");
  });

  it("navigates when clicking a nav item (use accessible name)", () => {
    const onNav = vi.fn();
    render(
      <Sidebar items={mockItems} activeSection="overview" onNavigate={onNav} lang="zh" onToggleLang={vi.fn()} />
    );
    // buttons have sr-only labels making them accessible
    const btn = screen.getByRole("button", { name: /技能/ });
    fireEvent.click(btn);
    expect(onNav).toHaveBeenCalledWith("skills");
  });

  it("calls onToggleLang when language button is clicked", () => {
    const onToggleLang = vi.fn();
    render(
      <Sidebar items={mockItems} activeSection="overview" onNavigate={vi.fn()} lang="zh" onToggleLang={onToggleLang} />
    );
    const langBtn = screen.getByLabelText("Switch to English");
    fireEvent.click(langBtn);
    expect(onToggleLang).toHaveBeenCalled();
  });
});
