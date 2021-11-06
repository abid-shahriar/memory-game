import { useEffect, useState } from 'react';
import { Card } from './components';

const data = [
  {
    img: 'one.svg'
  },
  {
    img: 'two.svg'
  },
  {
    img: 'three.svg'
  },
  {
    img: 'four.svg'
  },
  {
    img: 'five.svg'
  },
  {
    img: 'six.svg'
  }
];

export default function App() {
  const [cards, setCards] = useState<{ id: number; img: string }[] | undefined>(undefined);

  function shuffleCards() {
    const newArrOfCards = [...data, ...data].map((item) => ({ ...item, id: Math.random() }));

    const shuffledCards = newArrOfCards.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className='grid grid-cols-4 gap-4 max-w-[800px]  mx-auto '>
      {cards?.map((card, idx: number) => (
        <Card key={card.id} img={`/svgs/${card.img}`} />
      ))}
    </div>
  );
}
