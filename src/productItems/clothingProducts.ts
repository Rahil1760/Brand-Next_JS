// products.js or inline in your API route
export const clothingProducts = [
  // 👕 Men's Clothing
  {
    name: "Casual Men's T-Shirt",
    category: "men",
    type: "t-shirt",
    price: 29.99,
    size: ["S", "M", "L", "XL"],
    color: "Blue",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },
  {
    name: "Men's Denim Jeans",
    category: "men",
    type: "jeans",
    price: 59.99,
    size: ["30", "32", "34", "36"],
    color: "Dark Blue",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },
  {
    name: "Men's Formal Shirt",
    category: "men",
    type: "shirt",
    price: 45.00,
    size: ["M", "L", "XL"],
    color: "White",
    image: "https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: false
  },

  // 👗 Women's Clothing
  {
    name: "Women's Summer Dress",
    category: "women",
    type: "dress",
    price: 49.99,
    size: ["XS", "S", "M", "L"],
    color: "Floral",
    image: "https://images.unsplash.com/photo-1507457374333-d3c9ac947150?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },
  {
    name: "Women's Denim Jacket",
    category: "women",
    type: "jacket",
    price: 75.00,
    size: ["S", "M", "L"],
    color: "Light Blue",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },
  {
    name: "Women's Activewear Set",
    category: "women",
    type: "activewear",
    price: 55.00,
    size: ["S", "M"],
    color: "Black",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842259?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },

  // 👶 Kids' Clothing
  {
    name: "Kids' Cotton T-Shirt",
    category: "kids",
    type: "t-shirt",
    price: 15.99,
    size: ["2T", "3T", "4T", "5T"],
    color: "Red",
    image: "https://images.unsplash.com/photo-1489808905179-4ff7acf51b05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },
  {
    name: "Baby Girl's Romper",
    category: "kids",
    type: "romper",
    price: 19.99,
    size: ["0-3M", "3-6M", "6-9M"],
    color: "Pink",
    image: "https://images.unsplash.com/photo-1529385888224-9d457fe11349?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },
  {
    name: "Boys' Hoodie",
    category: "kids",
    type: "hoodie",
    price: 34.99,
    size: ["4", "6", "8", "10"],
    color: "Navy",
    image: "https://images.unsplash.com/photo-1507133750517-5c7faa5d1b67?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true
  },
  { name: "Boys' Hoodie", category: "kids", type: "hoodie", price: 34.99, size: ["4", "6", "8", "10"], color: "Navy", image: "https://images.unsplash.com/photo-1507133750517-5c7faa5d1b67?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Girls' T-Shirt", category: "kids", type: "t-shirt", price: 19.99, size: ["4", "6", "8", "10"], color: "Pink", image: "https://images.unsplash.com/photo-1520975928318-3f1a3b1e8c1e?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Men's Denim Jacket", category: "men", type: "jacket", price: 59.99, size: ["S", "M", "L", "XL"], color: "Blue", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Women's Summer Dress", category: "women", type: "dress", price: 49.99, size: ["S", "M", "L"], color: "Red", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Men's Polo Shirt", category: "men", type: "t-shirt", price: 24.99, size: ["S", "M", "L", "XL"], color: "White", image: "https://images.unsplash.com/photo-1520974735194-8d7d3f7abf2c?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Women's Hoodie", category: "women", type: "hoodie", price: 39.99, size: ["S", "M", "L"], color: "Black", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Boys' Shorts", category: "kids", type: "shorts", price: 14.99, size: ["4", "6", "8", "10"], color: "Gray", image: "https://images.unsplash.com/photo-1596755094514-f87e95b6c2b4?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Girls' Leggings", category: "kids", type: "leggings", price: 17.99, size: ["4", "6", "8", "10"], color: "Purple", image: "https://images.unsplash.com/photo-1596755094514-f87e95b6c2b5?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Men's Chinos", category: "men", type: "pants", price: 44.99, size: ["S", "M", "L", "XL"], color: "Beige", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Women's Blazer", category: "women", type: "jacket", price: 69.99, size: ["S", "M", "L"], color: "Navy", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=500&q=80", inStock: true },


// --- Randomized products continue below ---
{ name: "Men's Running Shoes", category: "men", type: "shoes", price: 74.99, size: ["7", "8", "9", "10", "11"], color: "Black", image: "https://images.unsplash.com/photo-1528701800489-20be3c7d7d5f?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Women's Handbag", category: "women", type: "accessory", price: 89.99, size: ["One Size"], color: "Brown", image: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Kids' Raincoat", category: "kids", type: "jacket", price: 29.99, size: ["4", "6", "8"], color: "Yellow", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80", inStock: false },
{ name: "Men's Sweatpants", category: "men", type: "pants", price: 34.49, size: ["S", "M", "L", "XL"], color: "Gray", image: "https://images.unsplash.com/photo-1584270354949-1b3c3f3e1a2f?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Women's Blouse", category: "women", type: "top", price: 32.99, size: ["S", "M", "L"], color: "White", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Girls' Skirt", category: "kids", type: "skirt", price: 21.99, size: ["4", "6", "8"], color: "Purple", image: "https://images.unsplash.com/photo-1528701800489-20be3c7d7d5e?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Men's Formal Shirt", category: "men", type: "shirt", price: 38.99, size: ["S", "M", "L", "XL"], color: "Light Blue", image: "https://images.unsplash.com/photo-1520962911093-60a2f1b9c8a8?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Women's Jeans", category: "women", type: "pants", price: 54.99, size: ["S", "M", "L"], color: "Dark Blue", image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Boys' Sneakers", category: "kids", type: "shoes", price: 27.99, size: ["3", "4", "5", "6"], color: "Red", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80", inStock: true },
{ name: "Women's Winter Coat", category: "women", type: "jacket", price: 120.00, size: ["M", "L"], color: "Beige", image: "https://images.unsplash.com/photo-1528701800489-20be3c7d7d5f?auto=format&fit=crop&w=500&q=80", inStock: true },
];