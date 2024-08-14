import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import axios from "axios";


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
};

const pizzaSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('full name is required.'),
  size: yup
    .string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('size is required.'),
  // toppings: yup
  //   .array()
  //   .of(yup.string()
  //     .oneOf(['1', '2', '3', '4', '5']))
  //   .optional(),
});

const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
];

const initialFormValues = {
  fullName: "",
  size: "",
  toppings: [],
};

const initialErrors = {
  fullName: "",
  size: "",
};

export default function Form() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleToppings = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      toppings: checked
        ? [...formValues.toppings, name]
        : formValues.toppings.filter(t => t !== name),
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });

  };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await pizzaSchema.validate(formValues, { abortEarly: false });
        setErrors({});
        setIsSubmitted(true);
        setFormValues(initialFormValues);

      } catch (err) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        setIsSubmitted(false);
      }
    };



    return (
      <form onSubmit={handleSubmit}>
        <h2>Order Your Pizza</h2>
        {isSubmitted && <div className='success'>
          {`Thank you for your order, ${formValues.fullName}!`}
        </div>}
        <div className="input-group">
          <div>
            <label htmlFor="fullName">Full Name</label><br />
            <input
              placeholder="Type full name"
              id="fullName"
              type="text"
              value={formValues.fullName}
              onChange={handleChange} />
          </div>
          {errors.fullName && <div className="validation">{errors.fullName}</div>}
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="size">Size</label><br />
            <select id="size" value={formValues.size} onChange={handleChange}>
              <option value="">----Choose Size----</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
          </div>
          {errors.size && <div className="validation">{errors.size}</div>}
        </div>

        <div className="input-group">
          {toppings.map((topping) => (
            <label key={topping.topping_id}>
              <input
                onChange={toggleToppings}
                checked={formValues.toppings.includes(topping.topping_id)}
                type="checkbox"
                name={topping.topping_id}
              />
              {topping.text}
              <br />
            </label>
          ))}
        </div>
        <input disabled={isSubmitted} type="submit" />
      </form>
    );
  }
