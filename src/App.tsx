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
  const [firstFlip, setFirstFlip] = useState<any>('');
  const [secondFlip, setSecondFlip] = useState<any>('');

  function shuffleCards() {
    const newArrOfCards = [...data, ...data].map((item) => ({ ...item, id: Math.random() }));

    const shuffledCards = newArrOfCards.sort(() => Math.random() - 0.5);

    const allCards = document.querySelectorAll('.card');

    allCards.forEach((card: any) => {
      card.classList.remove('done');
    });

    setCards(shuffledCards);
  }

  function showHideAllCards(showOrHide: string) {
    document.body.style.pointerEvents = showOrHide === 'show' ? 'none' : 'all';
    const allCardsFront = document.querySelectorAll('.card-front');

    allCardsFront.forEach((card: any) => {
      card.style.transform = showOrHide === 'show' ? 'rotateY(0deg)' : 'rotateY(90deg)';
    });
  }

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    showHideAllCards('show');

    setTimeout(() => {
      showHideAllCards('hide');
    }, 5000);
  }, [cards]);

  return (
    <div>
      <div className='grid grid-cols-4 gap-4 max-w-[800px] mx-auto'>
        {cards?.map((card, idx: number) => (
          <Card
            key={card.id}
            img={`/svgs/${card.img}`}
            setFirstFlip={setFirstFlip}
            setSecondFlip={setSecondFlip}
            firstFlip={firstFlip}
            secondFlip={secondFlip}
          />
        ))}

        <button className='text-yellow-50 text-2xl uppercase px-1 py-1 border-2 rounded-lg' onClick={shuffleCards}>
          reset
        </button>
      </div>
    </div>
  );
}
