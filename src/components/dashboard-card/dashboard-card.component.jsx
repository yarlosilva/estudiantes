import './dashboard-card.styles.scss';
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
const DashBoardCard = ({ average }) => {
    return (
        <Col lg="6" xl="4">
            <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                    <Row>
                        <div className="col">
                            <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                            >
                                Avarage
              </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                                {Math.floor(average)}
              </span>
                        </div>
                        <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-chart-bar" />
                            </div>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        </Col>
    );
}

export default DashBoardCard;