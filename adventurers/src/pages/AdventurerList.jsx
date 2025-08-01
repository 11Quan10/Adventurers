import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import "./AdventurerList.css";

const AdventurerList = () => {
    const [adventurers, setAdventurers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdventurers = async () => {
            const { data, error } = await supabase
                .from("Adventurers")
                .select("*")
                .order("created_at", { ascending: false });
            if (!error) setAdventurers(data);
            setLoading(false);
        };
        fetchAdventurers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="adventurer-list-container">
            <h2 className="adventurer-gallery-title">Adventurer Gallery</h2>
            <p className="adventurer-gallery-desc">
                View your team of adventurers here!
            </p>
            <div className="adventurer-card-list">
                {adventurers.map((adv) => (
                    <div className="adventurer-card" key={adv.id}>
                        <div className="adventurer-card-header">
                            <Link
                                to={`/adventurer/${adv.id}`}
                                className="adventurer-name"
                            >
                                {adv.name}
                            </Link>
                        </div>
                        <div className="adventurer-card-body">
                            <div className="adventurer-stat">
                                <strong>Weapon:</strong> {adv.weapon}
                            </div>
                            <div className="adventurer-stat">
                                <strong>Stamina:</strong> {adv.stamina}
                            </div>
                            <div className="adventurer-stat">
                                <strong>Experience:</strong> {adv.experience}
                            </div>
                        </div>
                        <div className="adventurer-card-footer">
                            <Link
                                to={`/edit/${adv.id}`}
                                className="edit-adventurer-link"
                            >
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdventurerList;
