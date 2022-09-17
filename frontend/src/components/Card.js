import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `list__element-button_delete ${isOwn ? 'list__element-button_delete' : 'list__element-button_delete_hidden'}`
    );

    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`list__element-button_like ${isLiked ? 'list__element-button_active' : 'list__element-button_like'}`);

    function handleClick() {
        props.onClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
            <li className="list__element">
                <img src={`${props.link}`} className="list__element-img" onClick={handleClick} alt={props.name}/>
                <button className={cardDeleteButtonClassName} type="button"
                        aria-label="Удалить" onClick={handleDeleteClick} />
                <div className="list__element-card">
                    <h2 className="list__element-title">{props.name}</h2>
                    <div className="list__element-likes">
                        <button className={cardLikeButtonClassName} type="button"
                                aria-label="Кнопка Лайк" onClick={handleLikeClick} />
                        <span className="list__element-number">{props.likes.length}</span>
                    </div>
                </div>
            </li>
    )
}

export default Card;