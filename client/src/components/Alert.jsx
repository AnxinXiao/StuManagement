import React from "react";

/**
 * 提示组件
 * @param {*} props
 * @returns
 */
export default function Alert(props) {
  return (
    <div
      className={["alert", "alert-dismissible", "alert-" + props.type].join(
        " "
      )}
      role="alert"
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>提示!&nbsp;&nbsp;</strong>
      {props.alert}
    </div>
  );
}
