/** Keep records whose id starts with `<owner>/` for a comma-separated owner list.
 * An empty or unset list keeps every record, which is the upstream build.
 */
export function filterRecordsByOwners<T extends { id: string }>(
  records: T[],
  owners: string | undefined,
): T[] {
  const prefixes = (owners ?? "")
    .split(",")
    .map((owner) => owner.trim())
    .filter((owner) => owner.length > 0)
    .map((owner) => `${owner}/`);
  if (prefixes.length === 0) return records;
  return records.filter((record) => prefixes.some((prefix) => record.id.startsWith(prefix)));
}
