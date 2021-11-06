interface CardProps {
  img: string;
}

export default function Card({ img }: CardProps) {
  function reveal(e: any) {
    e.target.previousElementSibling.style.transform = 'rotateY(0)';
  }

  function hide(e: any) {
    e.target.style.transform = 'rotateY(90deg)';
  }

  return (
    <div className='relative flex items-center justify-center'>
      <img
        src={img}
        alt='memory'
        className='rounded-lg shadow-lg absolute transition-all duration-500'
        style={{ transform: 'rotateY(90deg)' }}
        onClick={hide}
      />
      <img src='/svgs/cover.svg' alt='memory' className='rounded-lg shadow-lg' onClick={reveal} />
    </div>
  );
}
