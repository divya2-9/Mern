// frontend/src/App.js
import React, { useState } from "react";
import "./App.css";

function App() {
    const [students, setStudents] = useState([
        { rollNumber: "101", name: "Alice", age: "19", grade: "8" },
        { rollNumber: "102", name: "Bob", age: "20", grade: "9" },
        { rollNumber: "103", name: "annie", age: "20", grade: "1" }
    ]);
    const [form, setForm] = useState({ rollNumber: "", name: "", age: "", grade: "" });
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const updatedStudents = [...students];
            updatedStudents[editingIndex] = form;
            setStudents(updatedStudents);
            setEditingIndex(null);
        } else {
            setStudents([...students, form]);
        }
        setForm({ rollNumber: "", name: "", age: "", grade: "" });
        setShowForm(false);
    };

    const handleEdit = (index) => {
        setForm(students[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    return (
        <div className="main-container">
            <h1>Classroom Management</h1>
            <div className="student-list-container">
                <h2>Students</h2>
                <ul className="student-list">
                    {students.map((student, index) => (
                        <li key={index} className="student-item">
                            <span>{student.rollNumber} - {student.name} ({student.age} years, Grade {student.grade})</span>
                            <div>
                                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="add-student-btn" onClick={() => setShowForm(!showForm)}>Add New Student</button>
            {showForm && (
                <div className="form-container">
                    <h2>{editingIndex !== null ? "Edit Student" : "Add Student"}</h2>
                    <form className="student-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Roll Number" value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} required />
                        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                        <input type="text" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
                        <input type="text" placeholder="Grade" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} required />
                        <button type="submit" className="btn">{editingIndex !== null ? "Update Student" : "Add Student"}</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;
