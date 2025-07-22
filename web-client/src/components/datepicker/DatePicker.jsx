import React from "react";
import "cally";

export default function DatePicker({
    label,
    pickerId,
    dateVal,
    setDateVal,
    setFetchMore
}) {
  return (
    // <div>
    //   <button
    //     popoverTarget="cally-popover1"
    //     className="input input-border"
    //     id="cally1"
    //     // style="anchorName:--cally1"
    //     style={{
    //         anchorName: "var(--cally1)"
    //     }}
    //   >
    //     Pick a date
    //   </button>
    //   <div
    //     popover
    //     id="cally-popover1"
    //     className="dropdown bg-base-100 rounded-box shadow-lg"
    //     // style="positionAnchor:--cally1"
    //     style={{
    //         positionAnchor: "var(--cally1)"
    //     }}
    //   >
    //     <calendar-date
    //       class="cally"
    //       onchange={()=> {
    //         document.getElementById("cally1").innerText = this.value
    //       }}
    //     >
    //       <svg
    //         aria-label="Previous"
    //         className="fill-current size-4"
    //         slot="previous"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //       >
    //         <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
    //       </svg>
    //       <svg
    //         aria-label="Next"
    //         className="fill-current size-4"
    //         slot="next"
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //       >
    //         <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
    //       </svg>
    //       <calendar-month></calendar-month>
    //     </calendar-date>
    //   </div>
    // </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <label htmlFor={pickerId}>{label}</label>
        <input type="date" className="input" id={pickerId} />
      </div>
  );
}
