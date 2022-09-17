import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <form
                    className={`popup__form popup__form_${props.name}`}
                    name={props.name}
                    onSubmit={props.onSubmit}
                >
                    <fieldset className="popup__form-set">
                        {props.children}
                    </fieldset>
                    <button
                        disabled=""
                        className={`popup__button popup__button_${props.name}`}
                        type="submit"
                    >
                        {props.text}
                    </button>
                </form>
                <button
                    className="popup__close"
                    type="button"
                    aria-label="Закрыть форму"
                    onClick={props.onClose}
                />
            </div>
        </section>
    )
}

export default PopupWithForm;