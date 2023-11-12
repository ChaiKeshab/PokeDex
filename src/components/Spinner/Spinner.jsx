/* eslint-disable */
const Spinner = ({ className }) => {
  return (
    <svg className={`${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <style>
        {`
          .spinner {
            transform-origin: center;
            animation: spinner-rotate 0.6s linear infinite;
            stroke: rgba(169, 169, 169, 0.9);
            fill: rgba(169, 169, 169, 0.9);
          }
          @keyframes spinner-rotate {
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <path className="spinner" d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c0.34,0,0.67,0,1-0.05C6,23,2,17.74,2,12Z" />
    </svg>
  );
};

export default Spinner;
