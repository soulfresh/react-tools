export function fixMarkdown(docs) {
  return docs.replaceAll('<code>', '`').replaceAll('</code>', '`');
}
