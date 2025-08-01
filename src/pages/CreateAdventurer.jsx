import { useState } from "react";
import { supabase } from "../client";
import "./CreateAdventurer.css";

const CreateAdventurer = () => {
    const [adventurer, setAdventurer] = useState({
        name: "",
        weapon: "",
        stamina: 0,
        experience: 0,
    });

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

    const createAdventurer = async (event) => {
        event.preventDefault();
        await supabase
            .from("Adventurers")
            .insert({
                name: adventurer.name,
                weapon: adventurer.weapon,
                stamina: adventurer.stamina,
                experience: adventurer.experience,
            })
            .select();
        window.location = "/gallery";
    };

    return (
        <div className="create-adventurer-container">
            <h2 className="create-title">Create Adventurer</h2>
            <form className="create-form" onSubmit={createAdventurer}>
                <label className="create-label">
                    Name:
                    <input
                        className="create-input"
                        type="text"
                        name="name"
                        value={adventurer.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="create-label">
                    Weapon:
                    <input
                        className="create-input"
                        type="text"
                        name="weapon"
                        value={adventurer.weapon}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="create-label">
                    Stamina:
                    <input
                        className="create-input"
                        type="number"
                        name="stamina"
                        value={adventurer.stamina}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </label>
                <label className="create-label">
                    Experience:
                    <input
                        className="create-input"
                        type="number"
                        name="experience"
                        value={adventurer.experience}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </label>
                <div className="create-btn-group">
                    <button className="create-btn" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAdventurer;
