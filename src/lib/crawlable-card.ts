/**
 * Cards on this site used to be JS-only: a <div> (or a <motion.div>) with an
 * onClick handler that opened a modal.
 *
 * Googlebot does not run JavaScript, so it could not follow those cards. The
 * result was that event, attraction and venue pages were reachable only from
 * the sitemap — no category page, country page or home page linked to them.
 * That is almost certainly a major cause of the site's thin indexing.
 *
 * The fix is to make every card a real anchor with an href pointing at the
 * detail page, while keeping the existing modal behaviour for a normal click.
 *
 * Behaviour after the fix:
 *   - plain left click  -> the modal opens (exactly as before)
 *   - ctrl/cmd/shift click, or middle click -> the browser follows the href,
 *     which is the normal "open in a new tab" behaviour users expect from a
 *     link and the only way a non-JS crawler (or a keyboard user pressing
 *     Enter after opening the link in a new context) reaches the page.
 */

/**
 * True when the click was modified (new tab / new window / download) or was
 * not the primary button. In that case the default navigation must NOT be
 * cancelled, so the anchor behaves like a normal link.
 */
export function isModifiedClick(e: {
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  button?: number;
}): boolean {
  return Boolean(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) || (e.button ?? 0) !== 0;
}

/**
 * Wraps a card's modal-opening handler so that:
 *   - a modified click falls through to the anchor's href
 *   - a plain click opens the modal and cancels the navigation
 */
export function cardClickHandler<E extends React.MouseEvent>(
  e: E,
  openModal: () => void,
): void {
  if (isModifiedClick(e)) return; // let the browser follow the href
  e.preventDefault();
  openModal();
}
