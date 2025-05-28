import React, { ChangeEvent } from "react";
import { useAppDispatch } from "redux/redux-hooks";
import { setPageView } from "redux/slicers/movieSlicer";

function InfiniteScrollToggle({ isInfiniteScroll }: { isInfiniteScroll: boolean }) {
  const dispatch = useAppDispatch();

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPageView(e?.target?.checked ? "infinite_sroll" : "paginate"));
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isInfiniteScroll}
        onChange={handleToggle}
      />
      <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300 p-1">
        <div
          className={`w-5 top-3  h-5 bg-white rounded-full shadow transform ${
            isInfiniteScroll ? "translate-x-full" : ""
          } transition-all duration-300`}
        ></div>
      </div>
      <span className="ml-3 text-sm font-medium text-white">Infinite Scroll</span>
    </label>
  );
}

export default InfiniteScrollToggle;
