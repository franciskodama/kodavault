export default function HtmlTable() {
  return (
    <div className='overflow-x-auto'>
      <table className='table-auto border-collapse border border-gray-400 w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-400 px-4 py-2'>Wave</th>
            <th className='border border-gray-400 px-4 py-2'>
              Retracement Levels
            </th>
            <th className='border border-gray-400 px-4 py-2'>
              Extension Levels
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave 1</td>
            <td className='border border-gray-400 px-4 py-2'>
              Typically no retracement
            </td>
            <td className='border border-gray-400 px-4 py-2'>
              Can extend to 1.618 or more
            </td>
          </tr>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave 2</td>
            <td className='border border-gray-400 px-4 py-2'>
              0.5 - 0.618 (sometimes 0.786)
            </td>
            <td className='border border-gray-400 px-4 py-2'>N/A</td>
          </tr>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave 3</td>
            <td className='border border-gray-400 px-4 py-2'>
              Rarely retraces much
            </td>
            <td className='border border-gray-400 px-4 py-2'>
              1.618 - 2.618 (or even 4.236)
            </td>
          </tr>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave 4</td>
            <td className='border border-gray-400 px-4 py-2'>
              0.236 - 0.382 (rarely 0.5)
            </td>
            <td className='border border-gray-400 px-4 py-2'>N/A</td>
          </tr>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave 5</td>
            <td className='border border-gray-400 px-4 py-2'>
              0.382 - 0.618 of Wave 4
            </td>
            <td className='border border-gray-400 px-4 py-2'>
              0.618 - 1.618 of Wave 1
            </td>
          </tr>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave A</td>
            <td className='border border-gray-400 px-4 py-2'>
              0.5 - 0.618 of previous move
            </td>
            <td className='border border-gray-400 px-4 py-2'>
              Can extend to 1.0 - 1.382
            </td>
          </tr>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave B</td>
            <td className='border border-gray-400 px-4 py-2'>
              0.382 - 0.886 of Wave A
            </td>
            <td className='border border-gray-400 px-4 py-2'>
              Usually does not extend
            </td>
          </tr>
          <tr>
            <td className='border border-gray-400 px-4 py-2'>Wave C</td>
            <td className='border border-gray-400 px-4 py-2'>
              1.0 - 1.618 of Wave A
            </td>
            <td className='border border-gray-400 px-4 py-2'>
              Can reach 2.618 in strong trends
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
