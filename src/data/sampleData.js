// Примеры данных для приложения

export const samplePetData = {
  name: 'Арчи',
  breed: 'Мишлинг',
  age: 11,
  weight: 21,
  status: 'Под наблюдением после операции',
  medications: [
    { name: 'Урзахол', dosage: '1 капсула', times: ['09:00', '21:00'] },
    { name: 'Гепатосан', dosage: '1 таблетка', times: ['09:00', '18:00'] }
  ]
};

export const sampleMeals = [
  { 
    id: 1, 
    name: 'Утренняя порция', 
    ingredients: ['Курица 150г', 'Рис 100г', 'Морковь 50г'], 
    calories: 420,
    time: '09:30'
  },
  { 
    id: 2, 
    name: 'Вечерняя порция', 
    ingredients: ['Говядина 150г', 'Гречка 100г', 'Тыква 50г'], 
    calories: 450,
    time: '19:00'
  }
];

export const sampleEvents = [
  { id: 1, type: 'walk', title: 'Утренняя прогулка', time: '08:00', duration: '30 мин', completed: false },
  { id: 2, type: 'medication', title: 'Урзахол', time: '09:00', completed: false },
  { id: 3, type: 'meal', title: 'Завтрак', time: '09:30', completed: false },
  { id: 4, type: 'walk', title: 'Дневная прогулка', time: '14:00', duration: '45 мин', completed: false },
  { id: 5, type: 'medication', title: 'Гепатосан', time: '18:00', completed: false },
  { id: 6, type: 'meal', title: 'Ужин', time: '19:00', completed: false },
  { id: 7, type: 'walk', title: 'Вечерняя прогулка', time: '21:00', duration: '20 мин', completed: false }
];

export const sampleRecipes = [
  { 
    id: 1, 
    name: 'Куриное рагу', 
    ingredients: ['Курица 300г', 'Рис 200г', 'Морковь 100г', 'Кабачок 100г'], 
    calories: 850, 
    portions: 2,
    description: 'Питательное блюдо с курицей и овощами'
  },
  { 
    id: 2, 
    name: 'Говяжий микс', 
    ingredients: ['Говядина 300г', 'Гречка 200г', 'Тыква 100г', 'Яблоко 50г'], 
    calories: 900, 
    portions: 2,
    description: 'Сбалансированное блюдо с говядиной'
  },
  {
    id: 3,
    name: 'Рыбное угощение',
    ingredients: ['Лосось 250г', 'Картофель 150г', 'Брокколи 100г'],
    calories: 780,
    portions: 2,
    description: 'Источник Омега-3 жирных кислот'
  }
];

export const sampleDocuments = [
  { 
    id: 1, 
    name: 'Анализы крови 15.10.2024', 
    type: 'pdf', 
    size: '2.3 MB',
    date: '15.10.2024',
    category: 'Анализы'
  },
  { 
    id: 2, 
    name: 'Выписка после операции', 
    type: 'pdf', 
    size: '1.8 MB',
    date: '01.10.2024',
    category: 'Медицинские документы'
  },
  { 
    id: 3, 
    name: 'Ветеринарный паспорт', 
    type: 'pdf', 
    size: '5.1 MB',
    date: '20.09.2024',
    category: 'Документы'
  },
  {
    id: 4,
    name: 'Рентген грудной клетки',
    type: 'jpg',
    size: '3.7 MB',
    date: '28.09.2024',
    category: 'Диагностика'
  }
];

export const vetTips = [
  'Регулярные прогулки помогают поддерживать здоровый вес',
  'Свежая вода должна быть доступна круглосуточно',
  'Проверяйте уши на наличие воспалений раз в неделю',
  'Чистите зубы питомцу 2-3 раза в неделю',
  'Регулярно проверяйте лапы на трещины и раны',
  'Давайте лекарства строго по расписанию',
  'Следите за изменениями в поведении и аппетите'
];

export const calorieCalculator = {
  // Расчет калорий на основе веса и активности
  calculate: (weight, activityLevel) => {
    const baseCalories = weight * 30; // базовая формула
    const activityMultiplier = {
      low: 0.8,
      medium: 1.0,
      high: 1.2
    };
    return Math.round(baseCalories * (activityMultiplier[activityLevel] || 1.0));
  }
};

export default {
  samplePetData,
  sampleMeals,
  sampleEvents,
  sampleRecipes,
  sampleDocuments,
  vetTips,
  calorieCalculator
};