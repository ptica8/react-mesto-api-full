import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({title, buttonText, handleRegister}) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((oldData) => ({
            ...oldData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let { email, password } = data;
        handleRegister(email, password);
    }

    return (
        <section className="popup_type_sign">
            <form
                name="form-signup"
                className="popup__form popup__form_type_sign"
                onSubmit={handleSubmit}
            >
                <h2 className="popup__welcome">{title}</h2>
                <div className="popup__form-set_container">
                    <fieldset className={"popup__form-set_type_sign"}>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="popup__input popup__input_type_sign popup__input-email"
                            required=""
                            placeholder="Email"
                            minLength={2}
                            value={data.email}
                            onChange={handleChange} />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="popup__input popup__input_type_sign popup__input-password"
                            required=""
                            placeholder="Пароль"
                            minLength={2}
                            value={data.password}
                            onChange={handleChange} />
                    </fieldset>
                        <button type="submit" onSubmit={handleSubmit} className="popup__button popup__button_type_sign">
                            {buttonText}
                        </button>
                        <div className="popup__signin">
                            <Link to="/signin" className="popup__signin_link">Уже зарегистрированы? Войти</Link>
                        </div>
                </div>
            </form>
        </section>
    )
}

export default Register;