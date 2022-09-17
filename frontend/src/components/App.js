import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate, Link } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from "./InfoTooltip";
import * as auth from '../utils/auth.js';
import {api} from '../utils/api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: ''});
    const [loggedIn, setLoggedIn] = useState(false); // false значит что когда только зашли-не залогинены
    const [successIn, setSuccess] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn === true) {
            api.getUserInfo()
                .then((userInfo) => {
                    setCurrentUser({name: userInfo.name, about: userInfo.about, avatar: userInfo.avatar, _id: userInfo._id})
                })
                .catch(err => console.log(err));
            }
    }, [loggedIn])

    useEffect(() => {
        if (loggedIn === true) {
            api.getAllCards()
                .then((cardsList) => {
                    setCards(cardsList);
                })
                .catch(err => console.log(err));
        }
    }, [loggedIn])


    useEffect(() => {
            handleTokenCheck();
    }, [loggedIn])

    function handleTokenCheck() {
        let jwt = localStorage.getItem('token');
        if (jwt) {
            auth.getContent(jwt).then((res) => {
                if (res.data.email) {
                    setUserData({
                        username: res.data._id,
                        email: res.data.email
                    })
                    setLoggedIn(true);
                    navigate('/');
                }
            })
                .catch(err => console.log(err));
        }
    }

        function handleCardLike(card) {
            const isLiked = card.likes.some(i => i._id === currentUser._id);
            api.changeLikeCardStatus(card._id, isLiked)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => console.log(err));
        }

        function handleCardDelete(card) {
            api.deleteCard(card._id)
                .then(() => {
                    setCards((state) => state.filter((c) => c._id !== card._id));
                })
                .catch(err => console.log(err));
        }

        function handleUpdateUser(data) {
            api.editProfileInfo(data)
                .then(() => {
                    setCurrentUser({
                        name: data.name,
                        about: data.about,
                        avatar: currentUser.avatar,
                        _id: currentUser._id
                    })
                    closeAllPopups()
                })
                .catch(err => console.log(err));
        }

        function handleUpdateAvatar(data) {
            api.editAvatar(data)
                .then(() => {
                    setCurrentUser({
                        name: currentUser.name,
                        about: currentUser.about,
                        avatar: data.avatar,
                        _id: currentUser._id
                    })
                    closeAllPopups()
                })
                .catch(err => console.log(err));
        }

        function handleAddPlaceSubmit(data) {
            api.addNewCard(data)
                .then((newCard) => {
                    setCards([newCard, ...cards])
                    closeAllPopups()
                })
                .catch(err => console.log(err));
        }

        function handleCardClick(card) {
            setImagePopupOpen(true);
            setSelectedCard(card)
        }

        function handleEditAvatarClick() {
            setIsEditAvatarPopupOpen(true);
        }

        function handleEditProfileClick() {
            setIsEditProfilePopupOpen(true);
        }

        function handleInfoTooltipPopup() {
            setInfoTooltipPopupOpen(true);
        }

        function handleAddPlaceClick() {
            setIsAddPlacePopupOpen(true);
        }

        function closeAllPopups() {
            setIsEditAvatarPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setIsAddPlacePopupOpen(false);
            setSelectedCard(null);
            setImagePopupOpen(false);
            setInfoTooltipPopupOpen(false);
        }

        function closeInfoTooltip() {
            closeAllPopups();
            navigate('/signin');
        }

        function handleRegister(email, password) {
            auth.register(email, password)
                .then((res) => {
                    if (res.data.email) {
                        setUserData({
                            username: res.data._id,
                            email: res.data.email
                        })
                        setLoggedIn(true);
                }})
                .then(() => {
                    handleInfoTooltipPopup()
                    setSuccess(true)
                })
                .catch(() => {
                    handleInfoTooltipPopup()
                    setSuccess(false)
                })
        }

        function handleLogin(email, password) {
            auth.authorize(email, password)
                .then(res => {
                    if (res.token) {
                        setInfoTooltipPopupOpen(false);
                        localStorage.setItem('token', res.token);
                        setLoggedIn(true);
                        navigate('/');
                    }
                })
                .catch(() => {
                    handleInfoTooltipPopup()
                    setSuccess(false)
                })
        }

        function handleLogOut() {
            localStorage.removeItem('token'); // or clear()
            setUserData({
                username: '',
                email: '',
            })
            setLoggedIn(false);
        }

        return (
            <CurrentUserContext.Provider value={currentUser}>
                <div className="page">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Header>
                                        <p className="header__email">
                                            {userData.email}
                                        </p>
                                        <button className="header__exit" onClick={handleLogOut}>
                                            Выйти
                                        </button>
                                </Header>
                                <ProtectedRoute
                                    path="/"
                                    component={Main}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    cardsList={cards}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    loggedIn={loggedIn}
                                />
                                <Footer/>
                            </>
                            }
                        />

                        <Route path="/signup" element={
                            <>
                                <Header>
                                    <Link to="/signin" className="header__link">
                                        Войти
                                    </Link>
                                </Header>
                                <Register
                                    title="Регистрация"
                                    buttonText="Зарегистрироваться"
                                    handleRegister={handleRegister}
                                />
                            </>
                            }
                        />

                        <Route path="/signin" element={
                            <>
                                <Header>
                                    <Link to="/signup" className="header__link">
                                        Регистрация
                                    </Link>
                                </Header>
                                <Login
                                    title="Вход"
                                    buttonText="Войти"
                                    handleLogin={handleLogin}
                                />
                            </>
                            }
                        />
                        <Route exact path="/" element={
                            loggedIn ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />
                        <Route path="*" element={
                                <Navigate to="/signin" />
                            }
                        />
                    </Routes>
                    <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={successIn ? closeInfoTooltip : closeAllPopups} successIn={successIn} textSuccess="Вы успешно зарегистрировались!" textError="Что-то пошло не так! Попробуйте еще раз." />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser}/>
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   onAddPlace={handleAddPlaceSubmit}/>
                    <ImagePopup
                        onClose={closeAllPopups}
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                    />
                    <section className="popup popup_type_delete">
                        <div className="popup__container">
                            <h2 className="popup__confirm">Вы уверены?</h2>
                            <button className="popup__button" type="submit">
                                Да
                            </button>
                            <button
                                className="popup__close"
                                type="button"
                                aria-label="Закрыть форму"
                            />
                        </div>
                    </section>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                </div>
            </CurrentUserContext.Provider>
        )
}

export default App;
