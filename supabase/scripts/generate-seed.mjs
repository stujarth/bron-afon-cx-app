#!/usr/bin/env node
/**
 * Generates supabase/seed.sql: ~450 fictional damp & mould reports across Torfaen,
 * October 2024 – September 2026. Deterministic (seeded PRNG), so re-running gives
 * identical data.
 *
 * Patterns deliberately built in for the demo's "ask Claude about the data" step:
 *  - Winter peaks (Nov–Feb) in both years.
 *  - Trevethin (1960s system-built flats) and Blaenavon (pre-1919 solid-wall terraces)
 *    have the highest report rates; newer stock in Llantarnam / New Inn the lowest.
 *  - A cluster of repeat reports at the same properties (failed first fixes).
 *  - Timescale breaches concentrate in Trevethin and Blaenavon during the
 *    winter peaks, when surveyor capacity runs out.
 *  - Phone reports take longer to inspect than portal reports.
 *
 * Usage: node supabase/scripts/generate-seed.mjs > supabase/seed.sql
 */

// ---------- deterministic PRNG ----------
let seed = 20261006;
function rand() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
function weighted(entries) {
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [v, w] of entries) if ((r -= w) <= 0) return v;
  return entries[entries.length - 1][0];
}

// ---------- reference data ----------
const WARDS = [
  // name, postcode district, weight, stock profile
  { ward: 'Trevethin', pc: 'NP4 8', weight: 16, stock: { type: 'flat', years: [1964, 1972], wall: 'system_built' }, delayRisk: 0.45 },
  { ward: 'Blaenavon', pc: 'NP4 9', weight: 14, stock: { type: 'house', years: [1890, 1919], wall: 'solid' }, delayRisk: 0.4 },
  { ward: 'St Dials', pc: 'NP44 4', weight: 10, stock: { type: 'flat', years: [1966, 1975], wall: 'system_built' }, delayRisk: 0.2 },
  { ward: 'Abersychan', pc: 'NP4 7', weight: 9, stock: { type: 'house', years: [1900, 1935], wall: 'solid' }, delayRisk: 0.2 },
  { ward: 'Pontypool Fawr', pc: 'NP4 6', weight: 9, stock: { type: 'house', years: [1920, 1955], wall: 'cavity' }, delayRisk: 0.15 },
  { ward: 'Fairwater', pc: 'NP44 3', weight: 8, stock: { type: 'maisonette', years: [1968, 1978], wall: 'cavity' }, delayRisk: 0.12 },
  { ward: 'Greenmeadow', pc: 'NP44 3', weight: 6, stock: { type: 'house', years: [1960, 1975], wall: 'cavity' }, delayRisk: 0.1 },
  { ward: 'Croesyceiliog', pc: 'NP44 2', weight: 5, stock: { type: 'house', years: [1955, 1970], wall: 'cavity' }, delayRisk: 0.08 },
  { ward: 'Upper Cwmbran', pc: 'NP44 5', weight: 5, stock: { type: 'bungalow', years: [1950, 1965], wall: 'cavity' }, delayRisk: 0.08 },
  { ward: 'New Inn', pc: 'NP4 0', weight: 3, stock: { type: 'house', years: [1975, 1995], wall: 'cavity' }, delayRisk: 0.05 },
  { ward: 'Llantarnam', pc: 'NP44 6', weight: 2, stock: { type: 'house', years: [1995, 2015], wall: 'cavity' }, delayRisk: 0.05 },
];

const STREETS = [
  'Heol y Felin', 'Ffordd yr Afon', 'Coed y Brain', 'Maes y Dderwen', 'Bryn Teg', 'Llys Gwyn',
  'Clos Cae Glas', 'Heol Pen y Bryn', 'Ffordd Newydd', 'Cwrt y Nant', 'Rhodfa Werdd', 'Stryd Fawr',
  'Lôn Isaf', 'Tŷ Coch Way', 'Garth Road', 'Hill View', 'Brook Street', 'Station Terrace',
];
const FIRST = [
  'Siân', 'Rhian', 'Cerys', 'Megan', 'Ffion', 'Nia', 'Bethan', 'Carys', 'Lowri', 'Ceri',
  'Dafydd', 'Gareth', 'Rhys', 'Owain', 'Huw', 'Iwan', 'Tomos', 'Aled', 'Emyr', 'Gethin',
  'Sarah', 'Emma', 'Jade', 'Chloe', 'Daniel', 'Liam', 'Kyle', 'Paul', 'Karen', 'Lisa',
];
const LAST = [
  'Jones', 'Williams', 'Davies', 'Evans', 'Thomas', 'Roberts', 'Lewis', 'Hughes', 'Morgan',
  'Griffiths', 'Price', 'Powell', 'Phillips', 'Rees', 'Bevan', 'Pritchard', 'Watkins', 'Howells',
];

const ROOM_WEIGHTS = [
  ['bedroom', 40], ['bathroom', 30], ['kitchen', 14], ['livingRoom', 10], ['hallway', 4], ['other', 2],
];

const DESCRIPTIONS = {
  bedroom: [
    'Black mould on the outside wall behind the bed and around the window frame.',
    'Mould spots on the ceiling corner, getting bigger every week.',
    'Clothes in the wardrobe smell musty and have white mould on them.',
    'Window drips with condensation every morning and the sill has gone black.',
  ],
  bathroom: [
    'Mould on the ceiling above the shower, extractor fan does not seem to work.',
    'Black mould along the sealant and spreading up the wall tiles.',
    'Paint peeling off the ceiling and there are black patches coming back after cleaning.',
  ],
  kitchen: [
    'Damp patch behind the fridge freezer, wallpaper coming away.',
    'Mould in the cupboard under the sink, smells musty.',
  ],
  livingRoom: [
    'Damp patch on the chimney breast that gets worse when it rains.',
    'Wet plaster below the window, skirting board is rotting.',
  ],
  hallway: ['Damp tide mark rising up the wall by the front door.'],
  other: ['Mould on the walls and ceiling of the box room.'],
};

// ---------- helpers ----------
function addWorkingDays(from, days) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setUTCDate(d.getUTCDate() + 1);
    const dow = d.getUTCDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return d;
}
function hazardLevel(severity, vulnerable) {
  if (severity === 'severe' && vulnerable) return 'emergency';
  if (severity === 'severe' || vulnerable) return 'significant';
  return 'routine';
}
function dueAt(level, created) {
  if (level === 'emergency') return new Date(created.getTime() + 24 * 3600 * 1000);
  return addWorkingDays(created, level === 'significant' ? 10 : 20);
}
const sql = (v) =>
  v === null || v === undefined
    ? 'null'
    : typeof v === 'number' || typeof v === 'boolean'
      ? String(v)
      : Array.isArray(v)
        ? `array[${v.map(sql).join(', ')}]::text[]`
        : v instanceof Date
          ? `'${v.toISOString()}'`
          : `'${String(v).replace(/'/g, "''")}'`;

// Month weights: winter peak. Index 0 = January.
const MONTH_WEIGHT = [1.9, 1.7, 1.2, 0.8, 0.5, 0.35, 0.3, 0.35, 0.55, 0.9, 1.35, 1.8];
const START = Date.UTC(2024, 9, 1); // 1 Oct 2024
const END = Date.UTC(2026, 8, 30); // 30 Sep 2026
const NOW = new Date(Date.UTC(2026, 9, 6, 9));

// ---------- property pool ----------
const properties = [];
let propNo = 100100;
for (const w of WARDS) {
  const count = Math.round(w.weight * 7);
  for (let i = 0; i < count; i++) {
    const year = w.stock.years[0] + Math.floor(rand() * (w.stock.years[1] - w.stock.years[0]));
    properties.push({
      ref: `BA-${propNo++}`,
      ward: w,
      address: `${1 + Math.floor(rand() * 90)} ${pick(STREETS)}`,
      postcode: `${w.pc}${pick('ABDEFGHJLNPQRSTUWXYZ')}${pick('ABDEFGHJLNPQRSTUWXYZ')}`,
      type: w.stock.type === 'house' && rand() < 0.2 ? 'flat' : w.stock.type,
      year,
      wall: w.stock.wall,
      tenant: `${pick(FIRST)} ${pick(LAST)}`,
      vulnerable: rand() < 0.36,
      // Some homes have an underlying defect and keep coming back.
      chronic: (w.stock.wall !== 'cavity' && rand() < 0.14) || rand() < 0.03,
    });
  }
}

// ---------- generate reports ----------
function randomDate() {
  // Rejection-sample by month weight.
  for (;;) {
    const t = START + rand() * (END - START);
    const d = new Date(t);
    if (rand() * 2 < MONTH_WEIGHT[d.getUTCMonth()]) {
      d.setUTCHours(8 + Math.floor(rand() * 11), Math.floor(rand() * 60), 0, 0);
      return d;
    }
  }
}

const reports = [];
const byWeight = properties.map((p) => [p, p.ward.weight * (p.chronic ? 4 : 1)]);
const TARGET = 450;
while (reports.length < TARGET) {
  const p = weighted(byWeight);
  const created = randomDate();
  const winterPeak = [11, 0, 1].includes(created.getUTCMonth());

  const roomCount = weighted([[1, 60], [2, 30], [3, 10]]);
  const rooms = [...new Set(Array.from({ length: roomCount }, () => weighted(ROOM_WEIGHTS)))];

  const severity = weighted(
    p.chronic || p.wall === 'solid'
      ? [['low', 20], ['moderate', 45], ['severe', 35]]
      : [['low', 45], ['moderate', 40], ['severe', 15]],
  );
  const level = hazardLevel(severity, p.vulnerable);
  const due = dueAt(level, created);
  const source = weighted([['tenant_portal', 30], ['phone', 55], ['email', 10], ['surveyor', 5]]);

  // Inspection delay relative to the deadline (in days; negative = early).
  let lateRisk = p.ward.delayRisk * (winterPeak ? 1.6 : 0.35) * (source === 'phone' ? 1.3 : 0.8);
  if (level === 'emergency') lateRisk *= 0.4;
  const late = rand() < Math.min(lateRisk, 0.85);
  const span = due.getTime() - created.getTime();
  let inspected = late
    ? new Date(due.getTime() + (1 + rand() * 14) * 86400000)
    : new Date(created.getTime() + span * (0.3 + rand() * 0.65));

  let status;
  let resolved = null;
  let rootCause = null;
  let cost = null;

  if (inspected > NOW) {
    inspected = null;
    status = rand() < 0.5 ? 'reported' : 'inspection_booked';
  } else {
    rootCause =
      p.wall === 'solid'
        ? weighted([['penetrating_damp', 45], ['condensation', 35], ['rising_damp', 15], ['roof_leak', 5]])
        : p.wall === 'system_built'
          ? weighted([['condensation', 75], ['penetrating_damp', 15], ['plumbing_leak', 10]])
          : weighted([['condensation', 70], ['plumbing_leak', 15], ['penetrating_damp', 10], ['roof_leak', 5]]);
    const fixDays = rootCause === 'condensation' ? 10 + rand() * 30 : 25 + rand() * 70;
    const resolvedAt = new Date(inspected.getTime() + fixDays * 86400000);
    if (resolvedAt <= NOW) {
      status = 'resolved';
      resolved = resolvedAt;
    } else {
      status = rand() < 0.4 ? 'inspected' : 'treatment_scheduled';
    }
    const base = {
      condensation: [180, 1400],
      plumbing_leak: [250, 1800],
      roof_leak: [900, 4500],
      penetrating_damp: [1200, 6500],
      rising_damp: [2200, 7800],
    }[rootCause];
    cost = status === 'resolved' ? Math.round((base[0] + rand() * (base[1] - base[0])) * 100) / 100 : null;
  }

  reports.push({
    created,
    source,
    tenant_name: p.tenant,
    property_ref: p.ref,
    address_line: p.address,
    postcode: p.postcode,
    ward: p.ward.ward,
    property_type: p.type,
    build_year: p.year,
    wall_type: p.wall,
    rooms,
    severity,
    duration_weeks: weighted([[2, 35], [8, 40], [16, 25]]) + (p.chronic ? 4 : 0),
    has_vulnerable_occupant: p.vulnerable,
    hazard_level: level,
    description: pick(DESCRIPTIONS[rooms[0]]),
    status,
    inspection_due_at: due,
    inspected_at: inspected,
    resolved_at: resolved,
    root_cause: rootCause,
    cost_gbp: cost,
  });
}

reports.sort((a, b) => a.created - b.created);
const seqByYear = {};
for (const r of reports) {
  const y = r.created.getUTCFullYear();
  seqByYear[y] = (seqByYear[y] ?? 1000) + 1;
  r.reference = `DM-${y}-${String(seqByYear[y]).padStart(4, '0')}`;
}

// ---------- emit SQL ----------
const cols = [
  'reference', 'created_at', 'source', 'tenant_name', 'property_ref', 'address_line', 'postcode', 'ward',
  'property_type', 'build_year', 'wall_type', 'rooms', 'severity', 'duration_weeks',
  'has_vulnerable_occupant', 'hazard_level', 'description', 'status', 'inspection_due_at',
  'inspected_at', 'resolved_at', 'root_cause', 'cost_gbp',
];
const out = [];
out.push('-- Generated by supabase/scripts/generate-seed.mjs. Do not edit by hand.');
out.push(`-- ${reports.length} fictional damp & mould reports, Oct 2024 – Sep 2026.`);
out.push('truncate table public.damp_mould_reports;');
out.push('-- New portal reports continue the 2026 sequence after the seeded ones.');
out.push(`select setval('public.damp_mould_report_seq', ${seqByYear[2026] ?? 5000});`);
out.push('');
out.push(`insert into public.damp_mould_reports (${cols.join(', ')}) values`);
out.push(
  reports
    .map(
      (r) =>
        `  (${[
          r.reference, r.created, r.source, r.tenant_name, r.property_ref, r.address_line, r.postcode,
          r.ward, r.property_type, r.build_year, r.wall_type, r.rooms, r.severity, r.duration_weeks,
          r.has_vulnerable_occupant, r.hazard_level, r.description, r.status, r.inspection_due_at,
          r.inspected_at, r.resolved_at, r.root_cause, r.cost_gbp,
        ]
          .map(sql)
          .join(', ')})`,
    )
    .join(',\n') + ';',
);
process.stdout.write(out.join('\n') + '\n');
