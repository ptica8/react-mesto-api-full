import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const namePlaceholder = 'Имя';
    const jobPlaceholder = 'Род деятельности';
    const [name, setName] = useState(namePlaceholder);
    const [description, setDescription] = useState(jobPlaceholder);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    },[currentUser, props.isOpen]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return(
        <PopupWithForm
            name="name-and-job"
            title="Редактировать профиль"
            text="Сохранить"
            noValidate=""
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input
                    type="text"
                    id="input-name"
                    className="popup__input popup__input_type_name"
                    name="name"
                    minLength={2}
                    maxLength={40}
                    required=""
                    placeholder={namePlaceholder}
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <span className="popup__input-error input-name-error"/>
            </label>
            <label>
                <input
                    type="text"
                    id="input-job"
                    className="popup__input popup__input_type_job"
                    name="about"
                    minLength={2}
                    maxLength={200}
                    required=""
                    placeholder={jobPlaceholder}
                    value={description || ''}
                    onChange={handleDescriptionChange}
                />
                <span className="popup__input-error input-job-error"/>
            </label>
        </PopupWithForm>
        )
}

export default EditProfilePopup;