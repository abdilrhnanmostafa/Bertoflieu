const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*=============== HOME NAME / TEXT ENTRANCE ===============*/
const homeName = document.querySelector('.home__name')
if (homeName && !reduceMotion) {
  homeName.animate(
    [
      { opacity: 0, transform: 'translateY(28px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    { duration: 1100, delay: 500, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }
  )
}

/*=============== HOME SPLIT TEXT ===============*/
const splitText = document.querySelector('.home__split')

if (splitText) {
  const text = splitText.textContent.trim()
  splitText.setAttribute('aria-label', text)
  splitText.innerHTML = [...text]
    .map(char => `<span class="split-char" aria-hidden="true">${char}</span>`)
    .join('')

  const chars = splitText.querySelectorAll('.split-char')

  if (!reduceMotion) {
    // Entrance: letters rise and fade in one by one
    chars.forEach((char, i) => {
      char.animate(
        [
          { opacity: 0, transform: 'translateY(60%) rotate(8deg)' },
          { opacity: 1, transform: 'translateY(0) rotate(0)' }
        ],
        { duration: 700, delay: 600 + i * 80, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }
      )
    })

    // Wave: letters bounce one after another, repeated
    const wave = () => {
      chars.forEach((char, i) => {
        char.animate(
          [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-.3em)', color: 'var(--first-color-light)' },
            { transform: 'translateY(0)' }
          ],
          { duration: 600, delay: i * 70, easing: 'ease-in-out' }
        )
      })
    }

    setTimeout(() => {
      wave()
      setInterval(wave, 5000)
    }, 2200)
  }
}

/*=============== SWIPER PROJECTS ===============*/
if (document.querySelector('.projects__swiper')) {
  new Swiper('.projects__swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 32,
    speed: 700,
    navigation: {
      nextEl: '.projects__next',
      prevEl: '.projects__prev'
    },
    pagination: {
      el: '.projects__pagination',
      clickable: true
    }
  })
}

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]')
const tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(content => content.classList.remove('work__active'))
    tabs.forEach(t => t.classList.remove('work__active'))

    target.classList.add('work__active')
    tab.classList.add('work__active')
  })
})

/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services__card')

const setCardHeight = (card, open) => {
  const content = card.querySelector('.services__content')
  content.style.height = open ? `${content.scrollHeight}px` : '0px'
  card.classList.toggle('services__open', open)
}

servicesCards.forEach(card => {
  // initial state
  setCardHeight(card, card.classList.contains('services__open'))

  card.querySelector('.services__header').addEventListener('click', () => {
    const willOpen = !card.classList.contains('services__open')
    servicesCards.forEach(c => setCardHeight(c, false))
    setCardHeight(card, willOpen)
  })
})

window.addEventListener('resize', () => {
  servicesCards.forEach(card => {
    if (card.classList.contains('services__open')) setCardHeight(card, true)
  })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
const testimonialsContent = document.querySelector('.testimonials__content')

if (testimonialsContent) {
  Array.from(testimonialsContent.children).forEach(card => {
    const clone = card.cloneNode(true)
    clone.setAttribute('aria-hidden', 'true')
    testimonialsContent.appendChild(clone)
  })
}

/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('copy-email')

if (copyBtn) {
  const emailText = document.querySelector('.contact__email').textContent.trim()
  const label = copyBtn.querySelector('.contact__button-text')
  const icon = copyBtn.querySelector('i')

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText)
    } catch (e) {
      const ta = document.createElement('textarea')
      ta.value = emailText
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }

    label.textContent = 'Email copied'
    icon.className = 'ri-check-line'

    setTimeout(() => {
      label.textContent = 'Copy email'
      icon.className = 'ri-file-copy-line'
    }, 2000)
  })
}

/*=============== CURRENT YEAR OF THE FOOTER ===============*/
const yearEl = document.getElementById('footer-year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

/*=============== HEADER BACKGROUND ON SCROLL ===============*/
const header = document.getElementById('header')
const scrollHeader = () => header.classList.toggle('scroll-header', window.scrollY >= 40)
window.addEventListener('scroll', scrollHeader)
scrollHeader()

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 120
    const link = document.querySelector(`.nav__list a[href*="${current.id}"]`)

    if (!link) return
    link.classList.toggle('active-link', scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight)
  })
}
window.addEventListener('scroll', scrollActive)
scrollActive()

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

if (cursor && canHover) {
  let mouseX = 0, mouseY = 0, curX = 0, curY = 0

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.classList.add('cursor-active')
  })

  document.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'))

  const follow = () => {
    curX += (mouseX - curX) * 0.15
    curY += (mouseY - curY) * 0.15
    cursor.style.transform = `translate(${curX}px, ${curY}px)`
    requestAnimationFrame(follow)
  }
  follow()

  /* Hide custom cursor on links */
  document.querySelectorAll('a, button, .services__header').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hidden'))
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hidden'))
  })
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined' && !reduceMotion) {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200
  })

  sr.reveal('.home__data, .home__social', { origin: 'left', delay: 600 })
  sr.reveal('.home__info, .home__cv', { origin: 'right', delay: 600 })
  sr.reveal('.home__image', { origin: 'left', distance: '100px', duration: 1400, delay: 250, opacity: 0, easing: 'cubic-bezier(.2,.8,.2,1)' })

  sr.reveal('.about__image', { origin: 'left' })
  sr.reveal('.about__data', { origin: 'right' })

  sr.reveal('.projects > .section__title, .work > .section__title, .services > .section__title, .testimonials > .section__title, .contact > .section__title')
  sr.reveal('.projects__container', { origin: 'bottom' })
  sr.reveal('.work__tabs')
  sr.reveal('.work__content', { origin: 'bottom' })
  sr.reveal('.services__card', { interval: 150 })
  sr.reveal('.testimonials__container', { origin: 'bottom' })
  sr.reveal('.contact__data', { origin: 'left' })
  sr.reveal('.contact__info', { origin: 'right' })
  sr.reveal('.footer', { origin: 'bottom', distance: '30px' })
}
