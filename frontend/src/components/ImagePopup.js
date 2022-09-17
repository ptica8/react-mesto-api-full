import React from 'react';

function ImagePopup(props) {

    return (
        <section className={`popup popup_type_image ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__box">
                <img src={`${props.card?.link}`} className="popup__img" alt={props.card?.link}/>
                <button
                    className="popup__close"
                    type="button"
                    aria-label="Закрыть форму"
                    onClick={props.onClose}
                />
                <h3 className="popup__subtitle">{props.card ? props.card.name : ''}</h3>
            </div>
        </section>
    )
}

export default ImagePopup;