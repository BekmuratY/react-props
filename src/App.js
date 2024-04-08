import React, { useState } from 'react';

// Основной компонент
const ShopPage = () => {
  const [shops, setShops] = useState([
    { id: 1, name: 'Магазин 1', openingTime: '09:00', distance: 5, paymentMethod: 'Наличные' },
    { id: 2, name: 'Магазин 2', openingTime: '10:00', distance: 10, paymentMethod: 'Карта' },
    // Добавьте остальные магазины по аналогии
  ]);

  const [filter, setFilter] = useState('');

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addShop = (newShop) => {
    setShops([...shops, newShop]);
  };

  return (
    <div>
      <h1>Список магазинов</h1>
      <FilterInput value={filter} onChange={handleFilterChange} />
      <AddShopModal onAdd={addShop} />
      <ShopTable shops={filteredShops} />
    </div>
  );
};

// Компонент для фильтрации
const FilterInput = ({ value, onChange }) => {
  return (
    <input type="text" value={value} onChange={onChange} placeholder="Поиск по названию магазина" />
  );
};

// Компонент для таблицы с магазинами
const ShopTable = ({ shops }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Время открытия</th>
          <th>Удаленность от центра доставки</th>
          <th>Метод оплаты</th>
        </tr>
      </thead>
      <tbody>
        {shops.map(shop => (
          <tr key={shop.id}>
            <td>{shop.name}</td>
            <td>{shop.openingTime}</td>
            <td>{shop.distance} км</td>
            <td>{shop.paymentMethod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Компонент для модального окна добавления магазина
const AddShopModal = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [distance, setDistance] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newShop = {
      id: Date.now(),
      name,
      openingTime,
      distance: parseFloat(distance),
      paymentMethod
    };
    onAdd(newShop);
    setName('');
    setOpeningTime('');
    setDistance('');
    setPaymentMethod('');
  };

  return (
    <div>
      <button onClick={() => alert('Открытие модального окна для добавления магазина')}>Добавить магазин</button>
      {/* Модальное окно добавления магазина */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Время открытия" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} required />
        <input type="text" placeholder="Удаленность от центра доставки (в км)" value={distance} onChange={(e) => setDistance(e.target.value)} required />
        <input type="text" placeholder="Метод оплаты" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required />
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default ShopPage;
