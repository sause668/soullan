import { useModal } from '../../context/Modal';

function OpenModalCell({
  modalComponent, // component to render inside the modal
  cellText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  cssClasses
}) {
  // console.log('useModal')
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <td onClick={onClick} className={cssClasses}>{cellText}</td>;
}

export default OpenModalCell;
