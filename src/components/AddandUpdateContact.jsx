import React from "react";
import Modal from "./Modal";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

//Schema validation for Yup
const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Invalid Email "),
});

const AddandUpdateContact = ({ contact, isOpen, onClose, isUpdate }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      toast.success("Contact Updated Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
            console.log(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className="text-xs text-red">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">E-mail</label>
              <Field type="email" name="email" className="h-10 border" />
              <div className="text-xs text-red">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className="bg-amber-600 py-1.5 px-3 self-end ">
              {isUpdate ? "Update" : " Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default AddandUpdateContact;
