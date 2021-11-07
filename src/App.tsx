import { useEffect, useState } from 'react';
import { Card } from './components';
import Confetti from 'react-confetti';

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

let interval: any;

export default function App() {
  const [cards, setCards] = useState<{ id: number; img: string }[] | undefined>(undefined);
  const [firstFlip, setFirstFlip] = useState<any>('');
  const [timer, setTimer] = useState<number>(6);
  const [flipCount, setFlipCount] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  function shuffleCards() {
    // setTimer(6);
    const newArrOfCards = [...data, ...data].map((item) => ({ ...item, id: Math.random() }));

    const shuffledCards = newArrOfCards.sort(() => Math.random() - 0.5);

    const allCards = document.querySelectorAll('.card');

    allCards.forEach((card: any) => {
      card.classList.remove('done');
    });

    setCards(shuffledCards);

    interval = setInterval(() => {
      setTimer((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        }
        return 0;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 6000);
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
    }, 6000);
  }, [cards]);

  useEffect(() => {
    const allCards: any = document.querySelectorAll('.card');

    if (allCards.length) {
      const allDone = [...allCards].every((card: any) => card.classList.contains('done'));

      if (allDone) {
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 4000);
      }
    }
  }, [flipCount]);

  return (
    <div className='max-w-[800px] mx-auto min-h-screen flex flex-col items-center justify-center'>
      {showConfetti ? <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} /> : null}

      <h1 className='text-white text-2xl font-semibold mb-5 text-center sm:text-4xl'>Simple Memory Game</h1>
      <button
        className='text-yellow-50 text-xl sm:text-2xl px-4 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700 cursor-pointer transition-all mb-4'
        onClick={() => {
          setTimer(6);
          shuffleCards();
        }}
      >
        New Game
      </button>

      <div className='text-white text-xl mb-5'>{timer ? <p>game starts in {timer}s</p> : null}</div>
      <div className='grid grid-cols-4 gap-4 mx-auto'>
        {cards?.map((card, idx: number) => (
          <Card key={card.id} img={`/svgs/${card.img}`} setFirstFlip={setFirstFlip} firstFlip={firstFlip} setFlipCount={setFlipCount} />
        ))}
      </div>
    </div>
  );
}
