import Link from 'next/link';
import { FaEye } from "react-icons/fa";

function FeedRow(props) {
  return (
    <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">Case No</span>
        {props.number + 1}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Case Type
        </span>
        {props.case.Case_Type}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Lawyer Name
        </span>
        {props.case.Lawyer_Name}
      </td>
      <td className="p-2 md:border md:border-grey-500  block md:table-cell">
        <span className="inline-block w-1/3 md:hidden font-bold">
          Hearing Date
        </span>
        {props.case.Hearing_Date}
      </td>
      <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
        <Link href={`/dashboard/${props.case.uid}`}>
          <div className="bg-blue-700 p-2 hover:bg-blue-500 w-8 flex items-center text-white hover:text-black rounded-full transition duration-300">
            <FaEye />
          </div>
        </Link>
      </td>
    </tr>
  );
}

export default FeedRow;
