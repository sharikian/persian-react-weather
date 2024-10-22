import { Card, CardGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faTable, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import style from './SlotGroup.module.css'

export const SlotGroup = ({ setChartModel, onClose }) => {
    const handleSet = (numberId) => {
        setChartModel(numberId);
        onClose();
    }
  return (
    <CardGroup className="d-flex justify-content-around gap-2">
      <CardBox
        icon={faWaveSquare}
        title="نموداری"
        description="خطی و حالت پیشفرض"
        order={3}
        onClick={() => {handleSet(0)}}
      />
      <CardBox
        icon={faBoxArchive}
        title="جعبه ای"
        description="نمایش در حالت جعبه ای"
        order={2}
        onClick={() => {handleSet(1)}}
      />
      <CardBox
        icon={faTable}
        title="جدول"
        description="نمایش در جدول تغییرات"
        order={1}
        onClick={() => {handleSet(2)}}
      />
    </CardGroup>
  );
};

const CardBox = ({ icon, title, description, order, onClick }) => {
    return (
        <Card text="center" style={{ order }} className={style.card} onClick={onClick}>
            <Card.Body>
                <FontAwesomeIcon icon={icon} size="3x"/>
                <Card.Title className="mt-2">{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    )
}


