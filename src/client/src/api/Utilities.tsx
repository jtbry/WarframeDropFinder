import Component from '../models/Component';
import Item from '../models/Item';
import PartialItem from '../models/PartialItem';

/**
 * Compute the levenshtein distance between two strings.
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @returns The levenshtein distance between the two values.
 */
export function levenshteinDist(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  // increment along the first column of each row
  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

export function createPercent(
  total: number,
  sample: number,
  decimalPlaces: number
): number {
  const factorOfTen = Math.pow(10, decimalPlaces);
  const percentage = (sample / total) * 100;
  return Math.round(percentage * factorOfTen) / factorOfTen;
}

export function createWfmName(
  item: Item | Component,
  parent?: PartialItem,
  set?: boolean
) {
  let name = item.name.toLowerCase().replace(' ', '_');
  if (parent) name = parent.name.toLowerCase().replace(' ', '_') + '_' + name;
  if (set) name += '_set';
  return name;
}
