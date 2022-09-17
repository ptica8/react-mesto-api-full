import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const nameRef = useRef();
    const linkRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        })
    }

    useEffect(() => {
        nameRef.current.value = ''
        linkRef.current.value = ''
    }, [props.isOpen])


    return(
        <PopupWithForm
            name="city-and-img"
            title="Новое место"
            text="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input
                    type="text"
                    id="input-city"
                    className="popup__input popup__input_type_city"
                    name="name"
                    minLength={2}
                    maxLength={30}
                    required=""
                    placeholder="Название"
                    defaultValue=""
                    ref={nameRef}
                />
                <span className="popup__input-error input-city-error"/>
            </label>
            <label>
                <input
                    id="input-img"
                    type="url"
                    className="popup__input popup__input_type_img"
                    name="link"
                    required=""
                    placeholder="Ссылка на картинку"
                    defaultValue=""
                    ref={linkRef}
                />
                <span className="popup__input-error input-img-error"/>
            </label>
        </PopupWithForm>
        )
}

export default AddPlacePopup;