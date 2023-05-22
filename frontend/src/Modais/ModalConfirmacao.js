import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { atualizarCampanhas,excluirCampanhas} from '../redux/redutores/CampDoacaoSlice'
import { useDispatch } from 'react-redux';



export default function ModalConfirmacao(props) {
    const dispatch = useDispatch();//despacha ações para redutores da store
    
      
    console.log(props);
    if (props.dados != "") {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
            <Modal.Header closeButton>
                    <Modal.Title>  
                        Aviso  
                        <svg
                            viewBox="0 0 21 21"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            {...props}
                            >
                            <g fill="none" fillRule="evenodd" transform="translate(-1 -1)">
                                <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.517 3.5l4.983 5v6l-4.983 5H8.5l-5-5v-6l5-5zM11.5 12.5v-5"
                                />
                                <path
                                fill="currentColor"
                                d="M12.5 15.5 A1 1 0 0 1 11.5 16.5 A1 1 0 0 1 10.5 15.5 A1 1 0 0 1 12.5 15.5 z"
                                />
                            </g>
                        </svg>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body><h5>Deseja {props.tipo} a Campanha {props.dados.camp_nome.toUpperCase()} ?</h5></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide} >
                  Sair
                </Button>
              
                <Button variant="danger"  onClick={() => {
                    if (props.tipo ==="Finalizar") {
                        dispatch(atualizarCampanhas(props.dados));
                        window.location.reload(); 
                    }else{
                        dispatch(excluirCampanhas(props.dados)); 
                    }
                
                }}
                >
                    {props.tipo}
                </Button>
              
            </Modal.Footer>
      </Modal>
    );
    }
}