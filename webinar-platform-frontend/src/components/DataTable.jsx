export default function DataTable({ columns, data, emptyText = 'No data found.' }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 light:border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white/5 light:bg-slate-100">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-5 py-4 text-sm font-semibold text-slate-300 light:text-slate-700">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((row, index) => (
                <tr key={row.id || index} className="border-t border-white/10 light:border-slate-200">
                  {columns.map((column) => (
                    <td key={column.key} className="px-5 py-4 text-sm text-slate-300 light:text-slate-700">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-8 text-center text-sm text-slate-400 light:text-slate-600">
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
