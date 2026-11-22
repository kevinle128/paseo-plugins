import assert from "node:assert/strict";
import { test } from "node:test";
import { filterRecordsByOwners } from "./owners.ts";

const records = [
  { id: "kevinle128/computer-use" },
  { id: "kevinle128/agent-memory" },
  { id: "kevinle128extra/other" },
  { id: "acme/example" },
];

test("an empty owner list keeps every record", () => {
  assert.deepEqual(filterRecordsByOwners(records, undefined), records);
  assert.deepEqual(filterRecordsByOwners(records, ""), records);
  assert.deepEqual(filterRecordsByOwners(records, "  , "), records);
});

test("owner prefixes keep only matching ids", () => {
  assert.deepEqual(
    filterRecordsByOwners(records, "kevinle128").map((record) => record.id),
    ["kevinle128/computer-use", "kevinle128/agent-memory"],
  );
  assert.deepEqual(
    filterRecordsByOwners(records, " acme , kevinle128extra ").map((record) => record.id),
    ["kevinle128extra/other", "acme/example"],
  );
});
