import React, { useState, useEffect } from 'react';
import { Calendar, Activity, Utensils, FileText, Brain, Home, Plus, X, Save, Settings, Clock, Weight, Pill, Map, ChevronRight, Upload, Download, Trash2, Edit2, Check } from 'lucide-react';

const ArchieDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [archieData, setArchieData] = useState({
    name: 'Арчи',
    breed: 'Мишлинг',
    age: 11,
    weight: 21,
    status: 'Под наблюдением после операции',
    medications: [
      { name: 'Урзахол', dosage: '1 капсула', times: ['09:00', '21:00'] },
      { name: 'Гепатосан', dosage: '1 таблетка', times: ['09:00', '18:00'] }
    ]
  });

  const [meals, setMeals] = useState([
    { id: 1, name: 'Утренняя порция', ingredients: ['Курица 150г', 'Рис 100г', 'Морковь 50г'], calories: 420 },
    { id: 2, name: 'Вечерняя порция', ingredients: ['Говядина 150г', 'Гречка 100г', 'Тыква 50г'], calories: 450 }
  ]);

  const [events, setEvents] = useState([
    { id: 1, type: 'walk', title: 'Утренняя прогулка', time: '08:00', duration: '30 мин', completed: true },
    { id: 2, type: 'medication', title: 'Урзахол', time: '09:00', completed: true },
    { id: 3, type: 'meal', title: 'Завтрак', time: '09:30', completed: false },
    { id: 4, type: 'walk', title: 'Дневная прогулка', time: '14:00', duration: '45 мин', completed: false },
    { id: 5, type: 'medication', title: 'Гепатосан', time: '18:00', completed: false },
    { id: 6, type: 'meal', title: 'Ужин', time: '19:00', completed: false },
    { id: 7, type: 'walk', title: 'Вечерняя прогулка', time: '21:00', duration: '20 мин', completed: false }
  ]);

  const [recipes, setRecipes] = useState([
    { id: 1, name: 'Куриное рагу', ingredients: ['Курица', 'Рис', 'Морковь', 'Кабачок'], calories: 850, portions: 2 },
    { id: 2, name: 'Говяжий микс', ingredients: ['Говядина', 'Гречка', 'Тыква', 'Яблоко'], calories: 900, portions: 2 }
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Анализы крови 15.10.2024', type: 'pdf', size: '2.3 MB' },
    { id: 2, name: 'Выписка после операции', type: 'pdf', size: '1.8 MB' },
    { id: 3, name: 'Ветеринарный паспорт', type: 'pdf', size: '5.1 MB' }
  ]);

  const [aiChat, setAiChat] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const [showAddMeal, setShowAddMeal] = useState(false);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', ingredients: [''], calories: 0 });
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: [''], calories: 0, portions: 1 });

  const [calorieTarget, setCalorieTarget] = useState(870);
  const dailyCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  useEffect(() => {
    const saved = localStorage.getItem('archie-api-key');
    if (saved) setApiKey(saved);
  }, []);

  const saveApiKey = () => {
    localStorage.setItem('archie-api-key', apiKey);
    setShowApiSettings(false);
  };

  const sendAiMessage = async () => {
    if (!aiInput.trim()) return;
    if (!apiKey) {
      alert('Пожалуйста, добавьте API ключ в настройках');
      return;
    }

    const userMessage = { role: 'user', content: aiInput };
    setAiChat([...aiChat, userMessage]);
    setAiInput('');
    setAiLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `Ты ветеринарный помощник для собаки по кличке Арчи. Данные: ${JSON.stringify(archieData)}. Вопрос: ${aiInput}`
            }
          ]
        })
      });

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.content[0].text };
      setAiChat(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { role: 'assistant', content: 'Ошибка соединения с API. Проверьте ключ.' };
      setAiChat(prev => [...prev, errorMessage]);
    }
    setAiLoading(false);
  };

  const toggleEvent = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  };

  const addMeal = () => {
    if (newMeal.name && newMeal.ingredients[0]) {
      setMeals([...meals, { ...newMeal, id: Date.now() }]);
      setNewMeal({ name: '', ingredients: [''], calories: 0 });
      setShowAddMeal(false);
    }
  };

  const addRecipe = () => {
    if (newRecipe.name && newRecipe.ingredients[0]) {
      setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
      setNewRecipe({ name: '', ingredients: [''], calories: 0, portions: 1 });
      setShowAddRecipe(false);
    }
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">🐕 {archieData.name}</h2>
            <p className="text-blue-100 mb-4">{archieData.breed} • {archieData.age} лет • {archieData.weight} кг</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
              <p className="text-sm">{archieData.status}</p>
            </div>
          </div>
          <button onClick={() => setShowApiSettings(true)} className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Прогулки сегодня</p>
              <p className="text-3xl font-bold text-gray-800">
                {events.filter(e => e.type === 'walk' && e.completed).length}/{events.filter(e => e.type === 'walk').length}
              </p>
            </div>
            <Map className="text-green-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Калории сегодня</p>
              <p className="text-3xl font-bold text-gray-800">{dailyCalories}/{calorieTarget}</p>
            </div>
            <Utensils className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Лекарства</p>
              <p className="text-3xl font-bold text-gray-800">
                {events.filter(e => e.type === 'medication' && e.completed).length}/{events.filter(e => e.type === 'medication').length}
              </p>
            </div>
            <Pill className="text-purple-500" size={40} />
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="text-blue-500" />
          Расписание на сегодня
        </h3>
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className={`flex items-center gap-4 p-4 rounded-lg transition ${event.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
              <input
                type="checkbox"
                checked={event.completed}
                onChange={() => toggleEvent(event.id)}
                className="w-5 h-5 rounded"
              />
              <div className="flex-1">
                <p className={`font-semibold ${event.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {event.title}
                </p>
                <p className="text-sm text-gray-500">{event.time} {event.duration && `• ${event.duration}`}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                event.type === 'walk' ? 'bg-green-100 text-green-700' :
                event.type === 'medication' ? 'bg-purple-100 text-purple-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {event.type === 'walk' ? 'Прогулка' : event.type === 'medication' ? 'Лекарство' : 'Еда'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NutritionView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Калькулятор питания</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-lg">
            <p className="text-sm text-orange-700 mb-1">Дневная норма</p>
            <p className="text-3xl font-bold text-orange-800">{calorieTarget} ккал</p>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg">
            <p className="text-sm text-green-700 mb-1">Употреблено сегодня</p>
            <p className="text-3xl font-bold text-green-800">{dailyCalories} ккал</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div 
            className={`h-4 rounded-full transition-all ${dailyCalories > calorieTarget ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min((dailyCalories / calorieTarget) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-center">{Math.round((dailyCalories / calorieTarget) * 100)}% от нормы</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Сегодняшнее меню</h3>
          <button onClick={() => setShowAddMeal(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} /> Добавить
          </button>
        </div>
        <div className="space-y-4">
          {meals.map(meal => (
            <div key={meal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <h4 className="font-bold text-lg mb-2">{meal.name}</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {meal.ingredients.map((ing, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{ing}</span>
                ))}
              </div>
              <p className="text-gray-600 font-semibold">{meal.calories} ккал</p>
            </div>
          ))}
        </div>
      </div>

      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Новый прием пищи</h3>
            <input
              type="text"
              placeholder="Название"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            {newMeal.ingredients.map((ing, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Ингредиент ${i + 1}`}
                value={ing}
                onChange={(e) => {
                  const newIngs = [...newMeal.ingredients];
                  newIngs[i] = e.target.value;
                  setNewMeal({ ...newMeal, ingredients: newIngs });
                }}
                className="w-full border rounded-lg p-2 mb-2"
              />
            ))}
            <button
              onClick={() => setNewMeal({ ...newMeal, ingredients: [...newMeal.ingredients, ''] })}
              className="text-blue-500 text-sm mb-3"
            >
              + Добавить ингредиент
            </button>
            <input
              type="number"
              placeholder="Калории"
              value={newMeal.calories || ''}
              onChange={(e) => setNewMeal({ ...newMeal, calories: parseInt(e.target.value) || 0 })}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex gap-2">
              <button onClick={addMeal} className="flex-1 bg-blue-500 text-white py-2 rounded-lg">Сохранить</button>
              <button onClick={() => setShowAddMeal(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const RecipesView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Библиотека рецептов</h3>
          <button onClick={() => setShowAddRecipe(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={20} /> Новый рецепт
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-500 transition">
              <h4 className="font-bold text-xl mb-3">{recipe.name}</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.ingredients.map((ing, i) => (
                  <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{ing}</span>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-semibold">{recipe.calories} ккал</span>
                <span className="text-gray-600">{recipe.portions} порции</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Новый рецепт</h3>
            <input
              type="text"
              placeholder="Название рецепта"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            {newRecipe.ingredients.map((ing, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Ингредиент ${i + 1}`}
                value={ing}
                onChange={(e) => {
                  const newIngs = [...newRecipe.ingredients];
                  newIngs[i] = e.target.value;
                  setNewRecipe({ ...newRecipe, ingredients: newIngs });
                }}
                className="w-full border rounded-lg p-2 mb-2"
              />
            ))}
            <button
              onClick={() => setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, ''] })}
              className="text-blue-500 text-sm mb-3"
            >
              + Добавить ингредиент
            </button>
            <input
              type="number"
              placeholder="Калории (общие)"
              value={newRecipe.calories || ''}
              onChange={(e) => setNewRecipe({ ...newRecipe, calories: parseInt(e.target.value) || 0 })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              type="number"
              placeholder="Количество порций"
              value={newRecipe.portions || ''}
              onChange={(e) => setNewRecipe({ ...newRecipe, portions: parseInt(e.target.value) || 1 })}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex gap-2">
              <button onClick={addRecipe} className="flex-1 bg-blue-500 text-white py-2 rounded-lg">Сохранить</button>
              <button onClick={() => setShowAddRecipe(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const DocumentsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Медицинские документы</h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Upload size={20} /> Загрузить
          </button>
        </div>
        <div className="space-y-3">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <FileText className="text-red-500" size={32} />
                <div>
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.type.toUpperCase()} • {doc.size}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-200 rounded-lg"><Download size={20} /></button>
                <button className="p-2 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AiAssistantView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg h-[600px] flex flex-col">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Brain className="text-purple-500" />
          ИИ-Помощник для Арчи
        </h3>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {aiChat.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              <Brain size={64} className="mx-auto mb-4 text-gray-300" />
              <p>Задайте вопрос о здоровье, питании или уходе за Арчи</p>
            </div>
          )}
          {aiChat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {aiLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl p-4 text-gray-500">
                Думаю...
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
            placeholder="Напишите ваш вопрос..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendAiMessage}
            disabled={aiLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">🐕 Панель управления здоровьем Арчи</h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-lg p-2 flex flex-wrap gap-2">
          {[
            { id: 'dashboard', label: 'Главная', icon: Home },
            { id: 'nutrition', label: 'Питание', icon: Utensils },
            { id: 'recipes', label: 'Рецепты', icon: FileText },
            { id: 'documents', label: 'Документы', icon: FileText },
            { id: 'ai', label: 'ИИ-Помощник', icon: Brain }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={20} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'nutrition' && <NutritionView />}
        {activeTab === 'recipes' && <RecipesView />}
        {activeTab === 'documents' && <DocumentsView />}
        {activeTab === 'ai' && <AiAssistantView />}
      </div>

      {/* API Settings Modal */}
      {showApiSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Настройки API</h3>
            <p className="text-sm text-gray-600 mb-3">Введите ваш Anthropic API ключ для использования ИИ-помощника</p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-..."
              className="w-full border rounded-lg p-3 mb-4"
            />
            <div className="flex gap-2">
              <button onClick={saveApiKey} className="flex-1 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                <Save size={20} /> Сохранить
              </button>
              <button onClick={() => setShowApiSettings(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchieDashboard;