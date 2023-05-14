import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const { Search } = Input;

const SearchForm = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="d-flex justify-content-center">
      <Form layout="inline" onFinish={handleSubmit}>
        <Form.Item>
          <Search
            placeholder="Enter Zip Code/City"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchForm;
