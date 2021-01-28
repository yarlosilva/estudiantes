import './table.styles.scss';
import {
    Badge,

    Media,
    Progress,

} from "reactstrap";

const TableC = ({ correctPoints,
    numberOfCorrectAnswers,
    numberOfIncorrectAnswers,
    numberOfQuestions,
    examName }) => {

    return (
        <tr>
            <th scope="row">
                <Media className="align-items-center">
                    <a
                        className="avatar rounded-circle mr-3"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                    >
                    </a>
                    <Media>
                        <span className="mb-0 text-sm">
                            {examName}
                           </span>
                    </Media>
                </Media>
            </th>
            <td>{numberOfQuestions * 10}</td>
            <td>
                <Badge color="" className="badge-dot">
                    <i className="bg-success" />
                    {correctPoints}
                </Badge>
            </td>
            <td>
                {numberOfCorrectAnswers}
            </td>
            <td>
                <div className="d-flex align-items-center">
                    <span className="mr-2">{numberOfIncorrectAnswers}</span>
                    <div>
                        <Progress
                            max="100"
                            value="100"
                            barClassName="bg-success"
                        />
                    </div>
                </div>
            </td>


        </tr>
    );
}

export default TableC;