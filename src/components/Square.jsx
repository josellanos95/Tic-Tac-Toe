/* eslint-disable react/prop-types */


export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""} ${children === 'X' ? 'is-x' : ''} ${children === 'O' ? 'is-o' : ''}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};