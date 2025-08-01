import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";
import "./AdventurerDetail.css";

const AdventurerDetail = () => {
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

    if (loading) return <div>Loading...</div>;
    if (!adventurer) return <div>Adventurer not found.</div>;

    return (
        <div className="adventurer-detail-container">
            <h2 className="detail-title">{adventurer.name}</h2>
            <div className="detail-stats">
                <div className="detail-stat">
                    <strong>Weapon:</strong> {adventurer.weapon}
                </div>
                <div className="detail-stat">
                    <strong>Stamina:</strong> {adventurer.stamina}
                </div>
                <div className="detail-stat">
                    <strong>Experience:</strong> {adventurer.experience}
                </div>
                {adventurer.created_at && (
                    <div className="detail-stat">
                        <strong>Created At:</strong>{" "}
                        {new Date(adventurer.created_at).toLocaleString()}
                    </div>
                )}
            </div>
            <Link to={`/edit/${adventurer.id}`} className="detail-edit-link">
                Edit Adventurer
            </Link>
        </div>
    );
};

export default AdventurerDetail;
