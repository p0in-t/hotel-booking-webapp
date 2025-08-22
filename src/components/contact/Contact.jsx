import './Contact.css';

const Contact = () => {
    const handleSubmit = (event) => {
        event.preventDefault();

        alert('Your message has been sent!')
    }

    return (
        <div className='contact-main-container'>
            <div className='contact-form-container'>
                <form className='contact-form' onSubmit={handleSubmit}>
                    <header className="form-header" style={{fontFamily: 'Corbel', fontSize: '24px', fontWeight: 'bold'}}>
                        Contact Us
                    </header><br/>
                    <label htmlFor="reg-form">
                        Fill up the form below to send us a message
                    </label><br/>

                    <label htmlFor="full-name">Full Name</label>
                    <input type="text" className="full-name" name="full-name" placeholder="John Doe" required/><br></br>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email" name="email" placeholder="example@company.com" required/><br></br>
                    <label htmlFor="gender">Gender</label>
                    <label>
                        <input type="radio" name="gender" value="male" required/>
                        Male
                    </label>
                    <label>
                        <input type="radio" name="gender" value="female" required/>
                        Female
                    </label><br/>

                    <label htmlFor="checkboxWOM">Where did you find about us</label><br/>

                    <div className='checkbox-container'>
                        <div className="checkbox-wrapper-4">
                            <input className="inp-cbx" id='wom' name='wom' type="checkbox"/>
                            <label className="cbx" htmlFor="wom"><span>
                            <svg width="12px" height="10px">
                            <use xlinkHref="#check-4"></use>
                            </svg></span><span>Word of mouth</span></label>
                                <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                            <input className="inp-cbx" id="sn" name='sn' type="checkbox"/>
                            <label className="cbx" htmlFor="sn"><span>
                            <svg width="12px" height="10px">
                            <use xlinkHref="#check-4"></use>
                            </svg></span><span>Social network</span></label>
                                <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>

                        <div className="checkbox-wrapper-4">
                            <input className="inp-cbx" id="tvad" name='tvad' type="checkbox"/>
                            <label className="cbx" htmlFor="tvad"><span>
                            <svg width="12px" height="10px">
                            <use xlinkHref="#check-4"></use>
                            </svg></span><span>TV Ad</span></label>
                                <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                        </div>
                    </div>

                    <select name="options" id="options">
                        <option value="placeholder">Are you satisfied with our service?</option>
                        <option value="satisfied-y">Yes</option>
                        <option value="satisfied-n">No</option>
                    </select><br/>

                    <div className='text-area-container'>
                        <label htmlFor="message">Feel free to leave a message!</label><br/>
                        <textarea type="textarea" rows="3" placeholder="Message..." name="message" required></textarea><br/>
                    </div>

                    <div className="checkbox-wrapper-4">
                            <input className="inp-cbx" id='nl' name='nl' type="checkbox"/>
                            <label className="cbx" htmlFor="nl"><span>
                            <svg width="12px" height="10px">
                            <use xlinkHref="#check-4"></use>
                            </svg></span><span>Would you like to subscribe to our newsletter?</span></label>
                            <svg className="inline-svg">
                                <symbol id="check-4" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </symbol>
                            </svg>
                    </div>

                    <button type="submit">Submit</button><br/>
                </form>
            </div>
        </div>
    );
}

export default Contact;