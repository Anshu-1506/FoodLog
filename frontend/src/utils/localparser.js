const KNOWN_FOODS = ['aloo paratha', 'paneer paratha', 'roti', 'dal', 'rice', 'mixed sabji', 'chai', 'banana', 'milk', 'salad', 'curd', 'sprouts'];
const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5
};
export const localParseInput = text => {
  const lower = text.toLowerCase();
  const items = [];
  KNOWN_FOODS.forEach(food => {
    if (lower.includes(food)) {
      const regex = new RegExp(`(\\d+|one|two|three|four|five)?\\s*${food}`, 'i');
      const match = lower.match(regex);
      let qty = 1;
      if (match && match[1]) {
        qty = numberWords[match[1]] || parseInt(match[1]) || 1;
      }
      items.push({
        name: food,
        quantity: qty
      });
    }
  });
  return items;
};