import {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen])

    return (
        <PopupWithForm
            name="avatar-profile"
            title="Обновить аватар"
            text="Сохранить"
            noValidate=""
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label>
                <input
                    id="input-img-avatar"
                    type="url"
                    className="popup__input popup__input_type_img"
                    name="avatar"
                    required=""
                    defaultValue=""
                    ref={avatarRef}
                />
                <span className="popup__input-error input-img-avatar-error"/>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;