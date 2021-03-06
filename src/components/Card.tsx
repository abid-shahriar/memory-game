interface CardProps {
  img: string;
  setFirstFlip: Function;
  firstFlip: any;
  setFlipCount: Function;
}

export default function Card({ img, setFirstFlip, firstFlip, setFlipCount }: CardProps) {
  function reveal(e: any) {
    if (e.target.parentElement.classList.contains('done')) return;

    setFlipCount((flipCount: number) => flipCount + 1);

    if (!firstFlip) {
      setFirstFlip(e.target.previousElementSibling);
      e.target.previousElementSibling.style.transform = 'rotateY(0)';
      return;
    }

    if (firstFlip && firstFlip.src === e.target.previousElementSibling.src) {
      firstFlip.parentElement.classList.add('done');
      e.target.parentElement.classList.add('done');
      e.target.previousElementSibling.style.transform = 'rotateY(0deg)';

      setFirstFlip('');
      return;
    }

    document.body.style.pointerEvents = 'none';
    e.target.previousElementSibling.style.transform = 'rotateY(0)';

    setTimeout(() => {
      firstFlip.style.transform = 'rotateY(90deg)';
      e.target.previousElementSibling.style.transform = 'rotateY(90deg)';

      setFirstFlip('');

      document.body.style.pointerEvents = 'all';
    }, 1000);
  }

  function hide(e: any) {
    if (e.target.parentElement.classList.contains('done')) return;

    setFlipCount((flipCount: number) => flipCount + 1);

    e.target.style.transform = 'rotateY(90deg)';
    setFirstFlip(undefined);
  }

  return (
    <div className='card relative flex items-center justify-center'>
      <img
        src={img}
        alt='memory'
        className='card-front rounded-lg shadow-lg absolute transition-all duration-500'
        style={{ transform: 'rotateY(90deg)' }}
        onClick={hide}
      />
      <img src='/svgs/cover.svg' alt='memory' className='card-back rounded-lg shadow-lg' onClick={reveal} />
    </div>
  );
}
