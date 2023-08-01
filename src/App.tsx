import './scss/app.scss';
import headerLogo from './assets/images/headerLogo.svg'
import headerLogoXS from './assets/images/XSheaderLogo.svg'
import headerPhone from './assets/images/headerPhone.svg'
import dots from './assets/images/dots.svg'
import downstairsImg from './assets/images/downstairs.jpg'
import roomImg from './assets/images/room.jpg'
import arrowLeft from './assets/images/arrowLeft.svg'
import arrowLeftDisabled from './assets/images/arrowLeftDisabled.svg'
import arrowRight from './assets/images/arrowRight.svg'
import arrowRightDisabled from './assets/images/arrowRightDisabled.svg'
import qoutesSvg from './assets/images/quotes.svg'
import quotesXS from './assets/images/quotes-xs.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import React from 'react';
import slidesList from './data/slidesList.json'
import navLinks from './data/navLinksArr.json'
import socialMediaLinks from './data/socialMediaArr.json'
import dishList from './data/dishList.json'
import burgerList from './data/burgerMenuList.json'
import closeButton from './assets/images/close-button.svg'
import whatsSVG from './assets/images/whatsApp.svg'
import viberSVG from './assets/images/viber.svg'
import instaSVG from './assets/images/insta.svg'
import { Form } from './components/ModalForm';


function App() {
  const swiperRef = useRef<SwiperType>();
  const overlayRef = useRef<HTMLDivElement>(null)
  const [slideCount, setSlideCount] = React.useState(1)
  const [openMenu, setOpenMenu] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const body = document.querySelector('body')

  const slideNext = () => {
    swiperRef.current?.slideNext()
  }

  const slidePrev = () => {
    swiperRef.current?.slidePrev()
  }

  const handleMenu = () => {
    setOpenMenu(!openMenu)
    !openMenu ? body?.classList.add('active') : body?.classList.remove('active')
  }

  const handleModal = () => {
    setOpenModal(!openModal)
    !openModal ? body?.classList.add('active') : body?.classList.remove('active')
  }

  React.useEffect(() => {
    const menuOutsideClick = (event: MouseEvent) => {
      if (overlayRef.current && event.composedPath().includes(overlayRef.current)) {
        setOpenMenu(false)
        setOpenModal(false)
        body?.classList.remove('active')
      }
    }


    document.body.addEventListener('click', menuOutsideClick)
    return () => document.body.removeEventListener('click', menuOutsideClick)
  }, [])

  return (
    <>
      <header className={openMenu || openModal ? "header header-image header-padding" : "header header-image"}>
        <div className={openMenu ? "burger-menu open" : "burger-menu"}>
          <img onClick={handleMenu} src={closeButton} alt="close" className="close-button" />
          <ul className="burger-menu-list">
            {
              burgerList.map((item) => (
                <li key={item.itemText} className="burger-menu-item">
                  <a href="#" className="burger-menu-link">{item.itemText}</a>
                </li>
              ))
            }
          </ul>
          <div className="navbar-phone">
            <a href="#" className="navbar-phone-link">
              <img src={headerPhone} alt="" />
              <p className='navbar-phone-text'>+32 9 282 57 25</p>
            </a>
          </div>
          <div className="burger-social">
            <a href="#">
              <img className="burger-social-img" src={whatsSVG} alt="" />
            </a>
            <a href="#">
              <img className="burger-social-img" src={viberSVG} alt="" />
            </a>
            <a href="#">
              <img className="burger-social-img" src={instaSVG} alt="" />
            </a>
          </div>
        </div>
        <div className="container">
          <nav className="navbar">
            <a href="./" className="header-logo">
              <img src={headerLogo} alt="logo" />
            </a>
            <a href="./" className="header-logo-xs">
              <img src={headerLogoXS} alt="logo" />
            </a>
            <div onClick={handleMenu} className="burger-icon">
              <span className="string"></span>
              <span className="string"></span>
              <span className="string"></span>
            </div>
            <ul className="header-nav">
              {
                navLinks.map((link) => (
                  <li key={link.linkName} className="header-nav-item">
                    <a href="#" className="header-nav-link">{link.linkName}</a>
                  </li>
                ))
              }
            </ul>
            <div className="navbar-phone">
              <a href="#" className="navbar-phone-link">
                <img src={headerPhone} alt="" />
                <p className='navbar-phone-text'>+32 9 282 57 25</p>
              </a>
            </div>
          </nav>
          <div className="header-content">
            <p className="header-timeline">
              OPEN EVERYDAY 6AM - 9PM
            </p>
            <h1 className="header-headline">
              A bad day with lunch is better than a good day without it.
            </h1>
            <div className="buttons-block">
              <button onClick={handleModal} className="reserve-button">Reserve a table</button>
              <div className="social-media">
                {
                  socialMediaLinks.map((link) => (
                    <a key={link.socialMedia} href="#" className="social-media-button">{link.socialMedia}</a>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </header>
      {openMenu && <div ref={overlayRef} className="overlay"></div>}
      {openModal && <div ref={overlayRef} className="overlay"></div>}
      <section className="middle-screen">
        <div className="container">
          <div className="middle-screen-content">
            <ul className="dish-of-day-list">
              {
                dishList.map((date) => (
                  <li key={date.headline} className="dish-list-item">
                    <p className="date">{date.headline}</p>
                    <p className="dish-of-day">{date.text1}<img className='dots' src={dots} alt="dots" />{date.text2}</p>
                  </li>
                ))
              }
            </ul>
            <div className="images-block">
              <img className='downstairs-img' src={downstairsImg} alt="downstairs image" />
              <div className='rectangle'></div>
              <img className='room-img' src={roomImg} alt="room image" />
            </div>
          </div>
        </div>
      </section>
      <section className="slider">
        <div className="slider-container">
          <div className="slider-content">
            <Swiper
              className='swiper-custom'
              onSlideNextTransitionStart={() => setSlideCount(slideCount + 1)}
              onSlidePrevTransitionStart={() => setSlideCount(slideCount - 1)}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              spaceBetween={50}
            >
              {slidesList.map((slide) => (
                <SwiperSlide
                  key={slide.id}
                  className='slide'
                >
                  <img className="slide-quotes" src={qoutesSvg} alt="quotes" />
                  <img className="slide-quotes-xs" src={quotesXS} alt="" />
                  <p className="slide-headline">{slide.headline}</p>
                  <p className="slide-text">{slide.sliderText}</p>
                  <p className="slide-author">{slide.author}</p>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='slider-nav'>
              <img
                className={slideCount === 1 ? 'arrowLeftDisabled' : 'arrowLeft'}
                src={Number(slideCount) === 1 ? arrowLeftDisabled : arrowLeft}
                onClick={slidePrev}
                alt='arrow'
              />
              <img
                className={Number(slideCount) === slidesList.length ? 'arrowRightDisabled' : 'arrowRight'}
                src={Number(slideCount) === slidesList.length ? arrowRightDisabled : arrowRight}
                onClick={slideNext}
                alt='arrow'
              />
            </div>
          </div>
        </div>
      </section>
      <div className={openModal ? "modal open" : "modal"}>
        <img onClick={handleModal} src={closeButton} className='modal-close' alt="" />
        <h2 className="modal-title">Request a call</h2>
        <Form />
      </div>
    </>
  );
}

export default App;
