import React from "react";

const Table = () => {
  return (
    <table className="table-fixed text-left rounded-lg overflow-hidden ">
      <thead className="border-b border-slate-600 text-slate-200 bg-slate-900 ">
        <tr>
          <th className="py-4 px-8">Song</th>
          <th className="py-4 px-8">Artist</th>
          <th className="py-4 px-8">Year</th>
        </tr>
      </thead>
      <tbody className="bg-slate-800 text-slate-400">
        <tr className="border border-slate-700">
          <td className="py-4 px-8">
            The Sliding Mr. Bones (Next Stop, Pottersville)
          </td>
          <td className="py-4 px-8">Malcolm Lockyer</td>
          <td className="py-4 px-8">1961</td>
        </tr>
        <tr className="border border-slate-700">
          <td className="py-4 px-8">Witchy Woman</td>
          <td className="py-4 px-8">The Eagles</td>
          <td className="py-4 px-8">1972</td>
        </tr>
        <tr>
          <td className="py-4 px-8">Shining Star</td>
          <td className="py-4 px-8">Earth, Wind, and Fire</td>
          <td className="py-4 px-8">1975</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
