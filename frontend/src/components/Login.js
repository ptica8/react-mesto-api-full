import { useState } from 'react';

const Login = ({title, buttonText, handleLogin}) => {
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
        handleLogin(email, password);
    }

    return (
        <section className="popup_type_sign">
            <h2 className="popup__welcome popup__welcome_type_sign">{title}</h2>
            <form
                name="form-signin"
                className="popup__form popup__form_type_sign"
                onSubmit={handleSubmit}
            >
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
                            onChange={handleChange}
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="popup__input popup__input_type_sign popup__input-password"
                            required=""
                            placeholder="Пароль"
                            minLength={2}
                            value={data.password}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <div className="popup__button-container">
                        <button
                            type="submit"
                            onSubmit={handleSubmit}
                            className="popup__button popup__button_type_sign"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Login;