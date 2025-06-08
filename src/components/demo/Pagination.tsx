import { Dispatch, SetStateAction, useEffect, useState } from "react";

const PaginationHandler = ({
  limit,
  max,
  setLimit,
  setPage,
  page,
}: {
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  max: number;
  page: number;
}) => {
  const totalPages = Math.ceil(max / limit);
  const [inputPage, setInputPage] = useState("");

  const jumpToPage = () => {
    const num = parseInt(inputPage);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      setPage(num);
    }
    setInputPage("");
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(1)}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            ⏮ First
          </button>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            ⬅ Prev
          </button>
        </div>

        <div className="flex gap-2 items-center">
          {page > 3 && (
            <>
              <button
                onClick={() => setPage(1)}
                className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
              >
                1
              </button>
              <span className="px-2">...</span>
            </>
          )}

          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300"
            >
              {page - 1}
            </button>
          )}
          <span className="px-3 py-1 rounded border bg-blue-500 text-white font-bold">
            {page}
          </span>
          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded border bg-gray-200 hover:bg-gray-300"
            >
              {page + 1}
            </button>
          )}

          {page < Math.ceil(max / limit) - 2 && (
            <>
              <span className="px-2">...</span>
              <button
                onClick={() => setPage(Math.ceil(max / limit))}
                className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200"
              >
                {Math.ceil(max / limit)}
              </button>
            </>
          )}
        </div>

        <div className="flex gap-2">
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            Next ➡️
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(totalPages)}
            className="px-3 py-1 rounded border bg-white disabled:opacity-50"
          >
            Last ⏭
          </button>
        </div>
      </div>

      {/* Page Size & Jump */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Page Size */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Items per page:</label>
          <select
            className="px-2 py-1 border rounded"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            {[5, 10, 20, 30, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        {/* Jump to Page */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Jump to page:</label>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            className="w-20 px-2 py-1 border rounded"
            placeholder="e.g. 3"
          />
          <button
            onClick={jumpToPage}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export const Pagination = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [max, setMax] = useState<number>(0);
  const [user, setUser] = useState<{ id: number; firstName: string }[]>([]);

  useEffect(() => {
    const baseurl = "https://dummyjson.com/users";
    const skip = limit * (page - 1);

    const params = new URLSearchParams({
      select: "firstName",
      limit: limit.toString(),
      skip: skip.toString(),
    });

    const url = `${baseurl}?${params.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMax(data.total);
        setUser(data.users);
      });
  }, [page, limit]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <div className="bg-white rounded shadow p-4 mb-4">
        {user.map((e) => (
          <div key={e.id} className="border-b py-2">
            <span className="font-medium">{e.id}</span> - {e.firstName}
          </div>
        ))}
      </div>
      <PaginationHandler
        limit={limit}
        max={max}
        setLimit={setLimit}
        setPage={setPage}
        page={page}
      />
    </div>
  );
};
