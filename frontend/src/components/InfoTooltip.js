import React from "react";

function InfoTooltip(props) {
    return (
        <section className={`popup popup_type_warning ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__box">
                <button
                    className="popup__close"
                    type="button"
                    aria-label="Закрыть форму"
                    onClick={props.onClose}
                />
                <div className="popup__box-notification">
                        <div
                            className={
                                props.successIn ? "popup__box-notification_success" : "popup__box-notification_error"
                            }
                        />
                        <p className="popup__box-notification_title">
                            {props.successIn
                                ? props.textSuccess
                                : props.textError}
                        </p>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip;