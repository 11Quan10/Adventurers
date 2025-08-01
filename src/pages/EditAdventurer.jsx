import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./EditAdventurer.css";

const EditAdventurer = () => {
    const { id } = useParams();
    const [adventurer, setAdventurer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdventurer = async () => {
            const { data, error } = await supabase
                .from("Adventurers")
                .select("*")
                .eq("id", id)
                .single();
            if (!error) setAdventurer(data);
            setLoading(false);
        };
        fetchAdventurer();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdventurer((prev) => ({
            ...prev,
            [name]:
                name === "stamina" || name === "experience"
                    ? Number(value)
                    : value,
        }));
    };

    const updateAdventurer = async (event) => {
        event.preventDefault();
        await supabase
            .from("Adventurers")
            .update({
                name: adventurer.name,
                weapon: adventurer.weapon,
                stamina: adventurer.stamina,
                experience: adventurer.experience,
            })
            .eq("id", id);
        window.location = "/gallery";
    };

    const deleteAdventurer = async () => {
        await supabase.from("Adventurers").delete().eq("id", id);
        window.location = "/gallery";
    };

    if (loading) return <div>Loading...</div>;
    if (!adventurer) return <div>Adventurer not found.</div>;

    return (
        <div className="edit-adventurer-container">
            <h2 className="edit-title">Edit Adventurer</h2>
            <form className="edit-form" onSubmit={updateAdventurer}>
                <label className="edit-label">
                    Name:
                    <input
                        className="edit-input"
                        type="text"
                        name="name"
                        value={adventurer.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="edit-label">
                    Weapon:
                    <input
                        className="edit-input"
                        type="text"
                        name="weapon"
                        value={adventurer.weapon}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="edit-label">
                    Stamina:
                    <input
                        className="edit-input"
                        type="number"
                        name="stamina"
                        value={adventurer.stamina}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </label>
                <label className="edit-label">
                    Experience:
                    <input
                        className="edit-input"
                        type="number"
                        name="experience"
                        value={adventurer.experience}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </label>
                <div className="edit-btn-group">
                    <button className="edit-btn" type="submit">
                        Update
                    </button>
                    <button
                        className="delete-btn"
                        type="button"
                        onClick={deleteAdventurer}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAdventurer;
