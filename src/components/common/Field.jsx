import React from "react";

const Field = ({ label, children, htmlFor, error }) => {
  const id = htmlFor || getChildId(children);
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="mt-1">
        {children}
      </div>
      {!!error && (
        <div role="alert" className="text-red-600 text-sm mt-1">
          {error.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children) => {
  if (React.Children.count(children) === 1) {
    const child = React.Children.only(children);
    if ("id" in child?.props) {
      return child.props.id;
    }
  }
  // Handle case where children is not a single element
  return undefined;
};

export default Field;
