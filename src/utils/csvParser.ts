import Papa from "papaparse";

/**
 * Parses a CSV file and returns a Promise that resolves to an array of JSON objects.
 *
 * @param file - The CSV file to parse.
 * @returns A Promise that resolves with the parsed JSON data.
 */
export function parseCSVToJson<T = any>(file: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<T>) => {
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}
