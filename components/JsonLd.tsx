/**
 * Renders a schema.org object as a JSON-LD block.
 *
 * The escaping is the point. `JSON.stringify` escapes what JSON requires but
 * leaves `<` untouched, and the result lands inside a `<script>` element where
 * the HTML parser is still scanning for a closing tag. So a `</script>`
 * anywhere in the data — inside an FAQ answer, an address, a description —
 * would close the script early and hand everything after it to the HTML parser
 * as markup. `<` is the same character to a JSON parser and inert to the
 * HTML one, so the structured data is unchanged and the escape hatch is shut.
 *
 * Nothing fed to this is guest-supplied today; every field is static site copy
 * written in `content/`. That is exactly why it is worth closing now — the day
 * any of it starts coming from a CMS, a review feed, or a pasted-in guest
 * question, this stops being theoretical, and it will not be obvious then that
 * the sink was ever here.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
