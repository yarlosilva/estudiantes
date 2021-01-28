import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import UserProfileCard from "../../components/user-profile-card/user-profile-card.compononent";

import { connect } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selector";

const UserProfilePage = ({ user }) => {



    return user ? (
        <>
            {/* Page content */}
            <Container style={{ marginTop: '7rem' }} className="mt--7" fluid>
                <Row>

                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My account</h3>
                                    </Col>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        User information
                      </h6>
                                    <div className="pl-lg-4">
                                        <Row>

                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-email"
                                                    >
                                                        Email address
                              </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-email"
                                                        placeholder="jesse@example.com"
                                                        value={user.email}
                                                        type="email"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        First name
                              </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        value={user.firstName}
                                                        id="input-first-name"
                                                        placeholder="First name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Last name
                              </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        value={user.lastName}
                                                        id="input-last-name"
                                                        placeholder="Last name"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />


                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    ) : (<div>Loading</div>);
}

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
})
export default connect(mapStateToProps)(UserProfilePage);

