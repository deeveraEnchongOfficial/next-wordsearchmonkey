import { NextRequest, NextResponse } from "next/server";

const categoriesData = {
  "categories": [
    {
      "name": "Programming",
      "words": [
        "REACT",
        "NODE",
        "JAVA",
        "HTML",
        "VUE",
        "RUBY",
        "PHP",
        "SWIFT",
        "LARAVEL",
        "MYSQL",
        "MONGODB",
        "POSTGRES",
        "REDIS",
        "PYTHON",
        "TYPESCRIPT",
        "CSS"
      ],
      "description": "Programming Languages"
    },
    {
      "name": "Fruit",
      "words": [
        "APPLE",
        "BANANA",
        "ORANGE",
        "BERRY",
        "MANGO",
        "GRAPE",
        "MELON"
      ],
      "description": "Name of Fuits"
    },
    {
      "name": "Animal",
      "words": [
        "DOG",
        "CAT",
        "LION",
        "TIGER",
        "ELEPHANT",
        "MONKEY",
        "ZEBRA",
        "GIRAFFE",
        "RHINO",
        "HIPPO",
        "CROCODILE"
      ],
      "description": "Name of Animals"
    },
    {
      "name": "Country",
      "words": [
        "USA",
        "CANADA",
        "MEXICO",
        "BRAZIL",
        "CHILE",
        "PERU",
        "SPAIN",
        "FRANCE",
        "ITALY",
        "GERMANY",
        "JAPAN",
        "CHINA",
        "INDIA",
      ],
      "description": "Name of Countries"
    },
    {
      "name": "Car",
      "words": [
        "TOYOTA",
        "HONDA",
        "FORD",
        "BMW",
        "AUDI",
        "JEEP",
        "RAM",
        "KIA",
        "MAZDA",
        "ACURA",
        "BUICK",
        "GMC",
        "DODGE",
        "TESLA",
        "MINI",
        "FIAT",
      ],
      "description": "Name of Car Brands"
    },
    {
      "name": "Sports",
      "words": [
        "SOCCER",
        "FOOTBALL",
        "BASEBALL",
        "TENNIS",
        "GOLF",
        "RUGBY",
        "HOCKEY",
        "CRICKET",
        "BOXING",
      ],
      "description": "Name of Sports"
    }
  ]
};

export const GET = async (request: NextRequest) => {
  // Retrieve query parameters
  const url = new URL(request.url);
  const name = url.searchParams.get('name'); // Get the 'name' query parameter

  if (name) {
    // Filter categories to find the one matching the 'name' parameter
    const category = categoriesData.categories.find(cat => cat.name.toLowerCase() === name.toLowerCase());

    if (category) {
      return NextResponse.json({ categories: [category] }); // Return only the matching category
    } else {
      return NextResponse.json({ error: "Category not found" }, { status: 404 }); // Handle case where category is not found
    }
  }

  // If no name parameter provided, return all categories
  return NextResponse.json(categoriesData);
};
