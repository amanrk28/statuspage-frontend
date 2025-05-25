export function getRandomColor(seed: string): string {
  // Define a list of common Tailwind color names
  const colorNames: string[] = [
    "red", "orange", "yellow", "green", "blue", "indigo", "purple", "pink", "gray"
  ];

  // Simple hash function to convert the string seed into a number
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char; // A common way to create a simple hash
    hash |= 0; // Convert to 32bit integer
  }

  // Ensure the hash is positive
  hash = Math.abs(hash);

  // Use the hash to pick a color name
  const colorNameIndex = hash % colorNames.length;
  const selectedColorName = colorNames[colorNameIndex];


  // Return the combined Tailwind color class string
  return selectedColorName;
}