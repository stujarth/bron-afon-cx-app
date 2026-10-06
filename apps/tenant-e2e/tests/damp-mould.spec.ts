import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const FORM = '/en/dashboard/repairs/damp-mould';

test.describe('Report damp or mould', () => {
  test('is reachable from the dashboard', async ({ page }) => {
    await page.goto('/en/dashboard');
    await page.getByRole('link', { name: /Report damp or mould/ }).click();
    await expect(page).toHaveURL(/\/repairs\/damp-mould$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Report damp or mould' })).toBeVisible();
  });

  test('shows an error summary that links to each unanswered question', async ({ page }) => {
    await page.goto(FORM);
    await page.getByRole('button', { name: 'Send report' }).click();

    const summary = page.getByRole('alert', { name: 'There is a problem' });
    await expect(summary.getByRole('heading', { name: 'There is a problem' })).toBeVisible();
    await expect(summary).toBeFocused();
    for (const message of [
      'Select at least one room',
      'Select how bad the damp or mould is',
      "Select how long you've noticed it",
      'Select yes or no',
      'Describe the problem in at least 10 characters',
    ]) {
      await expect(summary.getByRole('link', { name: message })).toBeVisible();
    }

    await summary.getByRole('link', { name: 'Select at least one room' }).click();
    await expect(page.getByRole('checkbox', { name: 'Bedroom' })).toBeFocused();
  });

  test('keeps answers after a validation error', async ({ page }) => {
    await page.goto(FORM);
    await page.getByRole('checkbox', { name: 'Bathroom' }).check();
    await page.getByRole('button', { name: 'Send report' }).click();
    await expect(page.getByRole('alert', { name: 'There is a problem' })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: 'Bathroom' })).toBeChecked();
    await expect(page.getByRole('alert', { name: 'There is a problem' }).getByRole('link', { name: 'Select at least one room' })).toHaveCount(0);
  });

  test('submits a routine report and gives a reference and inspection date', async ({ page }) => {
    await page.goto(FORM);
    await page.getByRole('checkbox', { name: 'Bedroom' }).check();
    await page.getByRole('radio', { name: /A small patch/ }).check();
    await page.getByRole('radio', { name: 'Less than a month' }).check();
    await page.getByRole('radio', { name: 'No' }).check();
    await page.getByLabel('Tell us more').fill('Small patch of mould on the bedroom ceiling corner.');
    await page.getByRole('button', { name: 'Send report' }).click();

    await expect(page.getByRole('heading', { name: 'Report received' })).toBeVisible();
    await expect(page.getByTestId('damp-reference')).toHaveText(/^DM-2026-\d{4}$/);
    await expect(page.getByText("We'll inspect within 20 working days")).toBeVisible();
    await expect(page.getByTestId('damp-emergency')).toHaveCount(0);
  });

  test('flags severe damp with a vulnerable occupant as an emergency', async ({ page }) => {
    await page.goto(FORM);
    await page.getByRole('checkbox', { name: 'Bedroom' }).check();
    await page.getByRole('checkbox', { name: 'Living room' }).check();
    await page.getByRole('radio', { name: /Widespread/ }).check();
    await page.getByRole('radio', { name: 'More than 3 months' }).check();
    await page.getByRole('radio', { name: 'Yes' }).check();
    await page
      .getByLabel('Tell us more')
      .fill('Black mould across two walls of the baby’s room, and our son has asthma.');
    await page.getByRole('button', { name: 'Send report' }).click();

    const emergency = page.getByTestId('damp-emergency');
    await expect(emergency).toBeVisible();
    await expect(emergency.getByRole('link', { name: /Call us now on 01633 620111/ })).toHaveAttribute(
      'href',
      'tel:01633620111',
    );
    await expect(page.getByText("Emergency: we'll be with you within 24 hours")).toBeVisible();
  });

  test('works in Welsh', async ({ page }) => {
    await page.goto('/cy/dashboard/repairs/damp-mould');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Rhoi gwybod am leithder neu lwydni' }),
    ).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'cy');
  });
});

test.describe('Accessibility (WCAG 2.2 AA)', () => {
  for (const path of ['/en/dashboard', FORM]) {
    test(`${path} has no detectable axe violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
    });
  }

  test('the error state has no detectable axe violations', async ({ page }) => {
    await page.goto(FORM);
    await page.getByRole('button', { name: 'Send report' }).click();
    await expect(page.getByRole('alert', { name: 'There is a problem' })).toBeVisible();
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
