import '../../UI/uiStyles/CustomModal.css'
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const CustomModal = (props) => {

    const { toggleModal, toggleModalVisibility } = props;

    return (
        <Modal
            isOpen={toggleModal}
            onRequestClose={toggleModalVisibility}
            contentLabel="Example Modal"
            parentSelector={() => document.querySelector('#root')}
            style={customStyles}
        >
            <h2 className='ModalTitle'>Battleship 3v3 Instructions</h2>
            <h4 className='ModalTitle'>Home and Lobby</h4>
            <ol>
                <li>The game starts by entering your username and creating a room.</li>
                <li>Two of your friends need to type their username and the room name you just entered.</li>
                <li>While your friends join you will be able waiting for them in the lobby, where you will be able to see your boats inside your grid.</li>
            </ol>
            <h4 className='ModalTitle'>Game</h4>
            <ol>
                <li>The first user that joins the room will be player #1, meaning that he will be the first one to attack players #2 and #2, respectively.</li>
                <li>Then, player #2 will attack players #1 and #3, respectively.</li>
                <li>The last player that joined will be player #3, attacking #1 and #2, respectively.</li>
                <li>This will be the attacks' order until all of one player's boats are killed.</li>
                <li>After one player is eliminated, the remaining players will be playing against each other to see who is the first one to eliminate the other player's boats.</li>
            </ol>
            <h4 className='ModalTitle'>Winner</h4>
                <ol>
                    <li>As mentioned before, the winner of the Battleship 3v3 will be the last man standing, meaning the player that is able to delete both of their opponents.</li>
                    <li>The winner will be shown after the game is completed.</li>
                </ol>
        </Modal>
    )
}

export default CustomModal;