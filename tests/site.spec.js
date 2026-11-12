import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/work",
  "/work/form",
  "/work/fieldnotes",
  "/work/flow",
  "/services",
  "/about",
  "/pricing",
  "/contact",
  "/not-a-page",
];

test("all routes render, images load, and no application errors occur", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate((image) => image.complete && image.naturalWidth > 0),
        )
        .toBeTruthy();
    }
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every((img) => img.complete && img.naturalWidth > 0),
          ),
      )
      .toBeTruthy();
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test("work filters, project detail, and next project navigation", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.locator(".project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "E-commerce" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page
    .getByRole("link", { name: "Explore Fieldnotes design concept" })
    .click();
  await expect(page).toHaveURL(/\/work\/fieldnotes$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Fieldnotes",
  );
  await page.locator(".next-project a").click();
  await expect(page).toHaveURL(/\/work\/flow$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/work\/fieldnotes$/);
});

test("FAQ works with a keyboard and shows one answer at a time", async ({
  page,
}) => {
  await page.goto("/#faq");
  const summaries = page.locator(".faq-list summary");
  await summaries.first().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await summaries.nth(1).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details[open]")).toHaveCount(1);
  await expect(page.locator(".faq-list details").nth(1)).toHaveAttribute(
    "open",
    "",
  );
});

test("mobile menu manages focus, Escape, and navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu.getByRole("link", { name: "Work" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    menu.getByRole("link", { name: "Start a project" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole("link", { name: "Process" }).click();
  await expect(menu).toHaveCount(0);
  await expect(page).toHaveURL(/\/#process$/);
  await expect(page.locator("#process")).toBeInViewport();
});

test("enquiry validates input and prepares an honest downloadable email brief", async ({
  page,
}) => {
  await page.goto("/contact?service=commerce");
  await expect(page.getByLabel("What are we building?")).toHaveValue(
    "commerce",
  );
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await page.getByLabel("Your name").fill("Test Visitor");
  await page.getByLabel("Email address").fill("invalid");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(
    page.getByText("Please enter a valid email address."),
  ).toBeVisible();
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page
    .getByLabel("A little about your project")
    .fill(
      "We would like to build a thoughtful new online store for our business.",
    );
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "Your brief is ready." }),
  ).toBeVisible();
  await expect(
    page.getByText("Nothing has been sent yet.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Open email app" }),
  ).toHaveAttribute("href", /^mailto:hello@bluehawke.com\?subject=/);
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download your brief instead" })
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("blue-hawke-project-brief.txt");
});

for (const width of [320, 375, 390, 768, 1024, 1280, 1440, 1920]) {
  test(`responsive pages stay within a ${width}px viewport`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/work", "/work/flow", "/services", "/contact"]) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflow, `${route} overflows at ${width}px`).toBeFalsy();
    }
  });
}

test("essential pages meet automated WCAG AA checks", async ({ page }) => {
  test.setTimeout(90000);
  for (const route of [
    "/",
    "/work",
    "/work/form",
    "/services",
    "/about",
    "/pricing",
    "/contact",
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();
    expect(
      result.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      route,
    ).toEqual([]);
  }
});

test("capture desktop, tablet, mobile and supporting-page visual reviews", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.screenshot({ path: "artifacts/hero-desktop.png" });
  for (const route of ["/work", "/work/form", "/contact"]) {
    await page.goto(route);
    await page.screenshot({
      path: `artifacts/${route.replaceAll("/", "-").slice(1)}.png`,
      fullPage: true,
    });
  }
  for (const width of [768, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await page.screenshot({
      path: `artifacts/home-${width}.png`,
      fullPage: true,
    });
  }
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.screenshot({ path: "artifacts/mobile-menu.png" });
});
