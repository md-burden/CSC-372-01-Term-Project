import "../../styles/profile-page.css";

function ProfilePage() {
    return (
        <div className="profile-page">
            <div id="profile-picture-section">
                <div id="picture">
                    <img src="https://ffxivcollect.com/images/mounts/large/379.png" alt="" />
                </div>
                <div id="edit">Edit</div>
            </div>
            <div id="name-field">
                <h2>Name</h2>
                <input type="text" defaultValue="Margarett Thatcher" readOnly/>
            </div>
            <div id="username-field">
                <h2>UserName</h2>
                <input type="text" defaultValue="mthatcher" readOnly/>
            </div>
        </div>
    );
}

export default ProfilePage;