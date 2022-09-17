import React from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={`${currentUser.avatar}`} alt="Аватар" className="profile__img" />
                    <button
                        className="profile__overlay"
                        onClick={props.onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        className="profile__edit"
                        type="button"
                        aria-label="Кнопка Редактировать"
                        onClick={props.onEditProfile}
                    />
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button
                    className="profile__button"
                    type="button"
                    aria-label="Кнопка Добавить"
                    onClick={props.onAddPlace}
                />
            </section>
            <section>
                <ul className="list">
                    {props.cardsList.map((card) => (
                        <Card
                            link={card.link}
                            name={card.name}
                            likes={card.likes}
                            key={card._id}
                            onClick={props.onCardClick}
                            card={card}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </div>
    )
}


export default Main;