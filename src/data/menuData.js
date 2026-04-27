export const drinks = [
  {
    id: 1,
    name: "Латте",
    price: 250,
    volume: 0.3,
    description: "Нежный кофейный напиток с большим количеством вспененного молока",
    image: "https://images.unsplash.com/photo-1569570174471-09c39cfc8edc?w=300",
    category: "coffee",
    composition: "Эспрессо, молоко, молочная пена",
    calories: 120
  },
  {
    id: 2,
    name: "Капучино",
    price: 230,
    volume: 0.3,
    description: "Классический итальянский кофе с пышной молочной пеной",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300",
    category: "coffee",
    composition: "Эспрессо, молоко, молочная пена",
    calories: 110
  },
  {
    id: 3,
    name: "Американо",
    price: 180,
    volume: 0.3,
    description: "Эспрессо, разбавленный горячей водой для более мягкого вкуса",
    image: "https://images.unsplash.com/photo-1551030173-122a5b6f89f0?w=300",
    category: "coffee",
    composition: "Эспрессо, вода",
    calories: 15
  },
  {
    id: 4,
    name: "Матча-латте",
    price: 320,
    volume: 0.3,
    description: "Японский чай матча с молоком, тонизирующий и полезный",
    image: "https://images.unsplash.com/photo-1614780508694-5fdd3e6ae8e2?w=300",
    category: "tea",
    composition: "Чай матча, молоко",
    calories: 150
  },
  {
    id: 5,
    name: "Смузи клубничный",
    price: 290,
    volume: 0.4,
    description: "Освежающий напиток из свежих ягод с йогуртом",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300",
    category: "smoothie",
    composition: "Клубника, банан, йогурт",
    calories: 200
  },
  {
    id: 6,
    name: "Мохито",
    price: 210,
    volume: 0.4,
    description: "Освежающий безалкогольный напиток с мятой и лаймом",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300",
    category: "soft",
    composition: "Мята, лайм, содовая, сироп",
    calories: 90
  }
];

export const categories = [
  { id: "all", name: "Все напитки" },
  { id: "coffee", name: "Кофе" },
  { id: "tea", name: "Чай" },
  { id: "smoothie", name: "Смузи" },
  { id: "soft", name: "Прохладительные" }
];