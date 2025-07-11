import React from "react";

function GenderCheckbox({ onCheckboxChange, selectedGender }) {
  return (
    <>
      <div className="flex">
        <div className="form-control">
          <label
            className={`label gap-2 cursor-pointer text-white ${
              selectedGender === "male" ? "selected" : ""
            }`}
          >
            <span className="label-text">Male</span>
            <input
              type="checkbox"
              className="checkbox border-slate-900"
              checked={selectedGender === "male"}
              onChange={() => onCheckboxChange("male")}
            />
          </label>
        </div>

        <div className="form-control">
          <label
            className={`label gap-2 cursor-pointer text-white ${
              selectedGender === "female" ? "selected" : ""
            }`}
          >
            <span className="label-text ml-2">Female</span>
            <input
              type="checkbox"
              className="checkbox border-slate-900"
              checked={selectedGender === "female"}
              onChange={() => onCheckboxChange("female")}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default GenderCheckbox;
