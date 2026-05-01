import React, { useEffect, useState } from "react";
import axios from "axios";
import { Styled } from "./App.styled";

const API_URL = "http://localhost:1198/api/contacts";

const emptyForm = {
    name: "",
    email: "",
    phone: "",
    status: "Active",
};

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchContacts = async () => {
        try {
            setFetching(true);
            const res = await axios.get(API_URL);
            setContacts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }

            setFormData(emptyForm);
            setEditId(null);
            await fetchContacts();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (contact) => {
        setEditId(contact.id);
        setFormData({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            status: contact.status || "Active",
        });
    };

    const handleDelete = async (id) => {
        const ok = window.confirm(
            "Are you sure you want to delete this contact?",
        );
        if (!ok) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            await fetchContacts();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Styled.Wrapper>
            <div className="container">
                <h1>Airtable CRUD App</h1>
                <p>
                    Simple contacts manager using React, Express, and Airtable.
                </p>

                <form onSubmit={handleSubmit} className="form">
                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Blocked">Blocked</option>
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Saving..."
                            : editId
                              ? "Update Contact"
                              : "Add Contact"}
                    </button>
                </form>

                {/* 🔥 LOADING STATE */}
                {fetching ? (
                    <div className="loaderWrapper">
                        <div className="loader"></div>
                        <p>Loading contacts...</p>
                    </div>
                ) : (
                    <div className="tableBox">
                        {contacts.length === 0 ? (
                            <p
                                style={{
                                    textAlign: "center",
                                    marginTop: "20px",
                                }}
                            >
                                No contacts found
                            </p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {contacts
                                        .filter(
                                            (c) =>
                                                c.name?.trim() ||
                                                c.email?.trim() ||
                                                c.phone?.trim(),
                                        )
                                        .map((contact) => (
                                            <tr key={contact.id}>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.phone}</td>
                                                <td>{contact.status}</td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(contact)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                contact.id,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </Styled.Wrapper>
    );
};

export default App;
