import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const categoriesResponse = {
    "content": [
        {
          "id": 3,
          "name": "Computadores"
        },
        {
          "id": 2,
          "name": "Eletrônicos"
        },
        {
          "id": 1,
          "name": "Livros"
        }
    ]
};

export const fillFormData = () => {
  const nameInput = screen.getByTestId('name');
  const priceInput = screen.getByLabelText('Preço');
  const imgUrlInput = screen.getByTestId('imgUrl');
  const descriptionInput = screen.getByTestId('description');

  userEvent.type(nameInput, 'product');
  userEvent.type(priceInput, '5000');
  userEvent.type(imgUrlInput, 'image.png');
  userEvent.type(descriptionInput, 'product for test');
}

export const product = {
  "id": 1,
  "name": "The Lord of the Rings",
  "description": "Lorem ipsum dolor sit amet.",
  "price": 90.5,
  "imgUrl": "image.png",
  "date": "2020-07-13T20:50:07.123450Z",
  "categories": [
    {
      "id": 1,
      "name": "Livros"
    },
    {
      "id": 2,
      "name": "Eletrônicos"
    }
  ]
}