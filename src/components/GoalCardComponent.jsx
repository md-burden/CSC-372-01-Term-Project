import '../styles/goal-card.css';

function GoalCardComponent() {
    const testNotes = "This is a test note for the goal card component. It should display properly in the notes section.This is a test note for the goal card component. It should display properly in the notes section.This is a test note for the goal card component. It should display properly in the notes section.";


    return (
        <>
            <div className="goal-card">
                <div id="goal-title">
                    <h2 id="goal-title">Get this new really cool mount!</h2>
                    <div id="complete">
                        <p>Complete</p>
                        <input type="radio" />
                    </div>
                </div>
                <div id="goal-content">
                    <div id="details">
                        <div id="description">
                            <div className="detail-item">
                                <strong>Name</strong>
                                <p>Cerberus</p>
                            </div>
                            <div className="detail-item">
                                <strong>Name</strong>
                                <p>Cerberus</p>
                            </div>
                            <div className="detail-item">
                                <strong>Movement</strong>
                                <p>Terrestrial</p>
                            </div>
                            <div className="detail-item">
                                <strong>Patch</strong>
                                <p>5.45</p>
                            </div>
                            <div className="detail-item">
                                <strong>Tradable</strong>
                                <p>No</p>
                            </div>
                             <div className="detail-item">
                                <strong>Owned</strong>
                                <p>3.2%</p>
                            </div>
                            <div className="detail-item">
                                <strong>Source</strong>
                                <a href="#">Savage Queen of Swords I</a>
                            </div>
                        </div>
                        <div id="notes">
                            <strong>Notes</strong>
                            <p>{testNotes}</p>
                        </div>
                    </div>
                    <div id="image">
                        <img src="https://ffxivcollect.com/images/mounts/large/235.png" alt="Cerberus" id="mount-image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GoalCardComponent