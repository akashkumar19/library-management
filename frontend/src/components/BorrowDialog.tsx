import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import React from "react";
import { Book } from "../models";

interface Props {
  book: Book;
  onSubmit: (borrowerDetails: any) => void;
  onClose: () => void;
}

export const BorrowDialog: React.FC<Props> = ({ book, onSubmit, onClose }) => {
  return (
    <Dialog title={`Borrow: ${book.title}`} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        render={(formRenderProps) => (
          <FormElement>
            <Field
              name="name"
              component={Input}
              label="Name"
              validator={(value) => (!value ? "Name is required" : "")}
            />
            <Field
              name="email"
              component={Input}
              label="Email"
              validator={(value) => {
                if (!value) return "Email is required";
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Invalid email address";
                }
                return "";
              }}
            />
            <Field
              name="phone"
              component={Input}
              label="Phone"
              validator={(value) => (!value ? "Phone is required" : "")}
            />
            <div className="k-form-buttons">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" themeColor="primary">
                Borrow Book
              </Button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};
