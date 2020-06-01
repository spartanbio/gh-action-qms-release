import { getInput } from '@actions/core';

/**
 * Parse the QMS release name in a message
 * @param message Message to parse
 */
export function parseReleaseName (message: string): string {
  const parsedResult = parseRevisionNumber(message);

  if (parsedResult == null) {
    throw new Error('Message is missing document or revision number.');
  }

  const [, docNumber, , revision] = parsedResult;

  return `${docNumber}-${revision}`;
}

/**
 * Get the document revision number from a given string
 * @param str String to containing document number and revision. Revision can match `-v[0-9]+` or `\s[0-9]+`
 * @return The revision number
 */
export function parseRevisionNumber (str: string): RegExpExecArray | null {
  const documentNumber = getInput('document-number');
  const revisionRe = /(\s|-)(v[0-9]+)/;
  const titleRe = new RegExp(`(${documentNumber})` + revisionRe.source);

  return titleRe.exec(str);
}
