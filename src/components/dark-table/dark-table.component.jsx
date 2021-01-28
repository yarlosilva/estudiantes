import './dark-table.styles.scss';

import { connect } from 'react-redux';

import {
    Card,
    CardHeader,
    Table,
    Row,

} from "reactstrap";
import TableC from '../table/table.component';

const DarkTable = ({ lastResult }) => {
    console.log(lastResult)

    return lastResult ? (

        <Row className="mt-5">
            <div className="col">
                <Card className="bg-default shadow">
                    <CardHeader className="bg-transparent border-0">
                        <h3 className="text-white mb-0">Last Exams</h3>
                    </CardHeader>
                    <Table
                        className="align-items-center table-dark table-flush"
                        responsive
                    >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Exam Name</th>
                                <th scope="col">Totla Marks</th>
                                <th scope="col">My Marks</th>
                                <th scope="col">Correct Answer</th>
                                <th scope="col">Incorrect Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lastResult.length > 0 ? lastResult.map(el => <TableC {...el} />) : (<h1 className='data'>No Data Available</h1>)
                            }
                        </tbody>
                    </Table>
                </Card>
            </div>
        </Row>
    ) : (<div>Loading...</div>)
}


export default DarkTable;