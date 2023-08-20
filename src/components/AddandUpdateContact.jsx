import React from "react";
import Modal from "./Modal";
import { Field, Formik, Form } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

const AddandUpdateContact = ({ isOpen, onClose }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          initialValues={{
            name: "",
            email: "",
          }}
          onSubmit={(values) => {
            addContact(values);
            console.log(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">E-mail</label>
              <Field type="email" name="email" className="h-10 border" />
            </div>
            <button className="bg-amber-600 py-1.5 px-3 self-end ">
              Add Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default AddandUpdateContact;
