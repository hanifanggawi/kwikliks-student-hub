 const LinkForm = () => {
    return (
        <div className="link-form">
            <form className="form-box">
                <div className="form-fields">
                    <p className="link-field-label">Link Title</p>
                    <input type="text"className="link-input" placeholder="Link title"/>
                    <p className="link-field-label">Url</p>
                    <input type="text"className="link-input" placeholder="Url"/>
                </div>
                <div className="form-buttons">
                    <button className="button-fill" type="submit">Save</button>
                    <button className="button-outline">Cancel</button>
                </div>             
            </form>
        </div>
    )
}

export default LinkForm
